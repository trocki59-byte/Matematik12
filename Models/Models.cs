namespace Matematik12.Models;

// Bir soru: ekranda gösterilecek metin, doğru cevap ve adım adım çözüm.
public record Question(string Text, string Answer, IReadOnlyList<string> Steps);

// Bir konu (kazanım grubu). Generate her çağrıldığında yeni bir soru üretir.
public record Topic(string Id, string Grade, string Name, Func<Question> Generate);
