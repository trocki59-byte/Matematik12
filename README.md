# Matematik 12

1–4. sınıflar için Türkçe matematik alıştırmaları. Android kaynakları ve tarayıcıda çalışan web uygulaması birlikte bulunur.

Web sürümü: toplama, çıkarma, çarpma, tam bölme, geometri, para ve saat konularında 14 alıştırma türü; her cevapta çözüm adımları ve tarayıcıda ilerleme kaydı. Üyelik gerekmez. İlerleme aynı tarayıcıya özeldir; Android uygulamasından otomatik aktarılmaz. Eski web kayıtları korunur.

## Yerel çalıştırma

Node.js 24 veya üzeri ile bağımlılık kurulumu gerektirmeden:

```sh
node scripts/preview.mjs
```

Tarayıcıda http://127.0.0.1:4173/Matematik12/ adresini açın.

```sh
node --test tests/*.test.mjs
```

## Yayınlama

GitHub → Settings → Pages → Source: **GitHub Actions**. `master` dalına gönderim, testleri ve Pages dağıtımını çalıştırır. Actions → Publish Matematik 12 üzerinden elle de başlatılabilir. Yalnızca web çalışma dosyaları yayınlanır.

Alternatif olarak Pages kaynağı `master /docs` seçilirse statik dosyalar bu klasörden doğrudan yayınlanabilir. Beklenen adres: https://trocki59-byte.github.io/Matematik12/ (dağıtım başarılı olduğunda erişilebilir).

Web dosyaları `docs/`, testler `tests/` altında bulunur. Uygulama güncel dosyaları ağdan alır, bağlantı kesildiğinde önbellekteki sürümle çalışır. Yazı tipi yüklenmezse sistem yazı tipi kullanılır. Kayıt engellenirse uygulama bellekte çalışmaya devam eder.
