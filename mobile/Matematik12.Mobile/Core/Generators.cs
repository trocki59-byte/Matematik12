namespace Matematik12.Mobile.Core;

// Bir konu adı ve rastgele soru üreten fonksiyon.
public sealed record Generator(string TopicName, Func<Random, Question> Make);

// Başlangıç soru havuzu. Web sürümündeki tüm konular (docs/js/topics) buraya JSON olarak aktarılmalıdır.
public static class Generators
{
    public static IReadOnlyList<Generator> ForGrade(int grade) => grade <= 4 ? Primary : Middle;

    private static readonly IReadOnlyList<Generator> Primary =
    [
        new("Toplama", Addition),
        new("Çıkarma", Subtraction),
        new("Çarpma", Multiplication),
    ];

    private static readonly IReadOnlyList<Generator> Middle =
    [
        new("Kesirlerde toplama", FractionAddition),
        new("Yüzde", Percent),
        new("Toplama", Addition),
        new("Çarpma", Multiplication),
    ];

    private static Question Addition(Random r)
    {
        int a = r.Next(10, 100), b = r.Next(10, 100), s = a + b;
        return new Question($"{a} + {b} = ?", s.ToString(), s, [$"{a} + {b} = {s}"]);
    }

    private static Question Subtraction(Random r)
    {
        int a = r.Next(20, 100), b = r.Next(1, a), d = a - b;
        return new Question($"{a} − {b} = ?", d.ToString(), d, [$"{a} − {b} = {d}"]);
    }

    private static Question Multiplication(Random r)
    {
        int a = r.Next(2, 10), b = r.Next(2, 10), p = a * b;
        return new Question($"{a} × {b} = ?", p.ToString(), p, [$"{a} × {b} = {p}"]);
    }

    private static Question FractionAddition(Random r)
    {
        int d = r.Next(5, 10), p = r.Next(1, 5), q = r.Next(1, 5), n = p + q;
        return new Question(
            $"{p}/{d} + {q}/{d} = ?",
            $"{n}/{d}",
            (double)n / d,
            [$"Paydalar aynı ({d}), paylar toplanır: {p} + {q} = {n}", $"Sonuç: {n}/{d}"]);
    }

    private static Question Percent(Random r)
    {
        int[] rates = [10, 20, 25, 50];
        int x = rates[r.Next(rates.Length)], a = 20 * r.Next(1, 20), v = a * x / 100;
        return new Question(
            $"{a} sayısının %{x}'i kaçtır?",
            v.ToString(),
            v,
            [$"%{x} = {x}/100", $"{a} × {x} / 100 = {v}"]);
    }
}
