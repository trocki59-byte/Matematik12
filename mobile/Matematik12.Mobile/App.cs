using Matematik12.Mobile.Views;

namespace Matematik12.Mobile;

public class App : Application
{
    public App()
    {
        UserAppTheme = AppTheme.Dark;
        MainPage = new NavigationPage(AppServices.Auth.Current is null ? new LoginPage() : new HomePage());
    }
}
