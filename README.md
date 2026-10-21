# Matematik 12

1–8. sınıflar için Türkçe matematik öğretimi: her konuda **konu anlatımı**, adım adım çözülmüş **örnekler** ve bol **alıştırma**. Web sürümü tarayıcıda çalışır, üyelik gerektirmez.

## Kapsam

| Sınıf | Üniteler |
|---|---|
| 1–4 | Doğal sayılarla toplama, çıkarma, çarpma, bölme; geometri (kenar sayısı); para ve saat |
| 5 | Basamak değeri, işlem önceliği, bölünebilme, EBOB–EKOK, kesirler, ondalık sayılar, açılar, alan |
| 6 | Tam sayılar, kesirlerle çarpma–bölme, ondalık çarpma, oran–orantı, yüzde, cebirsel ifade, çokgenlerin iç açıları |
| 7 | Birinci dereceden denklemler, yüzde artış–azalış, dağılma, çemberin çevresi, prizmanın hacmi, olasılık, aritmetik ortalama |
| 8 | Üslü ifadeler, karekök, özdeşlikler, doğrunun eğimi, Pisagor, öteleme–yansıma, medyan |

Konu başlıkları Milli Eğitim Bakanlığı ortaokul matematik öğretim programındaki öğrenme alanlarına göre düzenlenmiştir. Kazanım ayrıntıları için güncel MEB programını esas alın.

## Yerel çalıştırma

Node.js 24 veya üzeri ile bağımlılık kurulumu gerektirmeden:

```sh
node scripts/preview.mjs
```

Tarayıcıda http://127.0.0.1:4173/Matematik12/ adresini açın.

## Testler

```sh
node --test tests/*.test.mjs
```

Testler şunları kontrol eder: her sınıfta konu ve konu anlatımı olması, üretilen her sorunun cevabının kendi cevap metniyle tutarlı olması, kesir ve ondalık cevapların kabul edilmesi, ilerleme kaydı ve eski tam sayı kurallarının korunması.

## Yapı

- `docs/js/topics/` — sınıflara göre konular: anlatım metinleri, örnekler ve soru üreticileri
- `docs/js/curriculum.js` — tüm konuları birleştirir, soru üretir
- `docs/js/answers.js` — cevap okur: tam sayı, ondalık (virgül ya da nokta), kesir, negatif ve karışık kesir
- `docs/js/session.js` — alıştırma oturumu ve puanlama
- `docs/js/app.js` — arayüz ve sayfa yönlendirmesi (`#/sinif/5`, `#/konu/<id>`, `#/konu/<id>/alistirma`)
- `docs/js/progress.js` — tarayıcıdaki ilerleme kaydı

## Yayınlama

GitHub → Settings → Pages → Source: **GitHub Actions**. `master` dalına gönderim testleri çalıştırır ve Pages dağıtımını yapar. Beklenen adres: https://trocki59-byte.github.io/Matematik12/

Alternatif olarak Pages kaynağı `master /docs` seçilirse statik dosyalar doğrudan yayınlanabilir.

Uygulama güncel dosyaları ağdan alır; bağlantı kesildiğinde önbellekteki sürümle çalışır. Yazı tipi yüklenmezse sistem yazı tipi kullanılır.

## Android

Depodaki `.csproj`, `Pages/`, `Engine/` ve `Services/` klasörleri Android (.NET MAUI) sürümüne aittir. Web sürümü ile bağımsız geliştirilir.
