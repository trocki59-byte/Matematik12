using System.Globalization;
using System.Text.RegularExpressions;

namespace Matematik12.Mobile.Core;

// Yazılı cevabı sayıya çevirir (web sürümündeki answers.js ile aynı kurallar):
// tam sayı, ondalık (virgül veya nokta), kesir (a/b), negatif (− de kabul edilir), 1.000 → 1000.
public static class Answers
{
    private const double MaxAbs = 1e12;

    public readonly record struct Parsed(bool Ok, double Value, (long N, long D)? Fraction);

    public static Parsed Parse(string? input)
    {
        var s = (input ?? string.Empty).Trim().Replace('−', '-').Replace(" ", string.Empty);
        if (s.Length == 0) return new Parsed(false, 0, null);

        var frac = Regex.Match(s, @"^(-?\d+)/(\d+)$");
        if (frac.Success)
        {
            long n = long.Parse(frac.Groups[1].Value, CultureInfo.InvariantCulture);
            long d = long.Parse(frac.Groups[2].Value, CultureInfo.InvariantCulture);
            if (d == 0) return new Parsed(false, 0, null);
            return new Parsed(true, (double)n / d, (n, d));
        }

        if (Regex.IsMatch(s, @"^-?\d{1,3}(\.\d{3})+$")) s = s.Replace(".", string.Empty);
        s = s.Replace(',', '.');

        if (!Regex.IsMatch(s, @"^-?\d+(\.\d+)?$")) return new Parsed(false, 0, null);
        if (!double.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out var value)) return new Parsed(false, 0, null);
        if (!double.IsFinite(value) || Math.Abs(value) > MaxAbs) return new Parsed(false, 0, null);
        return new Parsed(true, value, null);
    }

    // Göreli tolerans ile karşılaştırma (ondalık hatalarına karşı).
    public static bool Same(double value, double expected) =>
        Math.Abs(value - expected) <= 1e-9 * Math.Max(1, Math.Abs(expected));

    // Kesir en sade hâlde mi? Pay ve payda aralarında asal olmalı.
    public static bool IsSimplest((long N, long D) f)
    {
        long a = Math.Abs(f.N), b = Math.Abs(f.D);
        while (b != 0) (a, b) = (b, a % b);
        return a == 1;
    }
}
