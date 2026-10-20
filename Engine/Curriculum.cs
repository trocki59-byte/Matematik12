using Matematik12.Models;

namespace Matematik12.Engine;

// Müfredat: şimdilik 1–4. sınıf konuları, kod içinde tanımlı.
// İleride bu liste JSON dosyasına taşınacak.
public static class Curriculum
{
    static readonly Random Rng = new();

    static int R(int min, int max) => Rng.Next(min, max + 1);

    public static readonly List<Topic> All = new()
    {
        new Topic("1-top-20", "1. Sınıf", "Toplama (20'ye kadar)", () =>
        {
            int a = R(0, 19), b = R(0, 20 - a);
            return new Question($"{a} + {b} = ?", (a + b).ToString(),
                new List<string> { $"{a} ile {b} toplanır: {a + b}" });
        }),

        new Topic("1-cik-20", "1. Sınıf", "Çıkarma (20'ye kadar)", () =>
        {
            int a = R(0, 20), b = R(0, a);
            return new Question($"{a} − {b} = ?", (a - b).ToString(),
                new List<string> { $"{a} sayısından {b} çıkarılır: {a - b}" });
        }),

        new Topic("2-top-100", "2. Sınıf", "Toplama (100'e kadar)", () =>
        {
            int a = R(10, 89), b = R(10, 100 - a);
            return new Question($"{a} + {b} = ?", (a + b).ToString(),
                new List<string> { $"Onlar: {a / 10 * 10} + {b / 10 * 10} = {a / 10 * 10 + b / 10 * 10}",
                                   $"Birler: {a % 10} + {b % 10} = {a % 10 + b % 10}",
                                   $"Sonuç: {a + b}" });
        }),

        new Topic("2-cik-100", "2. Sınıf", "Çıkarma (100'e kadar)", () =>
        {
            int a = R(10, 99), b = R(1, a);
            return new Question($"{a} − {b} = ?", (a - b).ToString(), SubSteps(a, b));
        }),

        new Topic("2-carpma-25", "2. Sınıf", "Çarpma (2 ve 5 tablosu)", () =>
        {
            int a = R(0, 1) == 0 ? 2 : 5, b = R(2, 10);
            return new Question($"{a} × {b} = ?", (a * b).ToString(),
                new List<string> { $"{a} × {b}, {b} sayısının {a} kez toplanmasıdır: {string.Join(" + ", Enumerable.Repeat(b, a))} = {a * b}" });
        }),

        new Topic("3-top-1000", "3. Sınıf", "Toplama (1000'e kadar, elde ile)", () =>
        {
            int a = R(100, 499), b = R(100, 499);
            return new Question($"{a} + {b} = ?", (a + b).ToString(), AddSteps(a, b));
        }),

        new Topic("3-cik-1000", "3. Sınıf", "Çıkarma (1000'e kadar, ödünç ile)", () =>
        {
            int a = R(100, 999), b = R(10, a - 1);
            return new Question($"{a} − {b} = ?", (a - b).ToString(), SubSteps(a, b));
        }),

        new Topic("3-carpma-10", "3. Sınıf", "Çarpma (2–10 tablosu)", () =>
        {
            int a = R(2, 10), b = R(2, 10);
            return new Question($"{a} × {b} = ?", (a * b).ToString(),
                new List<string> { $"{a} × {b} = {a * b}" });
        }),

        new Topic("3-bolme-tam", "3. Sınıf", "Bölme (tam bölme)", () =>
        {
            int b = R(2, 10), q = R(2, 10), a = b * q;
            return new Question($"{a} ÷ {b} = ?", q.ToString(),
                new List<string> { $"{b} × {q} = {a} olduğu için cevap {q}" });
        }),

        new Topic("4-carpma-2x1", "4. Sınıf", "Çarpma (iki basamaklı × tek basamaklı)", () =>
        {
            int a = R(10, 99), b = R(2, 9);
            int onlar = a / 10 * 10, birler = a % 10;
            return new Question($"{a} × {b} = ?", (a * b).ToString(),
                new List<string> { $"{a} = {onlar} + {birler}",
                                   $"{onlar} × {b} = {onlar * b}",
                                   $"{birler} × {b} = {birler * b}",
                                   $"Toplam: {onlar * b} + {birler * b} = {a * b}" });
        }),

        new Topic("4-bolme-2d", "4. Sınıf", "Bölme (iki basamaklı bölünen)", () =>
        {
            int b = R(2, 9), q = R(10, 99), a = b * q;
            return new Question($"{a} ÷ {b} = ?", q.ToString(),
                new List<string> { $"{b} × {q} = {a} olduğu için cevap {q}" });
        }),
    };

    static List<string> AddSteps(int a, int b)
    {
        var s = new List<string>();
        int o = a % 10 + b % 10;
        int carry = o >= 10 ? 1 : 0;
        s.Add($"Birler: {a % 10} + {b % 10} = {o}" + (carry == 1 ? $" → {o - 10} yazılır, 1 elde edilir" : ""));

        int t = a / 10 % 10 + b / 10 % 10 + carry;
        int carry2 = t >= 10 ? 1 : 0;
        s.Add($"Onlar: {a / 10 % 10} + {b / 10 % 10}" + (carry == 1 ? " + 1 (elde)" : "") + $" = {t}"
              + (carry2 == 1 ? $" → {t - 10} yazılır, 1 elde edilir" : ""));

        int h = a / 100 + b / 100 + carry2;
        s.Add($"Yüzler: {a / 100} + {b / 100}" + (carry2 == 1 ? " + 1 (elde)" : "") + $" = {h}");
        s.Add($"Sonuç: {a + b}");
        return s;
    }

    static List<string> SubSteps(int a, int b)
    {
        var s = new List<string>();
        int a1 = a % 10, b1 = b % 10, borrow = 0;
        if (a1 < b1)
        {
            borrow = 1;
            s.Add($"Birler: {a1} < {b1}, onlardan 1 ödünç alınır: {a1 + 10} − {b1} = {a1 + 10 - b1}");
        }
        else s.Add($"Birler: {a1} − {b1} = {a1 - b1}");

        int tensDigit = a / 10 % 10, b2 = b / 10 % 10;
        int x = tensDigit - borrow, borrow2 = 0;
        string lhs = borrow == 1 ? $"{tensDigit} − 1 (ödünç)" : $"{tensDigit}";
        if (x < b2)
        {
            borrow2 = 1;
            s.Add($"Onlar: {lhs} < {b2}, yüzlerden 1 ödünç alınır: {x + 10} − {b2} = {x + 10 - b2}");
        }
        else s.Add($"Onlar: {lhs} − {b2} = {x - b2}");

        if (a >= 100)
        {
            int h = a / 100 - borrow2 - b / 100;
            s.Add($"Yüzler: {a / 100}{(borrow2 == 1 ? " − 1 (ödünç)" : "")} − {b / 100} = {h}");
        }
        s.Add($"Sonuç: {a - b}");
        return s;
    }
}
