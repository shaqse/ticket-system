namespace TicketSystem.Api.Entities;

public sealed class User
{
    public Guid Id { get; set; }

    public string Username { get; set; }
    
    public string Password { get; set; }
    
    public string TwoFactorSecret { get; set; }
    
    public bool IsTwoFactorEnabled { get; set; }
}