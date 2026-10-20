using Microsoft.Maui.Storage;

namespace Matematik12.Services;

// İlerleme kaydı: her konu için doğru ve toplam soru sayısı, cihazda saklanır.
public static class Progress
{
    public static (int Correct, int Total) Get(string topicId) =>
        (Preferences.Default.Get($"{topicId}.c", 0),
         Preferences.Default.Get($"{topicId}.t", 0));

    public static void Record(string topicId, bool correct)
    {
        var (c, t) = Get(topicId);
        Preferences.Default.Set($"{topicId}.t", t + 1);
        if (correct) Preferences.Default.Set($"{topicId}.c", c + 1);
    }
}
