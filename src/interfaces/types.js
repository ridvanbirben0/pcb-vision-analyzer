/**
 * @file types.js
 * @description PCB ve Bileşen Veri Yapısı Tanımları (JSDoc Type Definitions)
 * Yönergedeki "Interfaces" klasör gereksinimini karşılar.
 */

/**
 * @typedef {Object} ComponentItem
 * @property {string} id - Benzersiz bileşen ID'si
 * @property {string} name - Bileşen adı (Örn: ATmega328P, NE555)
 * @property {string} category - Kategori (IC, Direnç, Kapasitör, Osilatör, Regülatör, Konnektör)
 * @property {string} packageType - Paket tipi (DIP-28, SMD 0805, SOT-223, TO-92 vb.)
 * @property {string} functionDesc - İşlev açıklaması
 * @property {string} [pinoutInfo] - Bacak/Pin ipuçları veya çalışma voltajı
 * @property {Object} [bbox] - Görsel üzerindeki göreceli konumu {x: number, y: number, w: number, h: number} (yüzde cinsinden)
 */

/**
 * @typedef {Object} PcbRecord
 * @property {string} id - Benzersiz PCB kayıt ID'si (Örn: pcb-1712345678)
 * @property {string} title - Kart başlığı (Örn: Arduino Uno R3)
 * @property {string} category - Kart sınıfı (Mikrodenetleyici, Güç Katı, Ses & Amfi, Sensör Modülü, RF & Kablosuz)
 * @property {string} purpose - Kartın genel çalışma amacı
 * @property {string} imageUrl - Kart fotoğrafı veya SVG görseli
 * @property {string} createdAt - Oluşturulma tarihi (ISO String)
 * @property {string} updatedAt - Son güncelleme tarihi (ISO String)
 * @property {string} userNotes - Kullanıcının eklediği özel notlar (CRUD Güncelleme alanlarından biri)
 * @property {string[]} tags - Etiketler (Örn: ["5V", "USB", "Atmel"])
 * @property {ComponentItem[]} components - Kart üzerinde tespit edilen/eklenen bileşenler listesi
 * @property {boolean} isAnalyzed - Yapay zeka simülasyonu ile mi yoksa manuel mi eklendiği
 */

export const PCB_CATEGORIES = [
  "Mikrodenetleyici",
  "Güç & Şarj Katı",
  "Ses & Amplifikatör",
  "Sensör & Arayüz",
  "RF & Haberleşme",
  "Genel / Özel Devre"
];

export const COMPONENT_TYPES = [
  "Entegre Devre (IC)",
  "Mikrodenetleyici (MCU)",
  "Voltaj Regülatörü",
  "Pasif Eleman (Direnç/Kondansatör)",
  "Transistör / MOSFET",
  "Kristal Osilatör",
  "Konnektör / Port",
  "Diyot / Gösterge LED"
];
