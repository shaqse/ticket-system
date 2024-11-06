using TicketSystem.Api.Entities;

namespace TicketSystem.Api.Database;

public static class InMemoryUserStore
{
    private static readonly Dictionary<string, User> Users = new();

    // Method to add a new user
    public static void AddUser(string username, string password)
    {
        Users[username] = new User
        {
            Username = username,
            Password = password,
            TwoFactorSecret = ""
        };
    }

    // Method to get a user by username
    public static User GetUser(string username)
    {
        if (Users.ContainsKey(username))
        {
            return Users[username];
        }
        return null;
    }
}