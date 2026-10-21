using Microsoft.Maui.Controls;

namespace Matematik12.Mobile.Views;

// Ortak renkler ve küçük yardımcılar (koyu tema).
public static class Ui
{
    public static readonly Color Background = Color.FromArgb("#0b0f1e");
    public static readonly Color Card = Color.FromArgb("#161c33");
    public static readonly Color Accent = Color.FromArgb("#ffd54a");
    public static readonly Color Text = Color.FromArgb("#e8ecff");
    public static readonly Color Muted = Color.FromArgb("#9aa4c7");
    public static readonly Color Danger = Color.FromArgb("#ff8a8a");

    public static Button PrimaryButton(string text, EventHandler onClick)
    {
        var b = new Button { Text = text, BackgroundColor = Accent, TextColor = Background, CornerRadius = 12 };
        b.Clicked += onClick;
        return b;
    }

    public static Button SecondaryButton(string text, EventHandler onClick)
    {
        var b = new Button { Text = text, BackgroundColor = Card, TextColor = Text, CornerRadius = 12 };
        b.Clicked += onClick;
        return b;
    }

    public static Label Heading(string text) =>
        new() { Text = text, FontSize = 22, FontAttributes = FontAttributes.Bold, TextColor = Text };

    public static Label Body(string text) =>
        new() { Text = text, FontSize = 16, TextColor = Text };

    public static Label Hint(string text) =>
        new() { Text = text, FontSize = 13, TextColor = Muted };
}
