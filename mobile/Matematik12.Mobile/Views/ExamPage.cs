using Matematik12.Mobile.Core;

namespace Matematik12.Mobile.Views;

// Beş şıklı test. Her sınavda sorular yeniden üretilir ve puan kaydedilir.
public class ExamPage : ContentPage
{
    private readonly int _grade;
    private readonly List<ExamItem> _items;
    private readonly int?[] _picks;
    private readonly VerticalStackLayout _body = new() { Padding = new Thickness(20, 16), Spacing = 14 };

    public ExamPage(int grade)
    {
        _grade = grade;
        BackgroundColor = Ui.Background;
        Title = $"{grade}. sınıf sınavı";
        _items = Exams.Build(Generators.ForGrade(grade), Random.Shared);
        _picks = new int?[_items.Count];
        Content = new ScrollView { Content = _body };
        BuildQuestions();
    }

    private void BuildQuestions()
    {
        for (int i = 0; i < _items.Count; i++)
        {
            var item = _items[i];
            int index = i;
            _body.Children.Add(new Label
            {
                Text = $"Soru {i + 1} · {item.TopicName}",
                FontSize = 13,
                TextColor = Ui.Accent,
            });
            _body.Children.Add(Ui.Body(item.Question.Text));

            for (int j = 0; j < item.Options.Length; j++)
            {
                int choice = j;
                var radio = new RadioButton
                {
                    GroupName = $"q{i}",
                    Content = $"{(char)('A' + j)})  {item.Options[j]}",
                    TextColor = Ui.Text,
                };
                radio.CheckedChanged += (_, e) => { if (e.Value) _picks[index] = choice; };
                _body.Children.Add(radio);
            }
        }

        _body.Children.Add(Ui.PrimaryButton("Sınavı bitir", (_, _) => Submit()));
    }

    private void Submit()
    {
        var result = Exams.Grade(_items, _picks);
        AppServices.Progress.RecordExam(new ExamRecord(
            _grade, result.Score, result.Total, DateTime.Now.ToString("s"), null));

        _body.Children.Clear();
        _body.Children.Add(Ui.Heading($"Puanın: {result.Score} / {result.Total}"));
        _body.Children.Add(Ui.Hint(result.Score == result.Total ? "Harika, hepsi doğru!" : "Yanlışlara bak, adımları incele."));

        foreach (var r in result.Items)
        {
            var status = r.Pick is null ? "Boş" : r.Correct ? "Doğru" : "Yanlış";
            var lines = new List<string>
            {
                $"{status} · Doğru cevap: {r.Item.Options[r.Item.CorrectIndex]}",
            };
            lines.AddRange(r.Item.Question.Steps);
            _body.Children.Add(new Label { Text = r.Item.Question.Text, FontAttributes = FontAttributes.Bold, TextColor = Ui.Text });
            _body.Children.Add(new Label { Text = string.Join(Environment.NewLine, lines), TextColor = r.Correct ? Color.FromArgb("#7ee2a8") : Ui.Muted, FontSize = 14 });
        }

        _body.Children.Add(Ui.PrimaryButton("Yeni sınav", async (_, _) =>
        {
            await Navigation.PopAsync();
            await Navigation.PushAsync(new ExamPage(_grade));
        }));
        _body.Children.Add(Ui.SecondaryButton("Ana sayfa", async (_, _) => await Navigation.PopAsync()));
    }
}
