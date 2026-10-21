# Matematik 12 — .NET MAUI (Android)

Web sürümünün (docs/) Android uygulaması. Hedef: `net8.0-android`, APK çıktısı.

Bu klasör kaynak kodudur; APK'yı bir Android SDK'lı bilgisayarda derlenir.

## Gereksinimler (Windows, macOS veya Linux)

1. .NET 8 SDK — https://dotnet.microsoft.com/download/dotnet/8.0
2. MAUI Android iş yükü:
   ```
   dotnet workload install maui-android
   ```
3. Android SDK (Visual Studio "Mobile development with .NET" veya komut satırı ile).
   Java 17 gerekir.

## APK üretmek

```
cd mobile/Matematik12.Mobile
dotnet publish -f net8.0-android -c Release
```

Çıktı: `bin/Release/net8.0-android/com.trocki.matematik12-Signed.apk`
(Yayın için imzalı APK/AAB üretmek için `-p:AndroidKeyStore=true` ve anahtar bilgileri gerekir.)

Telefona yüklemek için `dotnet build -t:Run -f net8.0-android` ile bağlı cihaza doğrudan kurabilirsin.

## Yapılanlar

- Giriş/kayıt (ad + 4 haneli PIN, SHA-256 ile tuzlu, web sürümüyle aynı anahtar adları)
- 5 şıklı sınav motoru (`Core/Exams.cs`, `Core/Choices.cs`)
- Sınav puanlarının kaydı (`Core/Storage.cs`, Android Preferences)
- Koyu tema, TROÇKİ STUDİO ikonu (`Resources/AppIcon/appicon.svg`)

## Henüz yapılmayanlar

- Web sürümündeki tüm konular (`docs/js/topics/*`). Şu an başlangıç havuzu var (`Core/Generators.cs`).
  Önerilen yol: `docs/js` içindeki soru üreticilerini bir node betiğiyle JSON'a dök, uygulamaya `Resources/Raw` olarak ekle.
- Konu anlatımları ve çözümlü örnekler ekranı.
- Deneme sınavları (TYT/AYT/LGS), üniversiteye hazırlık bankası, güncelleme kontrolü (mobilde Play Store güncellemesi kullanılır).
- Birim testleri.
