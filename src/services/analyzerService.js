/**
 * @file analyzerService.js
 * @description Yapay Zeka / Görüntü İşleme Analiz Simülasyon Motoru.
 * Yüklenen veya seçilen PCB görselini analiz edip kartın amacını ve üzerindeki komponentleri tespit eder.
 */

import { INITIAL_PCB_LIBRARY } from '../data/mockPcbData';

export const analyzerService = {
  /**
   * Görsel veya demo karta göre simüle edilmiş akıllı analiz yapar.
   * @param {string} imageSource - Görsel URL veya data URI
   * @param {string} [presetId] - Eğer demo kart seçildiyse onun ID'si
   * @returns {Promise<Object>} Analiz sonuçları
   */
  async analyzePcb(imageSource, presetId = null) {
    // Gerçekçi analiz gecikmesi (1.8 saniye)
    await new Promise(resolve => setTimeout(resolve, 1800));

    if (presetId) {
      const match = INITIAL_PCB_LIBRARY.find(p => p.id === presetId);
      if (match) {
        return {
          title: match.title,
          category: match.category,
          purpose: match.purpose,
          tags: match.tags,
          components: match.components,
          confidence: "98.4%",
          boardDimensions: "Est. 68.6 x 53.4 mm",
          layerCount: "2-Layer FR4 PCB",
          summaryText: `Analiz tamamlandı: ${match.components.length} ana bileşen tespit edildi. Kart mimarisi ${match.category} standartlarına uygundur.`
        };
      }
    }

    // Kullanıcının yüklediği özel bir görsel ise akıllı kural bazlı tespit üret
    return {
      title: "Özel Yüklenen Baskılı Devre Kartı",
      category: "Genel / Özel Devre",
      purpose: "Yapay zeka analiz motoru tarafından görseldeki entegre, pasif ve bağlantı yolları taranarak oluşturulan özel devre profili.",
      tags: ["Özel PCB", "Yapay Zeka Analiz", "SMD", "Prototip"],
      confidence: "94.2%",
      boardDimensions: "Est. 50 x 40 mm",
      layerCount: "Çift Yüzlü (Dual-Layer) FR4",
      summaryText: "Kart üzerinde merkezi bir mikroişlemci, filtreleme kondansatör grubu ve regülasyon bloğu tespit edildi.",
      components: [
        {
          id: "custom-c1",
          name: "Merkezi Kontrolcü IC",
          category: "Mikrodenetleyici (MCU)",
          packageType: "QFP-44 / SMD",
          functionDesc: "Devre lojiğini ve giriş/çıkış sinyallerini yöneten ana entegre.",
          pinoutInfo: "Köşe pinleri besleme ve topraklama; yan hatlar GPIO veriyolu.",
          bbox: { x: 35, y: 35, w: 26, h: 26 }
        },
        {
          id: "custom-c2",
          name: "Güç Regülasyon Katı (LDO)",
          category: "Voltaj Regülatörü",
          packageType: "SOT-89",
          functionDesc: "Giriş gerilimini devre elemanları için 3.3V seviyesine sabitler.",
          pinoutInfo: "GND, Vin, Vout bağlantıları",
          bbox: { x: 18, y: 25, w: 14, h: 18 }
        },
        {
          id: "custom-c3",
          name: "SMD Dekuplaj Kondansatör Bloğu",
          category: "Pasif Eleman (Direnç/Kondansatör)",
          packageType: "0805 SMD",
          functionDesc: "Entegre besleme hattındaki yüksek frekanslı gürültüleri süzer.",
          pinoutInfo: "Paralel bağlı 100nF seramik kapasitörler",
          bbox: { x: 65, y: 40, w: 16, h: 14 }
        },
        {
          id: "custom-c4",
          name: "Harici Bağlantı Terminali / Pin Header",
          category: "Konnektör / Port",
          packageType: "2.54mm Header",
          functionDesc: "Güç besleme ve harici modüller ile haberleşme pinleri.",
          pinoutInfo: "Pin 1: VCC, Pin 2: GND, Pin 3-6: Sinyal hatları",
          bbox: { x: 10, y: 70, w: 30, h: 15 }
        }
      ]
    };
  }
};
