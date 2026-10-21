namespace Matematik12.Mobile.Core;

// Bir soru: metin, doğru cevabın metni ve sayısal değeri, çözüm adımları.
public sealed record Question(string Text, string AnswerText, double Answer, string[] Steps);

// Sınavdaki bir soru: beş seçenek ve doğru seçeneğin dizini (0–4).
public sealed record ExamItem(string TopicName, Question Question, string[] Options, int CorrectIndex);

public sealed record ExamResultItem(ExamItem Item, int? Pick)
{
    public bool Correct => Pick == Item.CorrectIndex;
}

public sealed record ExamResult(int Score, int Total, IReadOnlyList<ExamResultItem> Items);

// Kayıtlı sınav sonucu (tarih ISO biçiminde).
public sealed record ExamRecord(int Grade, int Score, int Total, string Date, string? Label);
