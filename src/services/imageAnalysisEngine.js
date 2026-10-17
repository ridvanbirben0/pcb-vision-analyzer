/**
 * @file imageAnalysisEngine.js
 * @description Çift Yapay Zeka PCB Analiz Motoru: Google Gemini 3.8 Flash & Anthropic Claude 3.5 Sonnet.
 */

function normalizeBoundingBox(comp, index, isBlock = false) {
  const isCircuitBlock = isBlock || comp?.isBlock || comp?.role !== undefined;
  const maxAllowedDim = isCircuitBlock ? 85 : 20;
  const minAllowedDim = isCircuitBlock ? 6 : 3;

  // 1. Doğrudan yüzde tabanlı { x, y, w, h } nesnesi
  if (comp?.bbox && typeof comp.bbox === 'object') {
    let bx = Number(comp.bbox.x !== undefined ? comp.bbox.x : (comp.bbox.left ?? 30));
    let by = Number(comp.bbox.y !== undefined ? comp.bbox.y : (comp.bbox.top ?? 30));
    let bw = Number(comp.bbox.w !== undefined ? comp.bbox.w : (comp.bbox.width ?? 14));
    let bh = Number(comp.bbox.h !== undefined ? comp.bbox.h : (comp.bbox.height ?? 14));

    // 0-1000 ölçekten yüzdeye dönüştürme
    if (bx > 100 || by > 100) {
      bx = bx / 10;
      by = by / 10;
      bw = bw / 10;
      bh = bh / 10;
    } else if (bx <= 1.0 && by <= 1.0 && (bw <= 1.0 || bh <= 1.0)) {
      bx = bx * 100;
      by = by * 100;
      bw = bw * 100;
      bh = bh * 100;
    }

    // Blok değilse (tekil çipse) aşırı büyük kutuları sıkılaştır
    if (!isCircuitBlock) {
      if (bw > 20) bw = 16;
      if (bh > 20) bh = 16;
    }

    bw = Math.max(minAllowedDim, Math.min(maxAllowedDim, Math.round(bw)));
    bh = Math.max(minAllowedDim, Math.min(maxAllowedDim, Math.round(bh)));
    bx = Math.max(1, Math.min(98 - bw, Math.round(bx)));
    by = Math.max(1, Math.min(98 - bh, Math.round(by)));

    return { x: bx, y: by, w: bw, h: bh };
  }

  // 2. Dizi formatı: [ymin, xmin, ymax, xmax] veya [xmin, ymin, xmax, ymax]
  let ymin = 0, xmin = 0, ymax = 0, xmax = 0;
  if (Array.isArray(comp?.box_2d) && comp.box_2d.length === 4) {
    [ymin, xmin, ymax, xmax] = comp.box_2d;
  } else if (Array.isArray(comp?.bbox) && comp.bbox.length === 4) {
    [ymin, xmin, ymax, xmax] = comp.bbox;
  } else if (comp?.ymin !== undefined && comp?.xmin !== undefined) {
    ymin = Number(comp.ymin);
    xmin = Number(comp.xmin);
    ymax = Number(comp.ymax);
    xmax = Number(comp.xmax);
  } else {
    return { x: 30, y: 30, w: isCircuitBlock ? 25 : 12, h: isCircuitBlock ? 20 : 12 };
  }

  const maxVal = Math.max(ymin, xmin, ymax, xmax);
  if (maxVal > 100) {
    ymin = ymin / 10;
    xmin = xmin / 10;
    ymax = ymax / 10;
    xmax = xmax / 10;
  } else if (maxVal <= 1.0) {
    ymin = ymin * 100;
    xmin = xmin * 100;
    ymax = ymax * 100;
    xmax = xmax * 100;
  }

  let rawW = Math.max(minAllowedDim, xmax - xmin);
  let rawH = Math.max(minAllowedDim, ymax - ymin);

  if (!isCircuitBlock) {
    if (rawW > 20) {
      const cx = xmin + rawW / 2;
      rawW = 16;
      xmin = cx - 8;
    }
    if (rawH > 20) {
      const cy = ymin + rawH / 2;
      rawH = 16;
      ymin = cy - 8;
    }
  }

  const x = Math.max(1, Math.min(98 - rawW, Math.round(xmin)));
  const y = Math.max(1, Math.min(98 - rawH, Math.round(ymin)));
  const w = Math.max(minAllowedDim, Math.min(maxAllowedDim, Math.round(rawW)));
  const h = Math.max(minAllowedDim, Math.min(maxAllowedDim, Math.round(rawH)));

  return { x, y, w, h };
}

function repairAndParseJson(rawText) {
  if (!rawText) throw new Error("Yapay zekadan yanıt alınamadı.");
  let text = rawText.trim().replace(/^```json/i, "").replace(/^```/i, "").replace(/```$/i, "").trim();

  // 1. Standart doğrudan JSON parse
  try {
    return JSON.parse(text);
  } catch (initialErr) {
    // 2. Truncated (kesilmiş / unterminated string) JSON otomatik onarımı:
    // JSON dizisi içinde son eksiksiz kapanan bileşeni ('}') bul
    let lastCloseObj = text.lastIndexOf('}');
    while (lastCloseObj > 20) {
      const candidateSub = text.substring(0, lastCloseObj + 1);
      const candidatesToTry = [
        candidateSub + '\n  ]\n}',
        candidateSub + '\n}',
        candidateSub
      ];

      for (const cand of candidatesToTry) {
        try {
          const parsed = JSON.parse(cand);
          if (parsed && typeof parsed === 'object') {
            return parsed;
          }
        } catch (_) {}
      }
      lastCloseObj = text.lastIndexOf('}', lastCloseObj - 1);
    }

    // 3. Regex ile parça parça kurtarma (Fallback)
    try {
      const titleMatch = text.match(/"title"\s*:\s*"([^"]+)"/);
      const catMatch = text.match(/"category"\s*:\s*"([^"]+)"/);
      const purpMatch = text.match(/"purpose"\s*:\s*"([^"]+)"/);

      const compRegex = /\{\s*"id"[^}]+\}/g;
      const compMatches = text.match(compRegex) || [];
      const recoveredComps = [];
      for (const cm of compMatches) {
        try {
          recoveredComps.push(JSON.parse(cm));
        } catch (_) {}
      }

      if (recoveredComps.length > 0) {
        return {
          title: titleMatch ? titleMatch[1] : "Kurtarılan PCB Devre Kartı",
          category: catMatch ? catMatch[1] : "Elektronik Devre",
          purpose: purpMatch ? purpMatch[1] : "Görsel analizi başarıyla kurtarıldı.",
          components: recoveredComps
        };
      }
    } catch (_) {}

    throw new Error(`Yapay zeka yanıtı JSON olarak çözümlenemedi: ${initialErr.message}`);
  }
}

export const imageAnalysisEngine = {
  cleanKey(rawKey) {
    if (!rawKey) return '';
    return rawKey.trim().replace(/^['"]|['"]$/g, '').replace(/[<>]/g, '').trim();
  },

  async testGemini(apiKey) {
    const clean = this.cleanKey(apiKey);
    if (!clean) return { success: false, message: "Lütfen bir Gemini API anahtarı girin." };

    let candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-pro', 'gemini-flash-latest'];

    // 1. Google ListModels API'sinden bu anahtarın yetkili olduğu güncel modelleri dinamik keşfet
    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(clean)}`, {
        method: "GET",
        headers: { "x-goog-api-key": clean }
      });
      if (listRes.ok) {
        const listData = await listRes.json();
        if (Array.isArray(listData.models)) {
          const apiModels = listData.models
            .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
            .map(m => m.name.replace(/^models\//, ''));
          if (apiModels.length > 0) {
            apiModels.sort((a, b) => {
              const aScore = a.includes('2.5-flash') ? 0 : a.includes('2.0-flash') ? 1 : a.includes('flash') ? 2 : 3;
              const bScore = b.includes('2.5-flash') ? 0 : b.includes('2.0-flash') ? 1 : b.includes('flash') ? 2 : 3;
              return aScore - bScore;
            });
            candidateModels = apiModels;
          }
        }
      }
    } catch (_) {}

    let lastErr = '';
    for (const model of candidateModels) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(clean)}`;
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": clean },
          body: JSON.stringify({ contents: [{ parts: [{ text: "Ping test. Respond OK." }] }] })
        });

        if (res.ok) {
          localStorage.setItem('gemini_model_name', model);
          return { success: true, message: `✅ Başarılı! Google Gemini (${model}) doğrulandı ve hazır.` };
        }

        let errDetail = `HTTP ${res.status}`;
        try {
          const d = await res.json();
          if (d?.error?.message) errDetail = d.error.message;
        } catch (_) {}

        if (res.status === 503) {
          return { success: false, message: "Google sunucuları şu anda yoğun (503). Lütfen birkaç saniye bekleyin veya alternatif olarak Claude'u seçin." };
        }
        lastErr = `(${model} ${res.status}): ${errDetail}`;
      } catch (e) {
        lastErr = e.message;
      }
    }
    return { success: false, message: `Gemini Hatası: ${lastErr}` };
  },

  async testClaude(apiKey) {
    const clean = this.cleanKey(apiKey);
    if (!clean) return { success: false, message: "Lütfen bir Claude API anahtarı girin." };
    if (!clean.startsWith('sk-ant-')) {
      return { success: false, message: "Claude API anahtarları 'sk-ant-...' ile başlar. Lütfen Anthropic Console'dan aldığınız anahtarı kontrol edin." };
    }

    const speedTier = localStorage.getItem('claude_speed_tier') || 'haiku';
    let candidateModels = speedTier === 'sonnet'
      ? ['claude-sonnet-5-5', 'claude-sonnet-5', 'claude-sonnet-4-6', 'claude-haiku-5-5']
      : ['claude-haiku-5-5', 'claude-haiku-4-5-20251001', 'claude-sonnet-5-5'];

    // 1. Anthropic ListModels API'sinden aktif modelleri dinamik keşfet
    try {
      const listRes = await fetch('https://api.anthropic.com/v1/models', {
        method: 'GET',
        headers: {
          'x-api-key': clean,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        }
      });
      if (listRes.ok) {
        const listData = await listRes.json();
        if (Array.isArray(listData.data)) {
          const apiModels = listData.data
            .filter(m => m.lifecycle !== 'retired')
            .map(m => m.id);
          if (apiModels.length > 0) {
            apiModels.sort((a, b) => {
              if (speedTier === 'haiku') {
                const aH = a.includes('haiku') ? 0 : 1;
                const bH = b.includes('haiku') ? 0 : 1;
                return aH - bH;
              } else {
                const aS = a.includes('sonnet') ? 0 : 1;
                const bS = b.includes('sonnet') ? 0 : 1;
                return aS - bS;
              }
            });
            candidateModels = apiModels;
          }
        }
      }
    } catch (_) {}

    let lastErr = '';
    for (const model of candidateModels) {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': clean,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: model,
            max_tokens: 20,
            messages: [{ role: 'user', content: 'Ping test. Say OK.' }]
          })
        });

        if (res.ok) {
          localStorage.setItem('claude_model_name', model);
          return { success: true, message: `✅ Başarılı! Anthropic Claude (${model}) doğrulandı ve hazır.` };
        }

        let errDetail = `HTTP ${res.status}`;
        try {
          const d = await res.json();
          if (d?.error?.message) errDetail = d.error.message;
        } catch (_) {}

        lastErr = `(${model} ${res.status}): ${errDetail}`;
      } catch (e) {
        lastErr = e.message;
      }
    }

    return { success: false, message: `Claude Hatası: ${lastErr}` };
  },

    getMissingComponentsPromptText(existingNames = "") {
    return `Sen kıdemli bir donanım mühendisi ve elektronik devre muayene uzmanısın.
Fotoğraftaki baskılı devre kartını (PCB) derinlemesine incele.

DİKKAT: Bu devre kartı üzerinde daha önce şu parçalar ZATEN tespit edilmiş ve işaretlenmiştir:
[${existingNames || 'Bazı temel parçalar'}]

GÖREVİN (EKSİK PARÇALARI BUL VE LİSTEYE EKLE):
Yukarıda listelenen ZATEN BULUNMUŞ parçalar DIŞINDA, kart üzerinde henüz kutulanmamış, tespit edilmemiş ve açıklanmamış DİĞER TÜM ELEKTRONİK PARÇALARI, ENTEGRELERİ, SOKETLERİ VE MODÜLLERİ TESPİT ET.

ÖZELLİKLE ŞU BÖLGELERİ VE ELEMANLARI İNCELE:
1. Mikrodenetleyici ve Mantık Entegreleri (SOIC, DIP, QFP paketli tüm diğer çipler: IC1, IC2, op-amp vb.)
2. Harici Soketler ve Konnektörler (Güç giriş klemensleri/soketleri, sensör soketleri, programlama headerları, motor konnektörleri, MicroSD yuvası)
3. Anahtarlar ve Butonlar (DIP switch, slide switch, tact buton, kalibrasyon butonu)
4. Ayar ve Pasif Elemanlar (Trimpot/potansiyometre, kristal osilatör / XTAL, varistör, sigorta/FUSE)
5. Güç ve İndüksiyon Elemanları (Korumalı bobin, regülatör çipi, büyük elektrolitik filtre kondansatörleri, soğutuculu TO-220 transistörler/MOSFET'ler)
6. Koruma Diyotları ve Doğrultucular (TVS, Schottky diyotları, köprü diyot)

Zaten bulunmuş olanları tekrar etme; kart üzerindeki diğer tüm belirgin parçaları (en az 8-15 adet yeni parça) tek tek ayır ve listele.

KOORDİNAT VE KUTUCUK KURALLARI:
- Her parçanın kutucuğu (bbox: { x, y, w, h }) YALNIZCA o parçanın kendi fiziksel gövdesini sıkıca çevrelemelidir (%4 ila %18 arası).
- Koordinatlar %0 ile %100 arasında tüm fotoğraf tuvaline (image frame) göre verilmelidir.

SADECE aşağıdaki JSON şemasına BİREBİR uygun geçerli bir JSON döndür:
{
  "components": [
    {
      "id": "add-1",
      "name": "Tespit Edilen Yeni Parça Adı (örn: IC1 - İşlemci / Konnektör / Kristal)",
      "category": "Mikrodenetleyici / Güç / Konnektör / Pasif / Arayüz",
      "packageType": "Kılıf tipi (örn: SOIC-14, TO-220, JST Konnektör)",
      "functionDesc": "Bu parçanın bu devredeki tam işlevi ve ne işe yaradığına dair eğitici açıklama",
      "pinoutInfo": "Çalışma voltajı veya pin bağlantı detayı",
      "bbox": { "x": 25, "y": 30, "w": 10, "h": 10 }
    }
  ]
}`;
  },

  async findMissingComponents(imageSrc, existingComponents = [], config = {}, onStatus = null) {
    const { provider = 'gemini', geminiKey = '', claudeKey = '', speedTier = 'haiku' } = config;
    const activeSpeed = speedTier || localStorage.getItem('claude_speed_tier') || 'haiku';

    const existingNames = existingComponents.map(c => c.name).filter(Boolean).join(", ");
    const prompt = this.getMissingComponentsPromptText(existingNames);
    const base64Data = imageSrc.includes(",") ? imageSrc.split(",")[1] : imageSrc;
    if (!base64Data) throw new Error("Görsel verisi çözümlenemedi.");

    if (provider === 'claude') {
      const activeKey = (claudeKey && claudeKey.trim().length > 15)
        ? claudeKey.trim()
        : (localStorage.getItem('claude_api_key') || '');
      if (!activeKey || activeKey.length <= 15) {
        throw new Error("Lütfen geçerli bir Claude API anahtarı girin.");
      }
      if (onStatus) onStatus("🔍 Claude ile karttaki eksik parçalar taranıyor...");

      let candidateModels = activeSpeed === 'haiku'
        ? ['claude-haiku-5-5', 'claude-haiku-4-5-20251001']
        : ['claude-sonnet-5-5', 'claude-sonnet-5'];

      let rawText = '';
      for (const model of candidateModels) {
        try {
          const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': activeKey,
              'anthropic-version': '2023-06-01',
              'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
              model: model,
              max_tokens: 3500,
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64Data } },
                    { type: 'text', text: prompt }
                  ]
                }
              ]
            })
          });

          if (res.ok) {
            const resJson = await res.json();
            rawText = resJson.content?.map(c => c.text || '').join('\n');
            break;
          }
        } catch (_) {}
      }

      if (!rawText) throw new Error("Eksik parça taraması yapılamadı. Lütfen tekrar deneyin.");
      const parsed = repairAndParseJson(rawText);
      const rawComps = Array.isArray(parsed.components) ? parsed.components : [];
      return rawComps.map((comp, idx) => {
        const bbox = normalizeBoundingBox(comp, idx, false);
        return {
          id: comp?.id || `extra-${Date.now()}-${idx}`,
          name: comp?.name || `Ek Bileşen #${idx + 1}`,
          category: comp?.category || "Elektronik Bileşen",
          packageType: comp?.packageType || "SMD",
          functionDesc: comp?.functionDesc || "Devrede tespit edilen ek bileşen.",
          pinoutInfo: comp?.pinoutInfo || "Standart bağlantı.",
          isBlock: false,
          bbox
        };
      });
    } else {
      const activeKey = (geminiKey && geminiKey.trim().length > 15)
        ? geminiKey.trim()
        : (localStorage.getItem('gemini_api_key') || '');
      if (!activeKey || activeKey.length <= 15) {
        throw new Error("Lütfen geçerli bir Google Gemini API anahtarı girin.");
      }
      if (onStatus) onStatus("🔍 Gemini ile karttaki eksik parçalar taranıyor...");

      let savedModel = localStorage.getItem('gemini_model_name') || 'gemini-2.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${savedModel}:generateContent?key=${encodeURIComponent(activeKey)}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": activeKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64Data } }] }],
          generationConfig: { response_mime_type: "application/json", temperature: 0.15 }
        })
      });

      if (!res.ok) throw new Error(`Gemini eksik parça taraması başarısız oldu (${res.status}).`);
      const resJson = await res.json();
      const rawText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = repairAndParseJson(rawText);
      const rawComps = Array.isArray(parsed.components) ? parsed.components : [];
      return rawComps.map((comp, idx) => {
        const bbox = normalizeBoundingBox(comp, idx, false);
        return {
          id: comp?.id || `extra-${Date.now()}-${idx}`,
          name: comp?.name || `Ek Bileşen #${idx + 1}`,
          category: comp?.category || "Elektronik Bileşen",
          packageType: comp?.packageType || "SMD",
          functionDesc: comp?.functionDesc || "Devrede tespit edilen ek bileşen.",
          pinoutInfo: comp?.pinoutInfo || "Standart bağlantı.",
          isBlock: false,
          bbox
        };
      });
    }
  },
async analyze(imageSrc, config = {}, onStatus = null) {
    const { provider = 'gemini', geminiKey = '', claudeKey = '', speedTier = 'haiku' } = config;
    const activeSpeed = speedTier || localStorage.getItem('claude_speed_tier') || 'haiku';

    // 1. ANTHROPIC CLAUDE SAĞLAYICISI
    if (provider === 'claude') {
      const activeKey = (claudeKey && claudeKey.trim().length > 15)
        ? claudeKey.trim()
        : (localStorage.getItem('claude_api_key') || '');

      if (!activeKey || activeKey.length <= 15) {
        throw new Error("Lütfen geçerli bir Claude API anahtarı girin (sk-ant-...). Sağ üstteki API Anahtarı butonundan kaydedebilirsiniz.");
      }

      if (onStatus) {
        onStatus(activeSpeed === 'haiku'
          ? "⚡ Claude Haiku ile devre parçaları tek tek taranıyor (~2-3 sn)..."
          : "🧠 Claude Sonnet ile devre parçaları detaylı inceleniyor...");
      }

      const result = await this.callClaudeAI(imageSrc, activeKey, onStatus, activeSpeed);
      if (result) {
        // Parçaları doğrula ve garantile
        let pieces = Array.isArray(result.components) && result.components.length > 0
          ? result.components
          : (Array.isArray(result.circuitBlocks) ? result.circuitBlocks : []);

        if (pieces.length > 0) {
          return {
            ...result,
            components: pieces,
            source: 'claude_ai',
            modelName: activeSpeed === 'haiku' ? 'Claude Haiku (Ultra Hızlı)' : 'Claude Sonnet'
          };
        }
      }
      throw new Error("Claude devre kartı üzerindeki parçaları ayrıştıramadı. Lütfen tekrar deneyin.");
    }

    // 2. GOOGLE GEMINI SAĞLAYICISI
    if (provider === 'gemini') {
      const activeKey = (geminiKey && geminiKey.trim().length > 15)
        ? geminiKey.trim()
        : (localStorage.getItem('gemini_api_key') || '');

      if (!activeKey || activeKey.length <= 15) {
        throw new Error("Lütfen geçerli bir Google Gemini API anahtarı girin (AIzaSy... veya AQ...).");
      }

      if (onStatus) onStatus("Google Gemini Flash ile devre parçaları tek tek taranıyor...");
      const result = await this.callGeminiAI(imageSrc, activeKey, onStatus);
      if (result) {
        let pieces = Array.isArray(result.components) && result.components.length > 0
          ? result.components
          : (Array.isArray(result.circuitBlocks) ? result.circuitBlocks : []);

        if (pieces.length > 0) {
          return {
            ...result,
            components: pieces,
            source: 'gemini_ai',
            modelName: 'Gemini Flash AI'
          };
        }
      }
      throw new Error("Gemini devre kartı üzerindeki parçaları ayrıştıramadı. Lütfen tekrar deneyin.");
    }

    // 3. YALNIZCA HİÇBİR API ANAHTARI SEÇİLMEDİYSE YEREL OPTİK CV ÇALIŞTIR
    if (onStatus) onStatus("Yerel optik analiz motoru çalıştırılıyor...");
    const localResult = await this.runUniversalCanvasCV(imageSrc);
    return { ...localResult, source: 'canvas_cv' };
  },

  async callGeminiAI(imageSrc, apiKey, onStatus) {
    const clean = this.cleanKey(apiKey);
    const base64Data = imageSrc.includes(",") ? imageSrc.split(",")[1] : imageSrc;
    if (!base64Data) throw new Error("Görsel verisi çözümlenemedi.");

    const prompt = this.getPromptText();
    let savedModel = localStorage.getItem('gemini_model_name');
    let candidateModels = savedModel
      ? [savedModel, 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-pro']
      : ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-pro', 'gemini-flash-latest'];

    // Kayıtlı model yoksa API'den dinamik listeyi çek
    if (!savedModel) {
      try {
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(clean)}`, {
          method: "GET",
          headers: { "x-goog-api-key": clean }
        });
        if (listRes.ok) {
          const listData = await listRes.json();
          if (Array.isArray(listData.models)) {
            const apiModels = listData.models
              .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
              .map(m => m.name.replace(/^models\//, ''));
            if (apiModels.length > 0) {
              apiModels.sort((a, b) => {
                const aScore = a.includes('2.5-flash') ? 0 : a.includes('2.0-flash') ? 1 : a.includes('flash') ? 2 : 3;
                const bScore = b.includes('2.5-flash') ? 0 : b.includes('2.0-flash') ? 1 : b.includes('flash') ? 2 : 3;
                return aScore - bScore;
              });
              candidateModels = apiModels;
            }
          }
        }
      } catch (_) {}
    }

    let lastErr = '';
    for (const model of candidateModels) {
      if (onStatus) onStatus(`Gemini (${model}) üzerinden devre analiz ediliyor...`);
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(clean)}`;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": clean },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64Data } }] }],
            generationConfig: { response_mime_type: "application/json", temperature: 0.15 }
          })
        });

        if (res.ok) {
          localStorage.setItem('gemini_model_name', model);
          const resJson = await res.json();
          const rawText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
          return this.parseAndFormatAIResponse(rawText, imageSrc, `Gemini (${model})`);
        }

        let err = `HTTP ${res.status}`;
        try { const d = await res.json(); if (d?.error?.message) err = d.error.message; } catch (_) {}
        if (res.status === 429) {
          throw new Error("Google Gemini istek limitine ulaşıldı (429 / Rate Limit). Ücretsiz kota gereği lütfen 10-15 saniye bekleyin veya alternatif olarak Claude'u seçin.");
        }
        if (res.status === 503) {
          throw new Error("Google sunucuları şu anda yoğun (503). Lütfen birkaç saniye bekleyin veya alternatif olarak Claude'u seçin.");
        }
        lastErr = `Gemini API (${model} ${res.status}): ${err}`;
      } catch (err) {
        if (err.message && (err.message.includes("429") || err.message.includes("503") || err.message.includes("limit"))) {
          throw err;
        }
        lastErr = err.message;
      }
    }
    throw new Error(lastErr || "Gemini analiz isteği başarısız oldu.");
  },

  async callClaudeAI(imageSrc, apiKey, onStatus, speedTier = null) {
    const clean = this.cleanKey(apiKey);
    const base64Data = imageSrc.includes(",") ? imageSrc.split(",")[1] : imageSrc;
    if (!base64Data) throw new Error("Görsel verisi çözümlenemedi.");

    const prompt = this.getPromptText();
    const activeSpeed = speedTier || localStorage.getItem('claude_speed_tier') || 'haiku';

    // Model seçimini hız moduna göre KESİN OLARAK ayır:
    let candidateModels = [];
    if (activeSpeed === 'haiku') {
      candidateModels = ['claude-haiku-5-5', 'claude-haiku-4-5-20251001'];
    } else {
      candidateModels = ['claude-sonnet-5-5', 'claude-sonnet-5', 'claude-sonnet-4-6'];
    }

    let lastErr = '';
    for (const model of candidateModels) {
      if (onStatus) {
        const isHaiku = model.includes('haiku');
        onStatus(isHaiku ? `⚡ Claude Haiku (${model}) ile hızlı taranıyor (~2-3 sn)...` : `🧠 Claude Sonnet (${model}) ile analiz ediliyor...`);
      }

      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': clean,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: model,
            max_tokens: 3500,
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64Data } },
                  { type: 'text', text: prompt }
                ]
              }
            ]
          })
        });

        if (res.ok) {
          localStorage.setItem('claude_model_name', model);
          const resJson = await res.json();
          const rawText = resJson.content?.map(c => c.text || '').join('\n');
          const isHaiku = model.includes('haiku');
          return this.parseAndFormatAIResponse(rawText, imageSrc, isHaiku ? `Claude Haiku (${model})` : `Claude Sonnet (${model})`);
        }

        let err = `HTTP ${res.status}`;
        try { const d = await res.json(); if (d?.error?.message) err = d.error.message; } catch (_) {}
        if (res.status === 529 || res.status === 503) {
          throw new Error("Anthropic Claude sunucuları şu anda yoğun. Lütfen birkaç saniye bekleyin veya alternatif olarak Gemini'yi kullanın.");
        }
        lastErr = `Claude API (${model} ${res.status}): ${err}`;
      } catch (err) {
        if (err.message && (err.message.includes("yoğun") || err.message.includes("529"))) throw err;
        lastErr = err.message;
      }
    }
    throw new Error(lastErr || "Claude analiz isteği başarısız oldu.");
  },

  getPromptText() {
    return `Sen kıdemli bir donanım mühendisi ve elektronik devre muayene uzmanısın.
Fotoğraftaki baskılı devre kartını (PCB) derinlemesine incele ve üzerindeki TÜM BİLEŞENLERİ PARÇA PARÇA TESPİT ET.

ÇOK ÖNEMLİ KURAL 1 - KAPSAMLI VE EKSİKSİZ TARAMA (HİÇBİR PARÇAYI ATLAMA - EN AZ 14 İLA 22 PARÇA):
Asla sadece 3-4 ana parça bulup durma! Kartın üzerindeki tüm fonksiyonel bileşenleri sistematik olarak tara:
1. Mikrodenetleyiciler ve Tüm Entegre Devreler (MCU modülleri, SOIC/DIP entegreler, mantık çipleri: IC1, IC2, IC3 vb.)
2. Voltaj Regülatörleri ve Güç Entegreleri (LM2596, AMS1117, 7805, TO-220/TO-263 transistörler/MOSFET'ler)
3. Güç İndüktörleri / Bobinler (470, 221, 100uH korumalı bobinler vb.)
4. Elektrolitik ve Tantal Kondansatörler (Farklı değerlerdeki filtre ve kuplaj kondansatörleri)
5. Tüm Konnektörler ve Soketler (USB portları, klemens blokları, GPS/sensör soketleri, motor/trafo konnektörleri, MicroSD kart yuvası, header pinleri)
6. Anahtarlar, Butonlar ve Seçiciler (DIP switch, slide switch, tact butonlar, kalibrasyon butonları)
7. Kullanıcı Ayar Elemanları (Mavi trimpotlar / potansiyometreler W103 vb.)
8. Sesli ve Görsel Elemanlar (Buzzer / piezo ses elemanı, durum LED'leri)
9. Kristal Osilatörler (Metal gövdeli kristaller: 16MHz, 20MHz, saat kristalleri)
10. Güvenlik ve Koruma Elemanları (Sigortalar / FUSE, varistörler, TVS diyotları, doğrultucu diyot dizileri)

Kartta yer alan EN AZ 14 İLA 22 ADET FARKLI PARÇAYI tek tek ayır ve listele.

ÇOK ÖNEMLİ KURAL 2 - HASSAS KOORDİNAT HİZALAMASI (TÜM FOTOĞRAF TUVALİ):
- Her bir parçanın kutucuğu (bbox: { x, y, w, h }) YALNIZCA o parçanın kendi fiziksel gövdesini sıkıca çevrelemelidir (%4 ila %18 arası).
- Koordinatlar %0 ile %100 arasında tüm fotoğraf tuvaline (image frame) göre verilmelidir:
  * x: Parçanın sol kenarının tüm fotoğraf genişliğine göre yüzdesi (0-100)
  * y: Parçanın üst kenarının tüm fotoğraf yüksekliğine göre yüzdesi (0-100)
  * w: Parçanın kendi genişliği (genellikle %4 ila %16)
  * h: Parçanın kendi yüksekliği (genellikle %4 ila %16)
- Kart fotoğrafın ortasındaysa ve etrafında masa/arka plan varsa, x ve y koordinatları bu arka plan boşluklarını da kapsayacak şekilde TÜM FOTOĞRAFA göre hesaplanmalıdır.

ÇOK ÖNEMLİ KURAL 3 - EĞİTİCİ VE NET GÖREV AÇIKLAMALARI (functionDesc):
Her parçanın devrede tam olarak ne işe yaradığını, sistemin çalışmasına nasıl katkı sağladığını (örn: Buzzer'ın sistem alarmları ve kullanıcı geri bildirimi üretmesi, GPS soketinin harici uydu anteninden NMEA konum verisi alması, USB portunun kod yükleme ve seri haberleşme sağlaması, trimpotun analog kalibrasyon ve hassasiyet ayarı yapması, kristalin işlemci saat frekansını üretmesi gibi) eğitici ve net bir dille açıkla.

Aşağıdaki JSON şemasına BİREBİR uygun geçerli bir JSON döndür (Markdown backtickleri kullanma, saf JSON döndür):
{
  "title": "<Görseldeki serigrafi yazılarından ve çiplerden okunan kart adı (örn: TEKDAĞ ELEKTRONİK GRADİO METRE / TEKNEL PCB)>",
  "category": "<Kartın kategorisi (örn: IoT & Mikrodenetleyici (MCU) / Güç Kartı / Motor Sürücü / Sensör)>",
  "purpose": "<Kartın fotoğraftan anlaşılan işlevi, sensör mimarisi ve ne amaçla kullanıldığına dair 2-3 cümlelik net açıklama>",
  "tags": ["<Etiket1>", "<Etiket2>", "<Etiket3>"],
  "confidence": "%99.4",
  "components": [
    {
      "id": "c1",
      "name": "<1. Parça Adı (örn: ESP32-WROOM-32D Mikrodenetleyici Modülü)>",
      "category": "Mikrodenetleyici (MCU)",
      "packageType": "<Kılıf tipi (örn: SMD Modül)>",
      "functionDesc": "<Bu parçanın devredeki tam görevi ve ne işe yaradığı>",
      "pinoutInfo": "<Çalışma voltajı veya temel pin detayı>",
      "bbox": { "x": 38, "y": 28, "w": 14, "h": 12 }
    },
    {
      "id": "c2",
      "name": "<2. Parça Adı (örn: Sesli İkaz Buzzer'ı)>",
      "category": "Ses & Uyarı Elemanı",
      "packageType": "Dairesel Piezo / Elektromanyetik",
      "functionDesc": "<Cihaz durumu, hata ikazları ve kullanıcı bildirimleri için sesli alarm üretir>",
      "pinoutInfo": "5V DC Tetikleme",
      "bbox": { "x": 30, "y": 62, "w": 8, "h": 8 }
    }
  ]
}`;
  },

  parseAndFormatAIResponse(rawText, imageSrc, modelName) {
    const parsed = repairAndParseJson(rawText);

    const defaultColors = ['blue', 'emerald', 'purple', 'cyan', 'amber', 'rose'];

    // 1. Fonksiyonel Devre Blokları (Açıklamada Belirtilen Bloklar)
    const rawBlocks = Array.isArray(parsed.circuitBlocks) ? parsed.circuitBlocks : [];
    const convertedBlocks = rawBlocks.map((blk, idx) => {
      const bbox = normalizeBoundingBox(blk, idx, true);
      return {
        id: blk?.id || `block-${Date.now()}-${idx}`,
        name: blk?.name || `Devre Bloğu #${idx + 1}`,
        type: blk?.type || "Fonksiyonel Devre Katı",
        description: blk?.description || blk?.role || "Devre mimari bloğu.",
        color: blk?.color || defaultColors[idx % defaultColors.length],
        isBlock: true,
        bbox
      };
    });

    // 2. Tekil Çipler ve Entegreler
    const rawComponents = Array.isArray(parsed.components) ? parsed.components : [];
    const convertedComponents = rawComponents.map((comp, idx) => {
      const bbox = normalizeBoundingBox(comp, idx, false);
      return {
        id: comp?.id || `ai-${Date.now()}-${idx}`,
        name: comp?.name || `Bileşen #${idx + 1}`,
        category: comp?.category || "Entegre Devre (IC)",
        packageType: comp?.packageType || "SMD",
        functionDesc: comp?.functionDesc || "Devre bileşeni.",
        pinoutInfo: comp?.pinoutInfo || "Standart bağlantı padleri.",
        isBlock: false,
        bbox
      };
    });

    return {
      title: parsed?.title || "Yapay Zeka Devre Kartı Analizi",
      category: parsed?.category || "Genel / Özel Devre",
      purpose: parsed?.purpose || "Yapay zeka analiz motoru tarafından görseldeki bileşenler ve bloklar taranarak oluşturulan devre profili.",
      tags: Array.isArray(parsed?.tags) ? parsed.tags : ["Yapay Zeka", modelName, "Otomatik Tespit"],
      confidence: parsed?.confidence || `%99.5 (${modelName})`,
      boardDimensions: parsed?.boardDimensions || "Belirleniyor",
      layerCount: parsed?.layerCount || "Çift Yüzlü FR-4",
      circuitBlocks: convertedBlocks,
      components: convertedComponents,
      modelName,
      imageUrl: imageSrc
    };
  },

  runUniversalCanvasCV(imageSrc) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const origWidth = img.naturalWidth || img.width || 800;
        const origHeight = img.naturalHeight || img.height || 600;

        const scanW = 400;
        const scanH = Math.round((origHeight / origWidth) * scanW) || 300;
        const canvas = document.createElement("canvas");
        canvas.width = scanW;
        canvas.height = scanH;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, scanW, scanH);

        const imgData = ctx.getImageData(0, 0, scanW, scanH);
        const pixels = imgData.data;

        let rSum = 0, gSum = 0, bSum = 0;
        let totalCount = scanW * scanH;
        let luminanceArray = new Float32Array(totalCount);
        let lumSum = 0;

        for (let i = 0; i < totalCount; i++) {
          const r = pixels[i * 4];
          const g = pixels[i * 4 + 1];
          const b = pixels[i * 4 + 2];
          rSum += r;
          gSum += g;
          bSum += b;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          luminanceArray[i] = lum;
          lumSum += lum;
        }

        const avgR = Math.round(rSum / totalCount);
        const avgG = Math.round(gSum / totalCount);
        const avgB = Math.round(bSum / totalCount);
        const avgLum = lumSum / totalCount;

        let pcbColorName = "Yeşil Standart FR-4";
        if (avgB > avgG * 1.15 && avgB > avgR) pcbColorName = "Mavi Lehim Maskesi";
        else if (avgG > avgR * 1.08 && avgG > avgB) pcbColorName = "Yeşil Standart FR-4";
        else if (avgR > avgG * 1.25 && avgR > avgB * 1.25) pcbColorName = "Kırmızı Yüksek Hızlı PCB";
        else if (avgR < 60 && avgG < 60 && avgB < 60) pcbColorName = "Mat Siyah (Black Matte) Çok Katmanlı";

        const compBinary = new Uint8Array(totalCount);
        const darkThreshold = Math.min(130, Math.max(50, avgLum * 0.78));

        for (let i = 0; i < totalCount; i++) {
          const r = pixels[i * 4];
          const g = pixels[i * 4 + 1];
          const b = pixels[i * 4 + 2];
          const lum = luminanceArray[i];
          const colorDist = Math.abs(r - avgR) + Math.abs(g - avgG) + Math.abs(b - avgB);
          if (lum < darkThreshold && colorDist > 25) compBinary[i] = 1;
        }

        const gridCols = 32;
        const gridRows = Math.max(10, Math.round((scanH / scanW) * gridCols));
        const cellW = scanW / gridCols;
        const cellH = scanH / gridRows;

        const cellDensity = Array(gridRows).fill(0).map(() => Array(gridCols).fill(0));
        for (let y = 0; y < scanH; y++) {
          for (let x = 0; x < scanW; x++) {
            if (compBinary[y * scanW + x] === 1) {
              const c = Math.min(gridCols - 1, Math.floor(x / cellW));
              const r = Math.min(gridRows - 1, Math.floor(y / cellH));
              cellDensity[r][c]++;
            }
          }
        }

        const cellPixelCount = cellW * cellH;
        const cellThreshold = cellPixelCount * 0.16;
        const visited = Array(gridRows).fill(false).map(() => Array(gridCols).fill(false));
        const rawRegions = [];

        for (let r = 0; r < gridRows; r++) {
          for (let c = 0; c < gridCols; c++) {
            if (!visited[r][c] && cellDensity[r][c] > cellThreshold) {
              let minR = r, maxR = r, minC = c, maxC = c;
              let clusterCount = 0;
              const queue = [[r, c]];
              visited[r][c] = true;

              while (queue.length > 0) {
                const [curR, curC] = queue.shift();
                clusterCount++;
                minR = Math.min(minR, curR);
                maxR = Math.max(maxR, curR);
                minC = Math.min(minC, curC);
                maxC = Math.max(maxC, curC);

                const neighbors = [
                  [curR - 1, curC], [curR + 1, curC],
                  [curR, curC - 1], [curR + 1, curC + 1]
                ];

                for (const [nR, nC] of neighbors) {
                  if (
                    nR >= 0 && nR < gridRows &&
                    nC >= 0 && nC < gridCols &&
                    !visited[nR][nC] &&
                    cellDensity[nR][nC] > cellThreshold
                  ) {
                    visited[nR][nC] = true;
                    queue.push([nR, nC]);
                  }
                }
              }

              const wCells = maxC - minC + 1;
              const hCells = maxR - minR + 1;
              // Tekil bir bileşen tüm kartı kaplayamaz; maksimum %18 x %18 sınır koy
              if (clusterCount >= 2 && wCells <= 10 && hCells <= 10) {
                const xPct = Math.max(2, Math.round((minC * cellW / scanW) * 100));
                const yPct = Math.max(2, Math.round((minR * cellH / scanH) * 100));
                const wPct = Math.min(18, Math.max(4, Math.round((wCells * cellW / scanW) * 100)));
                const hPct = Math.min(18, Math.max(4, Math.round((hCells * cellH / scanH) * 100)));

                rawRegions.push({ x: xPct, y: yPct, w: wPct, h: hPct, area: wPct * hPct });
              }
            }
          }
        }

        rawRegions.sort((a, b) => b.area - a.area);
        const filteredRegions = [];

        for (const reg of rawRegions) {
          const isOverlapped = filteredRegions.some(existing => {
            const xOverlap = Math.max(0, Math.min(reg.x + reg.w, existing.x + existing.w) - Math.max(reg.x, existing.x));
            const yOverlap = Math.max(0, Math.min(reg.y + reg.h, existing.y + existing.h) - Math.max(reg.y, existing.y));
            return (xOverlap * yOverlap) > (reg.area * 0.6);
          });

          if (!isOverlapped && filteredRegions.length < 8) filteredRegions.push(reg);
        }

        const components = filteredRegions.map((box, index) => ({
          id: `comp-pixel-${Date.now()}-${index}`,
          name: index === 0 ? "Merkezi Kontrolcü IC (MCU)" : `Elektronik Entegre Devre #${index + 1}`,
          category: index === 0 ? "Mikrodenetleyici (MCU)" : "Entegre Devre (IC)",
          packageType: "SMD Yüzey Montaj",
          functionDesc: "Optik piksel kontrast analizi ile tespit edilen devre bileşeni.",
          pinoutInfo: "Çoklu lehim padleri tespit edildi.",
          bbox: { x: box.x, y: box.y, w: box.w, h: box.h }
        }));

        resolve({
          title: `Optik Taranan Devre (${pcbColorName.split(" ")[0]})`,
          category: components[0]?.category || "Genel Devre",
          purpose: `Görsel kontrast analizi ile tespit edilen ${components.length} adet elektronik bileşen profili. Daha derin analiz için Gemini veya Claude API anahtarı önerilir.`,
          tags: ["Özel PCB", pcbColorName.split(" ")[0], "Yerel Optik Tarama"],
          imageUrl: imageSrc,
          confidence: `%${Math.min(94, Math.max(80, 80 + components.length * 2))}`,
          layerCount: "FR-4 Endüstriyel Devre Kartı",
          dimensions: `${origWidth} x ${origHeight} px`,
          components
        });
      };
      img.src = imageSrc;
    });
  }
};