using Matematik12.Mobile.Core;

namespace Matematik12.Mobile.Views;

// TROÇKİ STUDİO giriş ekranı: giriş ve kayıt sekmeleri.
public class LoginPage : ContentPage
{
    private readonly Entry _name = new() { Placeholder = "Adın", TextColor = Ui.Text, PlaceholderColor = Ui.Muted };
    private readonly Entry _pin = new() { Placeholder = "4 haneli PIN", Keyboard = Keyboard.Numeric, IsPassword = true, MaxLength = 4, TextColor = Ui.Text, PlaceholderColor = Ui.Muted };
    private readonly Picker _grade = new() { Title = "Sınıfın", TextColor = Ui.Text, TitleColor = Ui.Muted };
    private readonly Label _error = new() { TextColor = Ui.Danger, IsVisible = false, FontSize = 14 };
    private readonly Button _primary;
    private readonly Button _toggle;
    private bool _signupMode;

    public LoginPage()
    {
        BackgroundColor = Ui.Background;
        Title = "Giriş";
        NavigationPage.SetHasNavigationBar(this, false);

        for (int g = 1; g <= 12; g++) _grade.Items.Add($"{g}. sınıf");
        _grade.SelectedIndex = 4;

        _primary = Ui.PrimaryButton("Giriş yap", OnPrimary);
        _toggle = Ui.SecondaryButton("Yeni hesap oluştur", (_, _) => { _signupMode = !_signupMode; Refresh(); });

        Content = new ScrollView
        {
            Content = new VerticalStackLayout
            {
                Padding = new Thickness(24, 56),
                Spacing = 14,
                Children =
                {
                    new Label { Text = "TROÇKİ STUDİO", FontSize = 14, FontAttributes = FontAttributes.Bold, TextColor = Ui.Accent, HorizontalTextAlignment = TextAlignment.Center },
                    new Label { Text = "Matematik Öğreniyorum", FontSize = 26, FontAttributes = FontAttributes.Bold, TextColor = Ui.Text, HorizontalTextAlignment = TextAlignment.Center },
                    Ui.Hint("Öğrenci bilgilerini gir ve devam et."),
                    _name,
                    _pin,
                    _grade,
                    _error,
                    _primary,
                    _toggle,
                },
            },
        };
        Refresh();
    }

    private void Refresh()
    {
        _primary.Text = _signupMode ? "Kayıt ol" : "Giriş yap";
        _toggle.Text = _signupMode ? "Hesabım var, giriş yap" : "Yeni hesap oluştur";
        _grade.IsVisible = _signupMode;
        _error.IsVisible = false;
    }

    private void OnPrimary(object? sender, EventArgs e)
    {
        var name = _name.Text ?? string.Empty;
        var pin = _pin.Text ?? string.Empty;
        string? error;

        if (_signupMode)
        {
            error = AppServices.Auth.Signup(name, pin, _grade.SelectedIndex + 1);
            if (error is not null) { ShowError(error); return; }
        }

        if (!AppServices.Auth.Login(name, pin))
        {
            ShowError("Ad veya PIN hatalı.");
            return;
        }
        Application.Current!.MainPage = new NavigationPage(new HomePage());
    }

    private void ShowError(string message)
    {
        _error.Text = message;
        _error.IsVisible = true;
    }
}
