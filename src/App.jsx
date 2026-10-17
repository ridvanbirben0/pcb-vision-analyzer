import React, { useState, useEffect, useMemo, Component } from 'react';
import { storageService } from './services/storageService';
import { INITIAL_PCB_LIBRARY } from './data/mockPcbData';
import { imageAnalysisEngine } from './services/imageAnalysisEngine';

// --- HATA KALKANI (ERROR BOUNDARY - SAYFA ÇÖKMELERİNİ ÖNLER) ---
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary yakaladı:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-rose-950/80 border border-rose-800 rounded-full flex items-center justify-center mx-auto text-xl text-rose-400">
              ⚠️
            </div>
            <h2 className="text-lg font-bold text-white">Görüntüleme Hatası Önleyici</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tarayıcı hafızasındaki eski veya uyumsuz bir veri sebebiyle sayfa yüklenemedi. Aşağıdaki butona basarak verileri temizleyebilir ve sayfayı açabilirsiniz.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('pcb_vision_library_v2');
                  } catch (_) {}
                  window.location.reload();
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg transition-all"
              >
                🔄 Verileri Sıfırla ve Sayfayı Aç
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
// --- GÖRSELİ LOCALSTORAGE İÇİN SIKIŞTIRMA (5MB KOTA KORUMASI) ---
function compressImageForStorage(fileOrDataUri, maxDimension = 800, quality = 0.82) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let w = img.width;
      let h = img.height;
      if (w > maxDimension || h > maxDimension) {
        if (w > h) {
          h = Math.round((h * maxDimension) / w);
          w = maxDimension;
        } else {
          w = Math.round((w * maxDimension) / h);
          h = maxDimension;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      resolve(typeof fileOrDataUri === 'string' ? fileOrDataUri : '');
    };
    if (typeof fileOrDataUri === 'string') {
      img.src = fileOrDataUri;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      reader.readAsDataURL(fileOrDataUri);
    }
  });
}

// --- TOAST BİLDİRİM BİLEŞENİ ---
function Toast({ toast, onClose }) {
  if (!toast) return null;
  const { message, type } = toast;
  const bgColors = {
    success: 'bg-emerald-900/90 border-emerald-500 text-emerald-100',
    error: 'bg-rose-900/90 border-rose-500 text-rose-100',
    info: 'bg-cyan-900/90 border-cyan-500 text-cyan-100'
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl backdrop-blur-md transition-all ${bgColors[type] || bgColors.info}`}>
      <span className="text-xs font-medium">{message}</span>
      <button onClick={onClose} className="text-white/70 hover:text-white font-bold ml-2">✕</button>
    </div>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [library, setLibrary] = useState(() => storageService.getAll());
  const [toast, setToast] = useState(null);

  const [modalMode, setModalMode] = useState(null);
  const [selectedPcb, setSelectedPcb] = useState(null);

  const [selectedPresetId, setSelectedPresetId] = useState('pcb-demo-1');
  const [customImage, setCustomImage] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(() => localStorage.getItem('ai_selected_provider') || 'gemini');
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [claudeApiKey, setClaudeApiKey] = useState(() => localStorage.getItem('claude_api_key') || '');
  const [showApiModal, setShowApiModal] = useState(false);
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [apiTestStatus, setApiTestStatus] = useState(null);
  const [showKeyText, setShowKeyText] = useState(false);
  const [claudeSpeedTier, setClaudeSpeedTier] = useState(() => localStorage.getItem('claude_speed_tier') || 'haiku');

  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [boxDisplayMode, setBoxDisplayMode] = useState('all'); // 'all' | 'selected'
  const [isDeepScanning, setIsDeepScanning] = useState(false);
  const [showManualAddModal, setShowManualAddModal] = useState(false);
  const [manualComponentData, setManualComponentData] = useState({
    name: '',
    category: 'Entegre Devre (IC)',
    packageType: 'SMD',
    functionDesc: '',
    pinoutInfo: '',
    x: 40,
    y: 40,
    w: 12,
    h: 12
  });

  // Yeni Kart Ekle modalında görsel önizleme state'i
  const [modalImagePreview, setModalImagePreview] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    storageService.importJson(library);
  }, [library]);

  const loadPreset = (presetId) => {
    setSelectedPresetId(presetId);
    setCustomImage(null);
    const match = INITIAL_PCB_LIBRARY.find((p) => p.id === presetId);
    if (match) {
      setAnalysisResult({ ...match, detectedCount: match.components.length, source: 'preset' });
      setActiveHotspot(match.components[0] || null);
    }
  };

  // KÜTÜPHANEDEN KARTI İNTERAKTİF ANALİZ EKRANINDA AÇMA (AŞAMA 2)
  const openCardInAnalysisView = (card) => {
    if (!card) return;
    setSelectedPresetId(null);
    setCustomImage(card.imageUrl);
    const resultObj = {
      id: card.id,
      title: card.title,
      category: card.category,
      purpose: card.purpose,
      imageUrl: card.imageUrl,
      confidence: card.confidence || '%99.2 (Kayıtlı Profil)',
      layerCount: card.layerCount || 'Çift Katman FR-4 Devre Kartı',
      dimensions: card.dimensions || 'Standart PCB',
      tags: card.tags || ['Kütüphane Kartı'],
      components: Array.isArray(card.components) ? card.components : [],
      source: 'library_saved'
    };
    setAnalysisResult(resultObj);
    setActiveHotspot(resultObj.components && resultObj.components.length > 0 ? resultObj.components[0] : null);
    setModalMode(null);
    setActiveTab('analyze');
    showToast(`🔍 "${card.title}" interaktif analiz ekranında açıldı!`, 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    loadPreset('pcb-demo-1');
  }, []);

  // FOTOĞRAF YÜKLEME VE OTONOM ANALİZ
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    showToast("Görsel hazırlanıyor...", "info");
    const compressedDataUri = await compressImageForStorage(file, 900, 0.85);

    setCustomImage(compressedDataUri);
    setSelectedPresetId(null);
    setActiveHotspot(null);
    setAnalysisResult(null);
    setIsScanning(true);

    try {
      const result = await imageAnalysisEngine.analyze(
        compressedDataUri,
        {
          provider: selectedProvider,
          geminiKey: geminiApiKey,
          claudeKey: claudeApiKey,
          speedTier: claudeSpeedTier
        },
        (statusMsg) => {
          showToast(statusMsg, "info");
        }
      );

      setAnalysisResult(result);
      setActiveHotspot(result.components && result.components[0] ? result.components[0] : null);
      setIsScanning(false);

      if (result.source === 'gemini_ai') {
        showToast(`✨ Google Gemini AI: ${result.components ? result.components.length : 0} çip ve devre yapısı otonom tespit edildi!`, "success");
      } else if (result.source === 'claude_ai') {
        showToast(`🟣 ${result.modelName || 'Claude Haiku'}: ${result.components ? result.components.length : 0} çip ve devre yapısı tespit edildi!`, "success");
      } else {
        showToast(`⚡ Yerel optik tarama tamamlandı (${result.components ? result.components.length : 0} bileşen).`, "info");
      }
    } catch (err) {
      setIsScanning(false);
      console.error("Analiz hatası:", err);
      showToast(`Hata: ${err.message || "Görsel incelenirken sorun oluştu."}`, "error");
    }
  };

  // 3. MEVCUT GÖRSELİ YENİDEN ANALİZ ET
  const handleReanalyze = async () => {
    const currentImg = customImage || (analysisResult && analysisResult.imageUrl);
    if (!currentImg) {
      showToast("Analiz edilecek bir devre kartı görseli bulunamadı.", "error");
      return;
    }

    setIsScanning(true);
    setActiveHotspot(null);
    showToast(`🔄 Devre kartı ${selectedProvider === 'claude' ? 'Claude' : 'Gemini'} ile yeniden analiz ediliyor...`, "info");

    try {
      const result = await imageAnalysisEngine.analyze(
        currentImg,
        {
          provider: selectedProvider,
          geminiKey: geminiApiKey,
          claudeKey: claudeApiKey,
          speedTier: claudeSpeedTier
        },
        (statusMsg) => showToast(statusMsg, "info")
      );

      setAnalysisResult(result);
      setActiveHotspot(result.components && result.components[0] ? result.components[0] : null);
      setIsScanning(false);

      if (result.source === 'gemini_ai') {
        showToast(`✨ Google Gemini: ${result.components ? result.components.length : 0} çip ve devre yapısı tespit edildi!`, "success");
      } else if (result.source === 'claude_ai') {
        showToast(`🟣 Anthropic Claude: ${result.components ? result.components.length : 0} çip ve devre yapısı tespit edildi!`, "success");
      } else {
        showToast(`⚡ Yerel optik tarama tamamlandı (${result.components ? result.components.length : 0} bileşen).`, "info");
      }
    } catch (err) {
      setIsScanning(false);
      console.error("Yeniden analiz hatası:", err);
      showToast(`Hata: ${err.message || "Yeniden analiz esnasında sorun oluştu."}`, "error");
    }
  };

  // EKSİK PARÇALARI TARA VE MEVCUT KARTA EKLE (GÖRSELİ VE BULUNANLARI KAYBETMEDEN)
  const handleDeepScanAppend = async () => {
    const currentImg = customImage || (analysisResult && analysisResult.imageUrl);
    if (!currentImg) {
      showToast("Eksik parçaları taramak için önce bir kart yüklemelisiniz.", "error");
      return;
    }

    setIsDeepScanning(true);
    showToast("🔍 Kart üzerindeki diğer eksik parçalar taranıyor...", "info");

    try {
      const existingComps = analysisResult?.components || [];
      const newPieces = await imageAnalysisEngine.findMissingComponents(
        currentImg,
        existingComps,
        {
          provider: selectedProvider,
          geminiKey: geminiApiKey,
          claudeKey: claudeApiKey,
          speedTier: claudeSpeedTier
        },
        (statusMsg) => showToast(statusMsg, "info")
      );

      if (Array.isArray(newPieces) && newPieces.length > 0) {
        const mergedComponents = [...existingComps, ...newPieces];
        setAnalysisResult({
          ...analysisResult,
          components: mergedComponents
        });
        setActiveHotspot(newPieces[0]);
        showToast(`✨ ${newPieces.length} yeni eksik parça kartınıza eklendi! Toplam: ${mergedComponents.length}`, "success");
      } else {
        showToast("Kart üzerindeki tüm belirgin parçalar zaten tespit edilmiş.", "info");
      }
    } catch (err) {
      console.error("Eksik parça tarama hatası:", err);
      showToast(`Hata: ${err.message || "Eksik parçalar taranırken sorun oluştu."}`, "error");
    } finally {
      setIsDeepScanning(false);
    }
  };

  // MANUEL PARÇA EKLEME
  const handleAddManualComponent = (e) => {
    e.preventDefault();
    if (!manualComponentData.name.trim()) {
      showToast("Lütfen bir parça adı girin.", "error");
      return;
    }
    const newComp = {
      id: `manual-${Date.now()}`,
      name: manualComponentData.name.trim(),
      category: manualComponentData.category,
      packageType: manualComponentData.packageType,
      functionDesc: manualComponentData.functionDesc || "Kullanıcı tarafından eklenen devre parçası.",
      pinoutInfo: manualComponentData.pinoutInfo || "Standart devre bağlantısı.",
      bbox: {
        x: Number(manualComponentData.x) || 40,
        y: Number(manualComponentData.y) || 40,
        w: Number(manualComponentData.w) || 12,
        h: Number(manualComponentData.h) || 12
      },
      isBlock: false
    };

    const updatedList = [...(analysisResult?.components || []), newComp];
    setAnalysisResult({
      ...analysisResult,
      components: updatedList
    });
    setActiveHotspot(newComp);
    setShowManualAddModal(false);
    setManualComponentData({
      name: '',
      category: 'Entegre Devre (IC)',
      packageType: 'SMD',
      functionDesc: '',
      pinoutInfo: '',
      x: 40,
      y: 40,
      w: 12,
      h: 12
    });
    showToast(`"${newComp.name}" kart üzerine eklendi!`, "success");
  };

  // SEÇİLİ PARÇAYI KARTTAN SİLME
  const handleDeleteCurrentComponent = (compId) => {
    if (!compId || !analysisResult) return;
    const updated = (analysisResult.components || []).filter(c => c.id !== compId);
    setAnalysisResult({ ...analysisResult, components: updated });
    setActiveHotspot(updated[0] || null);
    showToast("Bileşen karttan kaldırıldı.", "info");
  };

  // CRUD: CREATE (YENİ KART EKLEME)
  const handleCreatePcb = (formData) => {
    const item = storageService.create(formData);
    setLibrary(storageService.getAll());
    setModalMode(null);
    setModalImagePreview('');
    showToast(`"${item.title}" kütüphaneye eklendi!`, 'success');
  };

  // CRUD: UPDATE (KART GÜNCELLEME)
  const handleUpdatePcb = (updatedData) => {
    storageService.update(updatedData.id, updatedData);
    setLibrary(storageService.getAll());
    setModalMode(null);
    setModalImagePreview('');
    showToast(`"${updatedData.title}" güncellendi!`, 'info');
  };

  // CRUD: DELETE (KART SİLME)
  const handleDeletePcb = () => {
    if (!selectedPcb) return;
    storageService.delete(selectedPcb.id);
    setLibrary(storageService.getAll());
    setModalMode(null);
    showToast(`"${selectedPcb.title}" silindi.`, 'error');
    setSelectedPcb(null);
  };

  // ANALİZDEN KÜTÜPHANEYE KAYDET
  const handleSaveAnalysisToLibrary = () => {
    if (!analysisResult) return;
    const newRecord = {
      title: analysisResult.title,
      category: analysisResult.category,
      purpose: analysisResult.purpose,
      imageUrl: analysisResult.imageUrl,
      userNotes: `Analizden eklendi. Güvenilirlik: ${analysisResult.confidence}`,
      tags: analysisResult.tags || ['Yapay Zeka Analiz'],
      components: analysisResult.components || [],
      isAnalyzed: true
    };
    handleCreatePcb(newRecord);
    setActiveTab('library');
  };

  const handleExportJson = () => {
    storageService.exportJson();
    showToast('Kütüphane JSON olarak indirildi!', 'success');
  };

  const handleImportJson = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const success = storageService.importJson(event.target.result);
      if (success) {
        setLibrary(storageService.getAll());
        showToast('Kütüphane başarıyla içe aktarıldı!', 'success');
      } else {
        showToast('Geçersiz JSON dosyası!', 'error');
      }
    };
    reader.readAsText(file);
  };

  const filteredLibrary = useMemo(() => {
    return library.filter((item) => {
      const matchesCat = selectedCategory === 'Hepsi' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        item.title.toLowerCase().includes(query) ||
        item.purpose.toLowerCase().includes(query) ||
        (item.userNotes && item.userNotes.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));
      return matchesCat && matchesQuery;
    });
  }, [library, selectedCategory, searchQuery]);

  const categories = ['Hepsi', 'Mikrodenetleyici', 'Güç & Şarj Katı', 'Ses & Amplifikatör', 'Genel / Özel Devre'];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* ÜST HEADER */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('analyze')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center shadow-lg text-black font-extrabold text-xl">
              ⚡
            </div>
            <div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                PCB Vision AI
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">v1.5</span>
              </h1>
              <p className="text-xs text-slate-400">Akıllı Baskılı Devre Analiz &amp; Bileşen Kütüphanesi</p>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('analyze')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'analyze' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🔍 PCB Analiz
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'library' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📚 Kart Kütüphanesi ({library.length})
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📊 İstatistikler
            </button>
            <button
              onClick={() => {
                setApiTestStatus(null);
                setShowApiModal(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                ((selectedProvider === 'gemini' && geminiApiKey.trim().length > 15) || (selectedProvider === 'claude' && claudeApiKey.trim().length > 15))
                  ? 'bg-purple-950/60 text-purple-300 border-purple-600 hover:bg-purple-900/50'
                  : 'bg-slate-800 text-cyan-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              🔑 {((selectedProvider === 'gemini' && geminiApiKey.trim().length > 15) || (selectedProvider === 'claude' && claudeApiKey.trim().length > 15))
                ? (selectedProvider === 'claude' ? (claudeSpeedTier === 'haiku' ? "⚡ Claude Haiku Aktif" : "🧠 Claude Sonnet Aktif") : "Gemini AI Aktif")
                : "API Anahtarı"}
            </button>
          </nav>
        </div>
      </header>

      {/* ANA İÇERİK ALANI */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">
        {/* 1. PCB ANALİZ SEKMESİ */}
        {activeTab === 'analyze' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6">
              <span className="text-xs uppercase text-emerald-400 font-bold font-mono">Otonom Devre Kartı ve Çip Tanıma</span>
              <h2 className="text-2xl font-extrabold text-white mt-1">Baskılı Devre Kartı (PCB) Yükleyin ve İnceleyin</h2>
              <p className="text-sm text-slate-400 mt-2">
                Fotoğraf yüklediğinizde kartın modeli, ne işe yaradığı ve üzerindeki tüm çipler {selectedProvider === 'claude' ? 'Claude 3.5 Sonnet' : 'Gemini Flash AI'} tarafından otonom olarak okunur ve kutucuklarla tam üzerlerine işaretlenir.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <p className="text-xs font-semibold text-slate-400 mb-2">Hazır Demo Devre Kartları:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {INITIAL_PCB_LIBRARY.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => loadPreset(item.id)}
                      className={`text-left p-2.5 rounded-xl border transition-all text-xs font-bold ${
                        selectedPresetId === item.id && !customImage
                          ? 'bg-emerald-950/60 border-emerald-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* SOL: GÖRSEL VE HİZALANMIŞ KUTUCUKLAR */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h3 className="text-sm font-semibold uppercase text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      Devre Kartı İnceleme Alanı {customImage && <span className="text-xs text-cyan-400 font-mono">(Yüklenen Görsel)</span>}
                    </h3>
                    <div className="flex items-center gap-2">
                      {(customImage || analysisResult?.imageUrl) && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            type="button"
                            onClick={handleReanalyze}
                            disabled={isScanning || isDeepScanning}
                            className="px-2.5 py-1.5 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/80 text-indigo-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-sm disabled:opacity-50"
                            title="Mevcut devre kartı görselini baştan tekrar analiz et"
                          >
                            🔄 {isScanning ? "Taranıyor..." : "Yeniden Analiz Et"}
                          </button>
                          <button
                            type="button"
                            onClick={handleDeepScanAppend}
                            disabled={isScanning || isDeepScanning}
                            className="px-2.5 py-1.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/80 text-purple-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-sm disabled:opacity-50"
                            title="Mevcut parçalara dokunmadan kart üzerindeki diğer eksik parçaları tespit et ve mevcuda ekle"
                          >
                            🔍 {isDeepScanning ? "Eksikler Aranıyor..." : "Eksik Parçaları Tara (+Ekle)"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowManualAddModal(true)}
                            disabled={isScanning || isDeepScanning}
                            className="px-2.5 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/80 text-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-sm"
                            title="Karta manuel yeni bir parça ekle ve kutucuk belirle"
                          >
                            ➕ Parça Ekle
                          </button>
                        </div>
                      )}
                      <label className="cursor-pointer text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <span>📸 Yeni Fotoğraf Yükle</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                      </label>
                    </div>
                  </div>

                  {/* 4. KUTUCUK GÖRÜNÜM DENETİMİ (KARMAŞAYI ÖNLEYİCİ TOGGLE) */}
                  <div className="flex items-center justify-between bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 text-xs mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[11px]">Kutucuk Görünümü:</span>
                      <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 flex-wrap gap-0.5">
                        <button
                          type="button"
                          onClick={() => setBoxDisplayMode('all')}
                          className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${
                            boxDisplayMode === 'all'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          👀 Hepsi
                        </button>
                        <button
                          type="button"
                          onClick={() => setBoxDisplayMode('blocks')}
                          className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${
                            boxDisplayMode === 'blocks'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          🧩 Bloklar ({analysisResult?.circuitBlocks?.length || 0})
                        </button>
                        <button
                          type="button"
                          onClick={() => setBoxDisplayMode('components')}
                          className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${
                            boxDisplayMode === 'components'
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          ⚡ Çipler ({analysisResult?.components?.length || 0})
                        </button>
                        <button
                          type="button"
                          onClick={() => setBoxDisplayMode('selected')}
                          className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${
                            boxDisplayMode === 'selected'
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          🎯 Seçili
                        </button></div>
                    </div>
                    {boxDisplayMode === 'selected' && activeHotspot && (
                      <span className="text-[11px] text-purple-300 font-mono truncate max-w-[220px]">
                        Odak: <strong className="text-white">{activeHotspot.name}</strong>
                      </span>
                    )}
                  </div>

                  {/* Kapsayıcı: Siyah boşluk kaymasını önleyen ve kutucukları tam sınırda tutan inline-block alan */}
                  <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 min-h-[350px] max-h-[550px] flex items-center justify-center select-none p-2">
                    <div className="relative inline-block max-w-full max-h-[500px]">
                      <img
                        src={customImage || (analysisResult && analysisResult.imageUrl) || INITIAL_PCB_LIBRARY[0].imageUrl}
                        alt="PCB Devre Önizleme"
                        className="max-h-[500px] w-auto max-w-full object-contain block mx-auto rounded-lg shadow-md pointer-events-none"
                      />

                      {/* Tarama / Yükleme Animasyonu */}
                      {isScanning && (
                        <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-3 rounded-lg backdrop-blur-sm pointer-events-none z-30">
                          <div className="w-12 h-12 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin"></div>
                          <div className="text-xs font-mono font-bold text-emerald-300 tracking-wider">
                            {selectedProvider === 'claude' ? (claudeSpeedTier === 'haiku' ? '⚡ CLAUDE HAIKU DEVRE KARTINI İNCELİYOR (~2-3 sn)...' : '🧠 CLAUDE SONNET ÇİPLERİ İNCELİYOR...') : 'GEMINI FLASH AI ÇİPLERİ VE SERİGRAFİYİ İNCELİYOR...'}
                          </div>
                        </div>
                      )}

                      {/* 1. DEVRE MİMARİ BLOKLARI (Açıklamada Belirtilen Bloklar - Renkli Bölgeler) */}
                      {!isScanning &&
                        analysisResult &&
                        (boxDisplayMode === 'all' || boxDisplayMode === 'blocks' || boxDisplayMode === 'selected') &&
                        analysisResult.circuitBlocks &&
                        analysisResult.circuitBlocks.map((blk) => {
                          const isSelected = activeHotspot && activeHotspot.id === blk.id;
                          if (boxDisplayMode === 'selected' && !isSelected) {
                            return null;
                          }
                          const blockColors = {
                            blue: 'border-blue-400 bg-blue-500/15 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.25)]',
                            emerald: 'border-emerald-400 bg-emerald-500/15 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
                            purple: 'border-purple-400 bg-purple-500/15 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]',
                            cyan: 'border-cyan-400 bg-cyan-500/15 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
                            amber: 'border-amber-400 bg-amber-500/15 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
                            rose: 'border-rose-400 bg-rose-500/15 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                          };
                          const colorClass = blockColors[blk.color] || blockColors.cyan;
                          return (
                            <div
                              key={blk.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveHotspot(blk);
                              }}
                              style={{
                                left: `${blk.bbox.x}%`,
                                top: `${blk.bbox.y}%`,
                                width: `${blk.bbox.w}%`,
                                height: `${blk.bbox.h}%`
                              }}
                              className={`absolute border-2 border-dashed cursor-pointer transition-all rounded-lg flex items-start justify-start p-1 z-10 ${
                                isSelected
                                  ? 'border-solid border-white bg-indigo-500/35 ring-2 ring-white shadow-[0_0_20px_#6366f1] z-30'
                                  : `${colorClass} hover:border-solid hover:opacity-100`
                              }`}
                              title={`🧩 ${blk.name}: ${blk.description}`}
                            >
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/85 text-white border border-white/20 truncate max-w-full pointer-events-none font-bold">
                                🧩 {blk.name}
                              </span>
                            </div>
                          );
                        })}

                      {/* 2. TEKİL ÇİP VE BİLEŞEN KUTUCUKLARI */}
                      {!isScanning &&
                        analysisResult &&
                        (boxDisplayMode === 'all' || boxDisplayMode === 'components' || boxDisplayMode === 'selected') &&
                        analysisResult.components &&
                        analysisResult.components.map((comp) => {
                          const isSelected = activeHotspot && activeHotspot.id === comp.id;
                          if (boxDisplayMode === 'selected' && !isSelected) {
                            return null;
                          }
                          return (
                            <div
                              key={comp.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveHotspot(comp);
                              }}
                              style={{
                                left: `${comp.bbox.x}%`,
                                top: `${comp.bbox.y}%`,
                                width: `${comp.bbox.w}%`,
                                height: `${comp.bbox.h}%`
                              }}
                              className={`absolute border-2 cursor-pointer transition-all rounded-md flex items-start justify-start p-0.5 z-20 ${
                                isSelected
                                  ? 'border-emerald-400 bg-emerald-500/35 shadow-[0_0_15px_#10b981] z-40 ring-2 ring-white/80'
                                  : 'border-cyan-400/80 bg-cyan-500/15 hover:border-emerald-400 hover:bg-emerald-500/20'
                              }`}
                              title={`${comp.name} (${comp.packageType})`}
                            >
                              <span className="text-[10px] font-mono px-1 rounded bg-black/90 text-emerald-300 border border-emerald-500/40 truncate max-w-full pointer-events-none">
                                {comp.name.slice(0, 16)}
                              </span>
                            </div>
                          );
                        })}</div>
                  </div>

                  <div className="mt-2 text-xs text-slate-400 font-mono flex items-center justify-between">
                    <span>
                      Bileşen kutucuklarına tıklayarak devredeki görev ve pinout detaylarını sağ panelden inceleyebilirsiniz.
                    </span>
                    {analysisResult && <span className="text-emerald-400 font-semibold">{analysisResult.confidence}</span>}
                  </div>
                </div>
              </div>

              {/* SAĞ: ANALİZ SONUÇLARI VE SEÇİLİ ÇİP BİLGİ PANELİ */}
              <div className="lg:col-span-5 space-y-4">
                {analysisResult && (
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Kart Başlığı ve Analiz Kaynağı Rozeti */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold font-mono">
                            {analysisResult.category}
                          </span>
                          {analysisResult.source === 'gemini_ai' ? (
                            <span className="bg-purple-950/80 text-purple-300 border border-purple-700/70 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                              ✨ Gemini Vision AI
                            </span>
                          ) : analysisResult.source === 'claude_ai' ? (
                            <span className="bg-purple-950/80 text-purple-300 border border-purple-700/70 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                              🟣 {analysisResult.modelName || (claudeSpeedTier === 'haiku' ? 'Claude Haiku' : 'Claude Sonnet')}
                            </span>
                          ) : analysisResult.source === 'preset' ? (
                            <span className="bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-full text-[11px] font-mono">
                              📦 Demo Kart
                            </span>
                          ) : analysisResult.source === 'library_saved' ? (
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-600 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                              📚 Kütüphaneden Açıldı
                            </span>
                          ) : (
                            <span className="bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full text-[11px] font-mono">
                              ⚡ Yerel Optik Tarama
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white mt-2">{analysisResult.title}</h3>
                      </div>

                      {/* Devrenin Amacı ve Mimarisi */}
                      <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-emerald-400 block font-bold mb-1">Kartın Devre Mimarisi ve Amacı:</span>
                          <p>{analysisResult.purpose}</p>
                        </div>

                        {/* AÇIKLAMADA BAHSEDİLEN DEVRE BLOKLARI (İNTERAKTİF BLOK BUTONLARI) */}
                        {analysisResult.circuitBlocks && analysisResult.circuitBlocks.length > 0 && (
                          <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                            <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold block">
                              🧩 Açıklamada Belirtilen Devre Blokları ({analysisResult.circuitBlocks.length}):
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {analysisResult.circuitBlocks.map((blk) => {
                                const isSelected = activeHotspot && activeHotspot.id === blk.id;
                                const blockColors = {
                                  blue: 'border-blue-500/40 bg-blue-950/40 text-blue-300 hover:border-blue-400',
                                  emerald: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:border-emerald-400',
                                  purple: 'border-purple-500/40 bg-purple-950/40 text-purple-300 hover:border-purple-400',
                                  cyan: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400',
                                  amber: 'border-amber-500/40 bg-amber-950/40 text-amber-300 hover:border-amber-400',
                                  rose: 'border-rose-500/40 bg-rose-950/40 text-rose-300 hover:border-rose-400'
                                };
                                const colorClass = blockColors[blk.color] || blockColors.cyan;
                                return (
                                  <button
                                    key={blk.id}
                                    type="button"
                                    onClick={() => setActiveHotspot(blk)}
                                    className={`text-left p-2 rounded-xl border text-[11px] transition-all flex flex-col justify-between ${
                                      isSelected
                                        ? 'ring-2 ring-white shadow-lg bg-indigo-900/80 border-indigo-400 text-white'
                                        : colorClass
                                    }`}
                                  >
                                    <div className="font-bold flex items-center justify-between">
                                      <span>🧩 {blk.name}</span>
                                      <span className="text-[9px] font-mono px-1 rounded bg-black/50 text-slate-300">
                                        {blk.type || "Blok"}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-slate-300/90 mt-1 line-clamp-1">{blk.description}</p>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* SEÇİLİ BİLEŞEN VEYA DEVRE BLOĞU DETAY KARTI */}
                      {activeHotspot && activeHotspot.isBlock ? (
                        <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/50 space-y-2.5 shadow-lg">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                              🧩 {activeHotspot.name}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                              X: %{activeHotspot.bbox.x} | Y: %{activeHotspot.bbox.y} | G: %{activeHotspot.bbox.w}
                            </span>
                          </div>

                          <div className="text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                            <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold block">
                              Blok Katı / Görevi:
                            </span>
                            <p className="text-slate-200 text-xs leading-relaxed">{activeHotspot.description}</p>
                          </div>
                        </div>
                      ) : activeHotspot && (
                        <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2.5 shadow-lg">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                              🎯 {activeHotspot.name}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                              X: %{activeHotspot.bbox.x} | Y: %{activeHotspot.bbox.y}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                              <span className="text-slate-400 block text-[10px] uppercase font-mono">Paket / Kılıf:</span>
                              <span className="text-slate-200 font-semibold">{activeHotspot.packageType || "SMD"}</span>
                            </div>
                            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                              <span className="text-slate-400 block text-[10px] uppercase font-mono">Kategori:</span>
                              <span className="text-slate-200 font-semibold">{activeHotspot.category || "Entegre Devre"}</span>
                            </div>
                          </div>

                          {activeHotspot.functionDesc && (
                            <div className="text-xs bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
                              <span className="text-[10px] uppercase text-emerald-400 font-bold block mb-1">Devredeki Görevi:</span>
                              <p className="text-slate-300 leading-relaxed text-[11px]">{activeHotspot.functionDesc}</p>
                            </div>
                          )}

                          {activeHotspot.pinoutInfo && (
                            <div className="text-xs bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60 font-mono text-[10px]">
                              <span className="text-[10px] uppercase text-cyan-400 font-bold block mb-1">Pinout / Bağlantı:</span>
                              <p className="text-slate-300">{activeHotspot.pinoutInfo}</p>
                            </div>
                          )}

                          <div className="flex items-center justify-end pt-1 border-t border-slate-800/80">
                            <button
                              type="button"
                              onClick={() => handleDeleteCurrentComponent(activeHotspot.id)}
                              className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 py-1 px-2 rounded hover:bg-rose-950/50 transition-all"
                            >
                              🗑️ Bu Parçayı Kaldır
                            </button>
                          </div>
                        </div>
                      )}

                      {/* BİLEŞEN LİSTESİ */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase text-slate-400">
                          Tespit Edilen Çip ve Elemanlar ({analysisResult.components ? analysisResult.components.length : 0})
                        </h4>
                        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                          {analysisResult.components && analysisResult.components.map((comp) => {
                            const isSelected = activeHotspot && activeHotspot.id === comp.id;
                            return (
                              <div
                                key={comp.id}
                                onClick={() => setActiveHotspot(comp)}
                                className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                                    : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex justify-between font-bold text-emerald-300">
                                  <span>{comp.name}</span>
                                  <span className="text-[10px] text-slate-400 font-mono">{comp.packageType}</span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{comp.functionDesc}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveAnalysisToLibrary}
                      className="mt-6 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all"
                    >
                      ➕ Bu Kartı Kütüphaneme Kaydet (CRUD: Create)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. KÜTÜPHANE SEKMESİ (CRUD İŞLEMLERİ) */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <input
                type="text"
                placeholder="Kart ara (model, amaç veya etiket)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedPcb(null);
                    setModalImagePreview('');
                    setModalMode('add');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all"
                >
                  ➕ Yeni Kart Ekle
                </button>
                <button
                  onClick={() => {
                    const fresh = storageService.resetToDefault();
                    setLibrary([...fresh]);
                    showToast('Kütüphane sıfırlandı!', 'info');
                  }}
                  title="Varsayılan Kartları Geri Yükle"
                  className="p-2 bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-900"
                >
                  🔄
                </button>
                <button onClick={handleExportJson} title="JSON Olarak Dışa Aktar" className="p-2 bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-900">
                  💾
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLibrary.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/70 hover:shadow-xl hover:shadow-emerald-950/30 transition-all group"
                >
                  {/* Kart Görseli ve Tıklanabilir Alan */}
                  <div
                    onClick={() => openCardInAnalysisView(item)}
                    className="cursor-pointer"
                    title="Bu kartı interaktif devre analiz ekranında aç"
                  >
                    <div className="relative overflow-hidden bg-slate-950 p-2 aspect-video flex items-center justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/20 transition-all flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 bg-emerald-600/90 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-sm transition-all transform translate-y-2 group-hover:translate-y-0">
                          🔍 Devre Analizinde İncele
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                          {item.category}
                        </span>
                        {item.components && item.components.length > 0 && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-bold">
                            🎯 {item.components.length} Çip / Blok
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{item.purpose}</p>
                    </div>
                  </div>

                  {/* Alt İşlem Butonları */}
                  <div className="p-4 border-t border-slate-800/80 flex justify-between items-center text-xs bg-slate-950/30">
                    <button
                      onClick={() => openCardInAnalysisView(item)}
                      className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg font-bold flex items-center gap-1.5 transition-all border border-emerald-500/40"
                    >
                      🔍 İnteraktif İncele
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => { setSelectedPcb(item); setModalMode('detail'); }}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                        title="Detay Açıklaması"
                      >
                        📄
                      </button>
                      <button
                        onClick={() => { setSelectedPcb(item); setModalImagePreview(item.imageUrl || ''); setModalMode('edit'); }}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg"
                        title="Düzenle"
                      >
                        ✏️ Düzenle
                      </button>
                      <button
                        onClick={() => { setSelectedPcb(item); setModalMode('delete'); }}
                        className="px-2 py-1 bg-slate-800 hover:bg-rose-950 text-rose-400 rounded-lg"
                        title="Sil"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. İSTATİSTİKLER TABI */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase">Kayıtlı Kart Sayısı</span>
                <div className="text-3xl font-extrabold text-emerald-400 mt-2">{library.length}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase">Toplam Bileşen</span>
                <div className="text-3xl font-extrabold text-cyan-400 mt-2">
                  {library.reduce((acc, curr) => acc + (curr.components?.length || 0), 0)}
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase">Depolama</span>
                <div className="text-3xl font-extrabold text-amber-400 mt-2">LocalStorage (v3)</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODALLAR */}
      {/* 1. ADD / EDIT MODAL */}
      {(modalMode === 'add' || modalMode === 'edit') && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">
              {modalMode === 'add' ? 'Yeni Kart Ekle (Create)' : 'Kartı Düzenle (Update)'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const payload = {
                  title: fd.get('title'),
                  category: fd.get('category'),
                  purpose: fd.get('purpose'),
                  imageUrl: modalImagePreview || fd.get('imageUrl') || INITIAL_PCB_LIBRARY[0].imageUrl,
                  userNotes: fd.get('userNotes'),
                  tags: fd.get('tags') ? fd.get('tags').split(',').map(s => s.trim()) : []
                };
                if (modalMode === 'add') handleCreatePcb(payload);
                else handleUpdatePcb({ ...selectedPcb, ...payload });
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kart Başlığı *</label>
                <input name="title" required defaultValue={selectedPcb?.title || ''} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kategori</label>
                <select name="category" defaultValue={selectedPcb?.category || 'Mikrodenetleyici'} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100">
                  <option value="Mikrodenetleyici">Mikrodenetleyici</option>
                  <option value="Güç & Şarj Katı">Güç & Şarj Katı</option>
                  <option value="Ses & Amplifikatör">Ses & Amplifikatör</option>
                  <option value="Genel / Özel Devre">Genel / Özel Devre</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kullanım Amacı / Açıklama</label>
                <textarea name="purpose" rows={3} defaultValue={selectedPcb?.purpose || ''} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Görsel URL veya Yükleme</label>
                <input name="imageUrl" defaultValue={selectedPcb?.imageUrl || ''} placeholder="https://..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 mb-1" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const f = e.target.files[0];
                    if (f) {
                      const compressed = await compressImageForStorage(f, 600, 0.8);
                      setModalImagePreview(compressed);
                    }
                  }}
                  className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:bg-slate-800 file:text-slate-300"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setModalMode(null)} className="px-4 py-2 text-slate-400 hover:text-white">
                  Vazgeç
                </button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl">
                  {modalMode === 'add' ? 'Ekle' : 'Güncelle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. DETAIL MODAL */}
      {modalMode === 'detail' && selectedPcb && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400">
                  {selectedPcb.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedPcb.title}</h3>
              </div>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <img src={selectedPcb.imageUrl} alt={selectedPcb.title} className="w-full max-h-60 object-contain bg-slate-950 rounded-xl p-2 border border-slate-800" />
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">İşlev:</span>
                <p className="text-slate-200">{selectedPcb.purpose}</p>
              </div>
              {selectedPcb.components && selectedPcb.components.length > 0 && (
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px] mb-1">
                    Bileşenler ({selectedPcb.components.length}):
                  </span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {selectedPcb.components.map((c, i) => (
                      <div key={i} className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center text-[11px]">
                        <span className="font-bold text-emerald-300">{c.name}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{c.packageType}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => openCardInAnalysisView(selectedPcb)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                🔍 Bu Kartı Devre Analiz Ekranında Aç (Kutucuklar & Çipler)
              </button>
              <button onClick={() => setModalMode(null)} className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold">
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DELETE MODAL */}
      {modalMode === 'delete' && selectedPcb && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Kartı Sil</h3>
            <p className="text-xs text-slate-400">"{selectedPcb.title}" kartı kütüphaneden silinecektir. Bu işlem geri alınamaz.</p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModalMode(null)} className="px-3 py-1.5 text-xs bg-slate-800 rounded-lg text-slate-300">
                Vazgeç
              </button>
              <button onClick={handleDeletePcb} className="px-3 py-1.5 text-xs bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg">
                Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. API KEY MODAL (ÇİFT SAĞLAYICI: GEMINI & CLAUDE) */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                🔑 Yapay Zeka Sağlayıcı ve API Ayarları
              </h3>
              <button onClick={() => setShowApiModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            {/* Sağlayıcı Seçim Sekmeleri */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setSelectedProvider('gemini');
                  setApiTestStatus(null);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedProvider === 'gemini'
                    ? 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-md border border-purple-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ✨ Google Gemini (Flash)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProvider('claude');
                  setApiTestStatus(null);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedProvider === 'claude'
                    ? 'bg-gradient-to-r from-purple-900 to-pink-900 text-white shadow-md border border-purple-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🟣 Anthropic Claude (Sonnet)
              </button>
            </div>

            {/* Gemini Bilgilendirme ve Giriş */}
            {selectedProvider === 'gemini' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Google Gemini Flash modeli devrenizi otonom olarak analiz eder, çipleri ve serigrafileri tespit eder.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-semibold text-emerald-400">Gemini Anahtarı Nasıl Alınır?</div>
                  <p className="text-slate-400">
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline font-bold">
                      Google AI Studio (aistudio.google.com)
                    </a> veya <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline font-bold">Cloud Console</a> üzerinden ücretsiz API anahtarınızı oluşturabilirsiniz.
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono text-slate-400">Gemini API Anahtarınız (AIzaSy... veya AQ...):</label>
                    <button
                      type="button"
                      onClick={() => setShowKeyText(!showKeyText)}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono"
                    >
                      {showKeyText ? "🙈 Gizle" : "👁️ Anahtarı Gör"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showKeyText ? "text" : "password"}
                      value={geminiApiKey}
                      onChange={(e) => {
                        const val = e.target.value;
                        setGeminiApiKey(val);
                        setApiTestStatus(null);
                        localStorage.setItem('gemini_api_key', val.trim());
                        localStorage.setItem('ai_selected_provider', 'gemini');
                      }}
                      placeholder="AIzaSy... veya AQ.Ab8..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[11px]">
                    {geminiApiKey.trim() ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                        ✅ Tarayıcıya kaydedildi (sayfa yenilense de silinmez)
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        💡 Yapıştırdığınız anda otomatik kaydedilir.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Claude Bilgilendirme ve Giriş */}
            {selectedProvider === 'claude' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Anthropic Claude 3.5 Sonnet modeli yüksek doğrulukla devre kartı optik analizi ve çip tanıma gerçekleştirir.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-semibold text-purple-400">Claude Anahtarı Nasıl Alınır?</div>
                  <p className="text-slate-400">
                    <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline font-bold">
                      Anthropic Console (console.anthropic.com)
                    </a> sayfasına giriş yapıp "Create Key" butonundan <strong>sk-ant-...</strong> ile başlayan anahtarınızı oluşturabilirsiniz.
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono text-slate-400">Anthropic Claude API Anahtarınız (sk-ant-...):</label>
                    <button
                      type="button"
                      onClick={() => setShowKeyText(!showKeyText)}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono"
                    >
                      {showKeyText ? "🙈 Gizle" : "👁️ Anahtarı Gör"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showKeyText ? "text" : "password"}
                      value={claudeApiKey}
                      onChange={(e) => {
                        const val = e.target.value;
                        setClaudeApiKey(val);
                        setApiTestStatus(null);
                        localStorage.setItem('claude_api_key', val.trim());
                        localStorage.setItem('ai_selected_provider', 'claude');
                      }}
                      placeholder="sk-ant-api03-..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[11px]">
                    {claudeApiKey.trim() ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                        ✅ Claude anahtarı tarayıcıya güvenle kaydedildi (asla silinmez)
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        💡 Yapıştırdığınız anda otomatik kaydedilir; tekrar girmeniz gerekmez.
                      </span>
                    )}
                  </div>
                </div>

                {/* Hız ve Model Seçimi (Haiku: 2-3 sn vs Sonnet: 20 sn) */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
                  <label className="text-[11px] font-semibold text-purple-300 block">
                    Claude Çalışma Hızı:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setClaudeSpeedTier('haiku');
                        localStorage.setItem('claude_speed_tier', 'haiku');
                        localStorage.removeItem('claude_model_name');
                        showToast("Claude modu: Ultra Hızlı (Haiku) seçildi", "info");
                      }}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all text-left ${
                        claudeSpeedTier === 'haiku'
                          ? 'bg-purple-950 border-purple-500 text-white shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span>⚡ Ultra Hızlı (Haiku)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                        ~2-3 saniye (Önerilen)
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setClaudeSpeedTier('sonnet');
                        localStorage.setItem('claude_speed_tier', 'sonnet');
                        localStorage.removeItem('claude_model_name');
                        showToast("Claude modu: Derin Analiz (Sonnet) seçildi", "info");
                      }}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all text-left ${
                        claudeSpeedTier === 'sonnet'
                          ? 'bg-purple-950 border-purple-500 text-white shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span>🧠 Derin Analiz (Sonnet)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                        ~15-25 saniye
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Test Durum Kutusu */}
            {apiTestStatus && (
              <div className={`p-2.5 rounded-xl text-xs font-mono border ${
                apiTestStatus.success
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500 text-rose-200'
              }`}>
                {apiTestStatus.message}
              </div>
            )}

            {/* Alt İşlem Butonları */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={async () => {
                  setIsTestingKey(true);
                  setApiTestStatus(null);
                  try {
                    if (selectedProvider === 'gemini') {
                      const res = await imageAnalysisEngine.testGemini(geminiApiKey);
                      setApiTestStatus(res);
                      if (res.success) {
                        localStorage.setItem('gemini_api_key', geminiApiKey.trim());
                        localStorage.setItem('ai_selected_provider', 'gemini');
                        showToast(res.message, "success");
                      }
                    } else {
                      const res = await imageAnalysisEngine.testClaude(claudeApiKey);
                      setApiTestStatus(res);
                      if (res.success) {
                        localStorage.setItem('claude_api_key', claudeApiKey.trim());
                        localStorage.setItem('ai_selected_provider', 'claude');
                        showToast(res.message, "success");
                      }
                    }
                  } catch (err) {
                    setApiTestStatus({ success: false, message: `Hata: ${err.message}` });
                  } finally {
                    setIsTestingKey(false);
                  }
                }}
                disabled={isTestingKey || (selectedProvider === 'gemini' ? !geminiApiKey.trim() : !claudeApiKey.trim())}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
              >
                {isTestingKey ? (
                  <>
                    <span className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                    Test Ediliyor...
                  </>
                ) : (
                  <>⚡ {selectedProvider === 'gemini' ? "Gemini Test Et" : "Claude Test Et"}</>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowApiModal(false)}
                  className="px-3 py-2 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl"
                >
                  Kapat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('ai_selected_provider', selectedProvider);
                    if (geminiApiKey.trim()) localStorage.setItem('gemini_api_key', geminiApiKey.trim());
                    if (claudeApiKey.trim()) localStorage.setItem('claude_api_key', claudeApiKey.trim());
                    setShowApiModal(false);
                    showToast(`Ayarlar kaydedildi (${selectedProvider === 'claude' ? 'Claude' : 'Gemini'} seçili)`, "success");
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                >
                  Kaydet ve Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

            {/* MANUEL PARÇA EKLEME MODALI */}
      {showManualAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                ➕ Karta Yeni Parça Ekle & İşaretle
              </h3>
              <button onClick={() => setShowManualAddModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleAddManualComponent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bileşen Adı *</label>
                <input
                  type="text"
                  required
                  value={manualComponentData.name}
                  onChange={(e) => setManualComponentData({ ...manualComponentData, name: e.target.value })}
                  placeholder="Örn: 20.000 MHz Kristal Osilatör / Buzzer / Tact Buton"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori</label>
                  <select
                    value={manualComponentData.category}
                    onChange={(e) => setManualComponentData({ ...manualComponentData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Mikrodenetleyici (MCU)">Mikrodenetleyici (MCU)</option>
                    <option value="Entegre Devre (IC)">Entegre Devre (IC)</option>
                    <option value="Voltaj Regülatörü">Voltaj Regülatörü</option>
                    <option value="Konnektör / Port">Konnektör / Port</option>
                    <option value="Ses & İkaz Elemanı">Ses & İkaz Elemanı</option>
                    <option value="Ayar & Anahtar (Switch)">Ayar & Anahtar (Switch)</option>
                    <option value="Osilatör & Kristal">Osilatör & Kristal</option>
                    <option value="Pasif / Filtre">Pasif / Filtre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Paket / Kılıf Tipi</label>
                  <input
                    type="text"
                    value={manualComponentData.packageType}
                    onChange={(e) => setManualComponentData({ ...manualComponentData, packageType: e.target.value })}
                    placeholder="SMD, TO-220, DIP-8, JST vb."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Devredeki Görevi (Ne İşe Yarar?)</label>
                <textarea
                  rows="2"
                  value={manualComponentData.functionDesc}
                  onChange={(e) => setManualComponentData({ ...manualComponentData, functionDesc: e.target.value })}
                  placeholder="Bu parçanın bu devrede ne işe yaradığını kısaca açıklayın..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Pinout / Voltaj Bilgisi</label>
                <input
                  type="text"
                  value={manualComponentData.pinoutInfo}
                  onChange={(e) => setManualComponentData({ ...manualComponentData, pinoutInfo: e.target.value })}
                  placeholder="Örn: 5V DC Besleme / GND, VCC, OUT"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              {/* Kutucuk Konum Ayarı (Yüzde %) */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-emerald-400 font-bold block">
                  Kutucuk Konum ve Boyutu (Fotoğraf Yüzdesi %):
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block font-mono">X (Sol %):</label>
                    <input
                      type="number"
                      min="1"
                      max="95"
                      value={manualComponentData.x}
                      onChange={(e) => setManualComponentData({ ...manualComponentData, x: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-100 font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block font-mono">Y (Üst %):</label>
                    <input
                      type="number"
                      min="1"
                      max="95"
                      value={manualComponentData.y}
                      onChange={(e) => setManualComponentData({ ...manualComponentData, y: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-100 font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block font-mono">Genişlik %:</label>
                    <input
                      type="number"
                      min="3"
                      max="40"
                      value={manualComponentData.w}
                      onChange={(e) => setManualComponentData({ ...manualComponentData, w: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-100 font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block font-mono">Yükseklik %:</label>
                    <input
                      type="number"
                      min="3"
                      max="40"
                      value={manualComponentData.h}
                      onChange={(e) => setManualComponentData({ ...manualComponentData, h: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-100 font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowManualAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white rounded-xl"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  ➕ Karta Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}


export default function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}