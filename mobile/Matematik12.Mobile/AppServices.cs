using Matematik12.Mobile.Core;

namespace Matematik12.Mobile;

public static class AppServices
{
    public static IKeyValue KeyValue { get; } = new PreferencesKeyValue();
    public static AuthStore Auth { get; } = new AuthStore(KeyValue);
    public static ProgressStore Progress { get; } = new ProgressStore(KeyValue);
}
