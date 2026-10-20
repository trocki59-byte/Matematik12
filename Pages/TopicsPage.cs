using Matematik12.Engine;
using Matematik12.Services;

namespace Matematik12.Pages;

public class TopicsPage : ContentPage
{
    readonly VerticalStackLayout _list = new() { Spacing = 10 };

    public TopicsPage()
    {
        Title = "Matematik";
        Content = new ScrollView
        {
            Content = new VerticalStackLayout
            {
                Padding = 16,
                Spacing = 12,
                Children =
                {
                    new Label { Text = "Sınıf ve konu seç", FontSize = 20, FontAttributes = FontAttributes.Bold },
                    _list
                }
            }
        };
    }

    // Sayfa her göründüğünde listeyi yeniler, böylece ilerleme yüzdeleri güncel kalır.
    protected override void OnAppearing()
    {
        base.OnAppearing();
        _list.Children.Clear();

        foreach (var group in Curriculum.All.GroupBy(t => t.Grade))
        {
            _list.Children.Add(new Label
            {
                Text = group.Key,
                FontSize = 18,
                FontAttributes = FontAttributes.Bold,
                Margin = new Thickness(0, 8, 0, 0)
            });

            foreach (var topic in group)
            {
                var t = topic;
                var btn = new Button { Text = $"{t.Name}  ({Describe(t.Id)})", HorizontalOptions = LayoutOptions.Fill };
                btn.Clicked += async (_, _) => await Navigation.PushAsync(new QuizPage(t));
                _list.Children.Add(btn);
            }
        }
    }

    static string Describe(string id)
    {
        var (c, t) = Progress.Get(id);
        return t == 0 ? "başlanmadı" : $"%{100 * c / t} · {t} soru";
    }
}
