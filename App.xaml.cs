using Matematik12.Pages;

namespace Matematik12;

public partial class App : Application
{
    public App()
    {
        InitializeComponent();
    }

    protected override Window CreateWindow(IActivationState? activationState)
        => new Window(new NavigationPage(new TopicsPage()));
}
