using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace Matematik12.Mobile.Core;

public sealed record UserAccount(string Name, int Grade, string Salt, string PinHash);

// Yerel hesap: ad + 4 haneli PIN (SHA-256, tuzlu). Web sürümüyle aynı mantık.
public sealed class AuthStore
{
    private const string UsersKey = "matematik12.users.v1";
    private const string SessionKey = "matematik12.session.v1";
    private static readonly CultureInfo Tr = new("tr-TR");
    private readonly IKeyValue _kv;

    public AuthStore(IKeyValue kv) => _kv = kv;

    public static string Normalize(string name) => name.Trim().ToLower(Tr);

    public static string? ValidateSignup(string name, string pin, int grade)
    {
        var n = name.Trim();
        if (n.Length < 2 || n.Length > 30 || !Regex.IsMatch(n, @"^[\p{L} ]+$"))
            return "Ad 2–30 harf olmalı.";
        if (!Regex.IsMatch(pin, @"^\d{4}$")) return "PIN 4 rakamdan oluşmalı.";
        if (grade < 1 || grade > 12) return "Geçerli bir sınıf seç.";
        return null;
    }

    public string? Signup(string name, string pin, int grade)
    {
        var error = ValidateSignup(name, pin, grade);
        if (error is not null) return error;

        var users = LoadUsers();
        var key = Normalize(name);
        if (users.ContainsKey(key)) return "Bu ad zaten kayıtlı.";

        var salt = Convert.ToHexString(RandomNumberGenerator.GetBytes(16));
        users[key] = new UserAccount(name.Trim(), grade, salt, Hash(salt, pin));
        _kv.Set(UsersKey, JsonSerializer.Serialize(users));
        return null;
    }

    public bool Login(string name, string pin)
    {
        var users = LoadUsers();
        if (!users.TryGetValue(Normalize(name), out var account)) return false;
        if (account.PinHash != Hash(account.Salt, pin)) return false;
        _kv.Set(SessionKey, Normalize(name));
        return true;
    }

    public void Logout() => _kv.Remove(SessionKey);

    public UserAccount? Current
    {
        get
        {
            var key = _kv.Get(SessionKey);
            if (string.IsNullOrEmpty(key)) return null;
            return LoadUsers().TryGetValue(key, out var account) ? account : null;
        }
    }

    private Dictionary<string, UserAccount> LoadUsers()
    {
        var raw = _kv.Get(UsersKey);
        if (string.IsNullOrEmpty(raw)) return new Dictionary<string, UserAccount>();
        try { return JsonSerializer.Deserialize<Dictionary<string, UserAccount>>(raw) ?? new(); }
        catch (JsonException) { return new Dictionary<string, UserAccount>(); }
    }

    private static string Hash(string salt, string pin) =>
        Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes($"{salt}:{pin}")));
}
