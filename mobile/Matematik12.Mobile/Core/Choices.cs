using System.Globalization;
using System.Text.RegularExpressions;

namespace Matematik12.Mobile.Core;

// Doğru cevaba benzeyen yanlış seçenekler üretir ve beş şıkkı karıştırır.
public static class Choices
{
    public const int Count = 5;

    public static (string[] Options, int CorrectIndex) Build(string answerText, Random rng)
    {
        var found = new List<string> { answerText };
        var numbers = Regex.Matches(answerText, @"\d+");
        if (numbers.Count == 0) throw new InvalidOperationException("Seçenek üretilemedi");

        for (int attempt = 0; attempt < 400 && found.Count < Count; attempt++)
        {
            var m = numbers[rng.Next(numbers.Count)];
            int value = int.Parse(m.Value, CultureInfo.InvariantCulture);
            int range = attempt < 200 ? 4 : 16;
            int delta = rng.Next(1, range) * (rng.Next(2) == 0 ? 1 : -1);
            int next = value + delta;
            if (next < 0) next = value + Math.Abs(delta);
            if (next == value) continue;

            string candidate = answerText.Substring(0, m.Index)
                             + next.ToString(CultureInfo.InvariantCulture)
                             + answerText.Substring(m.Index + m.Length);
            if (!found.Contains(candidate)) found.Add(candidate);
        }
        if (found.Count < Count) throw new InvalidOperationException("Yeterli seçenek üretilemedi");

        var options = found.Take(Count).ToArray();
        var order = Enumerable.Range(0, Count).ToArray();
        for (int i = Count - 1; i > 0; i--)
        {
            int j = rng.Next(i + 1);
            (order[i], order[j]) = (order[j], order[i]);
        }
        var shuffled = order.Select(k => options[k]).ToArray();
        return (shuffled, Array.IndexOf(shuffled, answerText));
    }
}
