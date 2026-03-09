# 🍖 Durumcu Website — Proje Teslim Paketi

**Teslim Tarihi:** 5 Mart 2026  
**Proje:** Durumcu Restoran Web Sitesi  
**Geliştirici:** Ahmet Yılmaz

---

## 📁 Dosya Yapısı

```
TESLIM_PAKETI/
├── index.html                → Ana sayfa
├── menu.html                 → Menü sayfası
├── durumler.html             → Dürümler sayfası
├── porsiyonlar.html          → Porsiyonlar sayfası
├── mezeler.html              → Mezeler sayfası
├── icecekler.html            → İçecekler sayfası
├── galeri.html               → Galeri sayfası
├── _redirects                → Netlify yönlendirme kuralları
├── netlify.toml              → Netlify yapılandırma dosyası
├── README.md                 → Bu dosya
└── assets/
    ├── css/
    │   └── style.css         → Tüm stil dosyası
    ├── js/
    │   └── script.js         → Tüm JavaScript işlevleri
    ├── img/
    │   ├── logo.png          → Restoran logosu (yüksek çözünürlük)
    │   ├── logo_eski.png     → Navbar logosu
    │   ├── hakkimizda.png    → Hakkımızda görseli
    │   ├── galeri_anasayfa/  → Ana sayfa galeri görselleri (1-17.jpeg, v1-v5.mp4)
    │   ├── galeri_tam/       → Tam galeri görselleri (1-18.jpeg, v1-v5.mp4)
    │   └── urun_fotograflari/→ Ürün fotoğrafları
    │       ├── durumler/     → Dürüm fotoğrafları (durum-1 ... durum-5.jpeg)
    │       └── porsiyonlar/  → Porsiyon fotoğrafları
    │           ├── kebap-porsiyon.jpeg
    │           ├── tavuk-sis-porsiyon.jpeg
    │           ├── kuzu-ciger-sis-porsiyon.jpeg
    │           └── kanat-porsiyon.jpeg
    └── video/
        ├── video.mp4         → Ana sayfa tanıtım videosu
        └── 1.mp4 — 4.mp4     → Tanıtım videoları
```

---

## 🚀 Yayına Alma (Deployment)

### Netlify ile Yayınlama (Önerilen)
1. [netlify.com](https://www.netlify.com) adresine giriş yapın
2. "Add new site" → "Deploy manually" seçin
3. Bu **TESLIM_PAKETI** klasörünü sürükleyip bırakın
4. Site otomatik olarak yayınlanacaktır

### Diğer Hosting Seçenekleri
Bu klasörün tamamını herhangi bir statik web hosting servisine (cPanel, FTP, Vercel, GitHub Pages vb.) yüklemeniz yeterlidir.

---

## 🛠️ Teknik Özellikler

| Özellik | Detay |
|---------|-------|
| **Teknoloji** | HTML5, CSS3, Vanilla JavaScript |
| **Responsive** | Mobil uyumlu tasarım |
| **Sayfa Sayısı** | 7 sayfa |
| **Hosting** | Netlify yapılandırması dahil |
| **Framework** | Yok (saf HTML/CSS/JS) |

---

## 📋 Sayfalar

| Sayfa | Dosya | Açıklama |
|-------|-------|----------|
| Ana Sayfa | `index.html` | Galeri, favoriler, tanıtım videosu |
| Menü | `menu.html` | Tüm menü kategorileri |
| Dürümler | `durumler.html` | Dürüm çeşitleri ve fiyatları |
| Porsiyonlar | `porsiyonlar.html` | Porsiyon çeşitleri ve fiyatları |
| Mezeler | `mezeler.html` | Meze çeşitleri ve fiyatları |
| İçecekler | `icecekler.html` | İçecek çeşitleri ve fiyatları |
| Galeri | `galeri.html` | Fotoğraf ve video galerisi |

---

## ⚠️ Önemli Notlar

- Dosya isimlerini ve klasör yapısını **değiştirmeyin**, aksi halde bağlantılar bozulur.
- `_redirects` ve `netlify.toml` dosyaları Netlify deployment için gereklidir.
- Tüm görseller optimize edilmiştir ve web kullanımına uygundur.

---

*Bu proje profesyonel olarak geliştirilmiş ve teslim edilmeye hazır hale getirilmiştir.*
