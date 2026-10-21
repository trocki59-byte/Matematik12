using Matematik12.Mobile.Core;

namespace Matematik12.Mobile.Views;

public class HomePage : ContentPage
{
    private readonly Picker _grade = new() { Title = "Sınıf", TextColor = Ui.Text, TitleColor = Ui.Muted };
    private readonly Label _history = Ui.Body(string.Empty);

    public HomePage()
    {
        BackgroundColor = Ui.Background;
        Title = "Matematik 12";

        for (int g = 1; g <= 12; g++) _grade.Items.Add($"{g}. sınıf");

        var user = AppServices.Auth.Current;
        var greeting = user is null ? "Merhaba" : $"Merhaba, {user.Name}";
        _grade.SelectedIndex = Math.Clamp((user?.Grade ?? 5) - 1, 0, 11);
        _grade.SelectedIndexChanged += (_, _) => RefreshHistory();

        var start = Ui.PrimaryButton("Sınav başlat (10 soru, 5 şıklı)", (_, _) =>
            Navigation.PushAsync(new ExamPage(SelectedGrade)));
        var logout = Ui.SecondaryButton("Çıkış yap", (_, _) => Logout());

        Content = new ScrollView
        {
            Content = new VerticalStackLayout
            {
                Padding = new Thickness(20, 32),
                Spacing = 14,
                Children =
                {
                    Ui.Heading(greeting),
                    Ui.Hint("TROÇKİ STUDİO · Matematik Öğreniyorum"),
                    _grade,
                    start,
                    Ui.Heading("Son sınavlar"),
                    _history,
                    logout,
                },
            },
        };
        RefreshHistory();
    }

    private int SelectedGrade => _grade.SelectedIndex + 1;

    private void RefreshHistory()
    {
        var exams = AppServices.Progress.ExamsFor(SelectedGrade).Take(5).ToList();
        _history.Text = exams.Count == 0
            ? "Henüz sınav yok."
            : string.Join(Environment.NewLine, exams.Select(e => $"{e.Date:dd.MM.yyyy HH:mm} · {e.Score}/{e.Total}"));
    }

    private void Logout()
    {
        AppServices.Auth.Logout();
        Application.Current!.MainPage = new NavigationPage(new LoginPage());
    }
}
