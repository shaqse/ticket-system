namespace TicketSystem.Api.Dtos;

public class RegisterModel
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public bool Terms { get; set; }
}