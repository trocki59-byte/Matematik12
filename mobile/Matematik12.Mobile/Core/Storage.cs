using System.Text.Json;
using Microsoft.Maui.Storage;

namespace Matematik12.Mobile.Core;

// Anahtar-değer deposu. Android'de Preferences, testlerde bellek.
public interface IKeyValue
{
    string? Get(string key);
    void Set(string key, string value);
    void Remove(string key);
}

public sealed class PreferencesKeyValue : IKeyValue
{
    public string? Get(string key) => Preferences.Default.Get<string?>(key, null);
    public void Set(string key, string value) => Preferences.Default.Set(key, value);
    public void Remove(string key) => Preferences.Default.Remove(key);
}

public sealed class MemoryKeyValue : IKeyValue
{
    private readonly Dictionary<string, string> _data = new();
    public string? Get(string key) => _data.TryGetValue(key, out var v) ? v : null;
    public void Set(string key, string value) => _data[key] = value;
    public void Remove(string key) => _data.Remove(key);
}

// Sınav sonuçları. Web sürümüyle aynı anahtar adı (matematik12.progress.v1) kullanılır.
public sealed class ProgressStore
{
    private const string Key = "matematik12.progress.v1";
    private const int MaxExams = 100;
    private readonly IKeyValue _kv;

    public ProgressStore(IKeyValue kv) => _kv = kv;

    public void RecordExam(ExamRecord record)
    {
        var list = Load();
        list.Insert(0, record);
        if (list.Count > MaxExams) list.RemoveRange(MaxExams, list.Count - MaxExams);
        _kv.Set(Key, JsonSerializer.Serialize(new ProgressFile(1, list)));
    }

    public IReadOnlyList<ExamRecord> ExamsFor(int grade) =>
        Load().Where(e => e.Grade == grade).ToList();

    private List<ExamRecord> Load()
    {
        var raw = _kv.Get(Key);
        if (string.IsNullOrEmpty(raw)) return new List<ExamRecord>();
        try { return JsonSerializer.Deserialize<ProgressFile>(raw)?.Exams ?? new List<ExamRecord>(); }
        catch (JsonException) { return new List<ExamRecord>(); }
    }

    public sealed record ProgressFile(int Version, List<ExamRecord> Exams);
}
