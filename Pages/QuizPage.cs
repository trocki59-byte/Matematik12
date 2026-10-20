using Matematik12.Models;
using Matematik12.Services;
using Microsoft.Maui.Graphics;

namespace Matematik12.Pages;

public class QuizPage : ContentPage
{
    readonly Topic _topic;
    Question _current = null!;

    readonly Label _question = new() { FontSize = 36, FontAttributes = FontAttributes.Bold, HorizontalTextAlignment = TextAlignment.Center };
    readonly Entry _answer = new() { Keyboard = Keyboard.Numeric, FontSize = 26, HorizontalTextAlignment = TextAlignment.Center, Placeholder = "Cevap" };
    readonly Button _check = new() { Text = "Kontrol Et" };
    readonly Button _next = new() { Text = "Sonraki Soru", IsVisible = false };
    readonly Label _feedback = new() { FontSize = 16, IsVisible = false };
    readonly Label _stats = new() { HorizontalTextAlignment = TextAlignment.Center, TextColor = Colors.Gray };

    public QuizPage(Topic topic)
    {
        _topic = topic;
        Title = topic.Name;

        Content = new ScrollView
        {
            Content = new VerticalStackLayout
            {
                Padding = 20,
                Spacing = 14,
                Children = { _question, _answer, _check, _next, _feedback, _stats }
            }
        };

        _check.Clicked += (_, _) => Check();
        _next.Clicked += (_, _) => NextQuestion();
        // Enter: cevap verilmeden önce kontrol, verildikten sonra sonraki soru.
        _answer.Completed += (_, _) => { if (_check.IsVisible) Check(); else NextQuestion(); };

        NextQuestion();
    }

    void NextQuestion()
    {
        _current = _topic.Generate();
        _question.Text = _current.Text;
        _answer.Text = "";
        _answer.IsEnabled = true;
        _check.IsVisible = true;
        _next.IsVisible = false;
        _feedback.IsVisible = false;
        ShowStats();
        _answer.Focus();
    }

    void Check()
    {
        var text = _answer.Text?.Trim();
        if (string.IsNullOrEmpty(text)) return;

        bool correct = text == _current.Answer;
        Progress.Record(_topic.Id, correct);

        _answer.IsEnabled = false;
        _check.IsVisible = false;
        _next.IsVisible = true;
        _feedback.IsVisible = true;
        _feedback.TextColor = correct ? Colors.DarkGreen : Colors.DarkRed;
        _feedback.Text = correct
            ? "Tebrikler, doğru cevap!"
            : $"Doğru cevap: {_current.Answer}\n\n" + string.Join("\n", _current.Steps);

        ShowStats();
    }

    void ShowStats()
    {
        var (c, t) = Progress.Get(_topic.Id);
        _stats.Text = $"Doğru: {c}   Toplam: {t}";
    }
}
