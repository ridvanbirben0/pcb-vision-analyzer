# Akıllı PCB Analiz ve Donanım Bileşen Kütüphanesi (PCB Vision AI) ⚡

> Modern, yapay zeka ve bilgisayarlı görü (Computer Vision) destekli baskılı devre kartı (PCB) analiz, bileşen tanıma ve donanım kütüphanesi platformu.

🔗 **Canlı Demo (Netlify):** [https://pcb-vision-analyzer.netlify.app](https://pcb-vision-analyzer.netlify.app)  
📖 [English Documentation Below](#-pcb-vision-ai---smart-pcb-analysis--component-library)

---

## 📖 Proje Hakkında

**PCB Vision AI**, gömülü sistem mühendisleri, donanım geliştiricileri, elektronik araştırmacıları ve teknoloji meraklıları için geliştirilmiş ileri seviye bir devre muayene ve dokümantasyon asistanıdır.

Kullanıcıların baskılı devre kartı (PCB) fotoğraflarını yükleyip üzerindeki tüm fonksiyonel bileşenleri (mikrodenetleyiciler, voltaj regülatörleri, güç indüktörleri, filtre kondansatörleri, USB ve seri portlar, sensör ve GPS soketleri, koruma diyotları vb.) parça parça tespit etmelerini sağlar. Koordinat bazlı interaktif kutucuklar (Bounding Box), pin/kılıf detayları ve mimari devre katlarıyla zenginleştirilen analizler, yerel hafızada tam donanımlı bir **PCB Kart Kütüphanesi** üzerinde saklanabilir, filtrelenebilir ve yönetilebilir.

---

## 🚀 Öne Çıkan Özellikler

### 1. Çift Yapay Zeka (Dual-AI) & Hibrit Analiz Motoru
* **Google Gemini & Anthropic Claude Entegrasyonu:** Kullanıcılar kendi API anahtarlarıyla ister ultra hızlı **Claude Haiku (~2-3 sn)** veya **Gemini 2.5 Flash**, ister derin donanım analizi sunan **Claude Sonnet** modellerini seçebilir.
* **Hassas Bileşen Tespiti (Bounding Box):** Kart üzerindeki çipler, modüller ve portlar fotoğraf tuvaline göre normalize edilmiş koordinatlarla (`bbox`) fiziksel gövdelerine tam oturacak şekilde işaretlenir.
* **Fonksiyonel Devre Blokları:** Devre üzerindeki mantıksal katlar (örn: Güç Katı, Giriş Klemensleri, RF/Anten Katı) mimari olarak renkli çerçevelerle ayrıştırılır.
* **Kademeli Eksik Parça Taraması (+Ekle):** İlk taramada gözden kaçan parçalar tespit edildiğinde, mevcut analiz ve kutucukları kaybetmeden yeni bulunan parçaları listeye ekleyen derin tarama modu.
* **İnteraktif Manuel Parça Ekleme & Düzenleme:** Yapay zeka tespitlerinin yanı sıra kullanıcıların kendi gözlemleriyle koordinat seçerek yeni parça ekleyebilmesi veya mevcut parçaları güncelleyebilmesi.
* **Gelişmiş Görünüm Filtresi (Toggle):** *Tümünü Göster*, *Yalnızca Devre Blokları*, *Yalnızca Çipler* veya *Yalnızca Seçili Öğe* görünümleri arasında anlık geçiş.

### 2. Kapsamlı CRUD & Kart Kütüphanesi
* **Ekle (Create):** Yapay zeka analizinden doğrudan kütüphaneye aktarma veya manuel form ile yeni kart kaydı.
* **Listele (Read):** Kayıtlı kartların görsel panoda listelenmesi, anlık arama, kategori filtreleme ve detay inceleme modalı.
* **İnteraktif İnceleme:** Kütüphanedeki herhangi bir karta tıklandığında doğrudan devre analiz ekranına geçerek tüm çiplerini interaktif kutucuklarla inceleyebilme.
* **Güncelle (Update):** Kayıtlı kartın başlığını, amacını, kategorisini, etiketlerini ve özel mühendislik notlarını düzenleme.
* **Sil (Delete):** Yanlışlıkla silinmeyi engelleyen onay pencereli güvenli silme mekanizması.

### 3. Veri Güvenliği, Kalıcılık & Taşınabilirlik
* Tüm kartlar, analiz sonuçları ve API anahtarları tarayıcının yerel hafızasında (`localStorage`) istemci taraflı (client-side) güvenle saklanır; üçüncü taraf sunuculara aktarılmaz.
* **JSON Export / Import:** Kütüphane verilerini tek tıkla JSON formatında dışa aktarma ve geri yükleme.
* **ErrorBoundary (Çökme Kalkanı):** Beklenmedik veri yapılarında uygulamanın çökmesini engelleyen güvenli hata yakalama mekanizması.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

* **Frontend Kütüphanesi:** React 18 (Hooks mimarisi, ErrorBoundary)
* **Stil & Arayüz:** Tailwind CSS (Karanlık mühendislik teması, fütüristik grid deseni, tamamen duyarlı / responsive tasarım)
* **Veri Kalıcılığı:** HTML5 LocalStorage API & JSON Serialization
* **Yapay Zeka Servisleri:** Google Gemini API (`v1beta`) & Anthropic Claude API (`v1/messages`)
* **Geliştirme & Derleme:** Vite 5 & PostCSS
* **Dağıtım (Deployment):** Netlify SPA (Otomatik CI/CD)

---

## 📂 Dizin Yapısı

~~~text
pcb-vision-analyzer/
├── public/                     # Statik varlıklar (_redirects vb.)
│   └── _redirects              # Netlify SPA yönlendirme kuralı
├── src/
│   ├── components/             # Tekrar kullanılabilir arayüz bileşenleri
│   ├── interfaces/             # Veri şeması ve tipleri
│   ├── services/               # LocalStorage CRUD ve Yapay Zeka analiz servisleri
│   │   ├── storageService.js       # CRUD ve LocalStorage yönetimi
│   │   └── imageAnalysisEngine.js  # Gemini & Claude Vision AI motoru
│   ├── data/                   # Başlangıç hazır demo kart veritabanı
│   ├── App.jsx                 # Ana uygulama ve durum yönetimi
│   ├── main.jsx                # React başlangıç noktası
│   └── index.css               # Tailwind stilleri ve animasyonlar
├── COMPONENTS_GUIDE.md         # Donanım bileşenleri eğitim ve referans rehberi
├── index.html                  # HTML ana şablonu
├── package.json                # Bağımlılıklar ve npm scriptleri
├── vite.config.js              # Vite yapılandırması
├── tailwind.config.js          # Tailwind CSS yapılandırması
└── README.md                   # Çift dilli proje dokümantasyonu
~~~

---

## 💻 Kurulum ve Çalıştırma (Lokal)

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki komutları sırasıyla uygulayın:

~~~bash
# 1. Depoyu klonlayın
git clone https://github.com/ridvanbirben0/pcb-vision-analyzer.git

# 2. Proje dizinine girin
cd pcb-vision-analyzer

# 3. Gerekli paketleri yükleyin
npm install

# 4. Geliştirme sunucusunu başlatın
npm run dev
~~~

Tarayıcınızda `http://localhost:3000` adresini açarak uygulamayı kullanmaya başlayabilirsiniz.

---

## 🌐 Canlı Yayına Alma (Netlify Deployment)

1. Kodları GitHub hesabınızda **public** bir depoya yükleyin.
2. [Netlify](https://app.netlify.com) üzerinden **"Add new site" -> "Import an existing project"** adımlarını izleyin ve GitHub deponuzu seçin.
3. Yapılandırma ayarlarını şu şekilde bırakın:
   * **Base directory:** *(Boş bırakın)*
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
4. **Deploy site** butonuna tıklayın.

---
---

# 🌐 PCB Vision AI - Smart PCB Analysis & Component Library

> A modern, AI and Computer Vision-powered Printed Circuit Board (PCB) inspection, component recognition, and hardware library platform.

🔗 **Live Demo (Netlify):** [https://pcb-vision-analyzer.netlify.app](https://pcb-vision-analyzer.netlify.app)

---

## 📖 Overview

**PCB Vision AI** is an advanced hardware inspection and documentation assistant designed for embedded systems engineers, electronics hobbyists, hardware developers, and researchers.

Instead of simple image tagging, the application performs in-depth component-level optical recognition on uploaded PCB photographs. It identifies microcontrollers, voltage regulators, power inductors, filter capacitors, interface ports (USB, UART), sensor connectors, and protection circuitry with precision bounding boxes and informative functional descriptions. All inspected boards can be organized, searched, and edited in a persistent **Hardware Card Library**.

---

## 🚀 Key Features

### 1. Dual-AI & Computer Vision Engine
* **Google Gemini & Anthropic Claude Integration:** Seamlessly switch between ultra-fast models (**Claude Haiku**, **Gemini 2.5 Flash** ~2-3s) for rapid detection, or deep analytical models (**Claude Sonnet**) for comprehensive engineering insights.
* **Component-Level Bounding Boxes:** Tight, canvas-normalized bounding boxes (`bbox`) enclosing individual integrated circuits, passive modules, and connectors without margin drift.
* **Architectural Circuit Blocks:** Logical circuit stages (e.g., Power Stage, MCU Core, Terminal Blocks) highlighted with distinct thematic outlines.
* **Incremental Deep Scan (+Add Missing Parts):** Discover additional components and connectors without erasing previously identified pins and boxes.
* **Interactive Manual Component Adder:** Manually tag, name, categorize, and specify pinouts for any custom or proprietary onboard component.
* **Display Mode Filters:** Instant toggling between *Show All*, *Circuit Blocks Only*, *Chips Only*, and *Selected Item Only*.

### 2. Full-Lifecycle Hardware CRUD Library
* **Create:** Instantly save AI-analyzed boards to the personal library or add custom boards via interactive modals.
* **Read:** Grid-based visual dashboard with real-time keyword search, category filtering, and detailed inspection modal.
* **Interactive Inspector:** Click any saved board from the library to immediately open it in the interactive bounding-box inspector.
* **Update:** Edit board titles, operational purposes, component tags, and engineering notes.
* **Delete:** Secure deletion workflows with confirmation dialogs to prevent accidental data loss.

### 3. Data Privacy & Zero-Backend Architecture
* **Client-Side Privacy:** All user data, uploaded images, and API keys are stored locally within the browser's `localStorage`—no sensitive hardware designs are transmitted to intermediate third-party servers.
* **JSON Export & Import:** Export the entire hardware inventory to a standalone JSON file for backup and easily restore on other workstations.
* **Resilient Error Handling:** Built-in React `ErrorBoundary` safeguards against corrupted data states with one-click recovery.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 18 (Custom hooks, ErrorBoundary, component architecture)
* **Styling & Design System:** Tailwind CSS (Dark laboratory theme, responsive engineering UI)
* **Data Persistence:** HTML5 LocalStorage API with JSON serialization
* **Vision AI Providers:** Google Gemini API (`v1beta`) & Anthropic Claude API (`v1/messages`)
* **Build Tool:** Vite 5 & PostCSS
* **Hosting & CI/CD:** Netlify SPA with automatic routing rules

---

## 📂 Project Architecture

~~~text
pcb-vision-analyzer/
├── public/                     # Static assets (_redirects, favicon)
│   └── _redirects              # Netlify SPA routing rules
├── src/
│   ├── components/             # Reusable UI components
│   ├── interfaces/             # TypeScript-like data schemas
│   ├── services/               # LocalStorage CRUD & Vision AI services
│   │   ├── storageService.js       # CRUD and LocalStorage manager
│   │   └── imageAnalysisEngine.js  # Gemini & Claude Vision AI engine
│   ├── data/                   # Default demo PCB database
│   ├── App.jsx                 # Main application controller
│   ├── main.jsx                # React DOM entry point
│   └── index.css               # Tailwind directives and custom styles
├── COMPONENTS_GUIDE.md         # Hardware component educational guide
├── index.html                  # HTML template
├── package.json                # Project dependencies and build scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS theme configuration
└── README.md                   # Bilingual documentation
~~~

---

## 💻 Local Setup & Development

Run the following commands in your terminal to set up the project locally:

~~~bash
# 1. Clone the repository
git clone https://github.com/ridvanbirben0/pcb-vision-analyzer.git

# 2. Navigate to the project folder
cd pcb-vision-analyzer

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
~~~

Open `http://localhost:3000` in your browser to view the application.

---

## 🌐 Deployment (Netlify)

1. Push the source code to a **public** GitHub repository.
2. Log in to [Netlify](https://app.netlify.com) and select **"Add new site" -> "Import an existing project"**.
3. Use the following build settings:
   * **Base directory:** *(Leave blank)*
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
4. Click **Deploy site**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
