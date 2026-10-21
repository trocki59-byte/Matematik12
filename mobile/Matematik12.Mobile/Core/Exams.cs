namespace Matematik12.Mobile.Core;

public static class Exams
{
    public const int Length = 10;

    // Havuzdan rastgele sorular seçer; her soru için beş şık üretir.
    public static List<ExamItem> Build(IReadOnlyList<Generator> pool, Random rng, int count = Length)
    {
        var items = new List<ExamItem>();
        int guard = 0;
        while (items.Count < count)
        {
            if (++guard > count * 50) throw new InvalidOperationException("Sınav oluşturulamadı");
            var gen = pool[rng.Next(pool.Count)];
            var q = gen.Make(rng);
            try
            {
                var (options, correct) = Choices.Build(q.AnswerText, rng);
                items.Add(new ExamItem(gen.TopicName, q, options, correct));
            }
            catch (InvalidOperationException)
            {
                // Bu soru için yeterli şık üretilemedi; başka soru dene.
            }
        }
        return items;
    }

    public static ExamResult Grade(IReadOnlyList<ExamItem> items, IReadOnlyList<int?> picks)
    {
        var results = new List<ExamResultItem>();
        int score = 0;
        for (int i = 0; i < items.Count; i++)
        {
            int? pick = i < picks.Count ? picks[i] : null;
            var r = new ExamResultItem(items[i], pick);
            if (r.Correct) score++;
            results.Add(r);
        }
        return new ExamResult(score, items.Count, results);
    }
}
