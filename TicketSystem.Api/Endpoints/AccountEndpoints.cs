using Google.Authenticator;
using TicketSystem.Api.Database;
using TicketSystem.Api.Dtos;

namespace TicketSystem.Api.Endpoints;

public static class AccountEndpoints
{
    public static void MapAccountEndpoints(this IEndpointRouteBuilder app)
    {        
        app.MapPost("/login", (LoginModel model) =>
        {
            // Validate the model
            if (model.Username == null || model.Password == null || model.VerificationCode == null)
            {
                return Results.BadRequest("Invalid model");
            }
            Console.WriteLine("LoginModel username: ", model.Username); 
            var user = InMemoryUserStore.GetUser(model.Username);

            if (user == null || user.Password != model.Password)
            {
                return Results.BadRequest(new { Message = "Invalid username or password." });
            }

            var tfa = new TwoFactorAuthenticator();
            var is2FaValid = tfa.ValidateTwoFactorPIN(user.TwoFactorSecret, model.VerificationCode);

            if (!is2FaValid)
            {
                return Results.BadRequest(new { Message = "Invalid 2FA code." });
            }
            return Results.Ok();
        });

        app.MapPost("/register", (RegisterModel model) =>
        {
            // Validate the model
            if (model.Email == null || model.Name == null || model.Password == null)
            {
                return Results.BadRequest("Invalid model");
            }

            InMemoryUserStore.AddUser(model.Email, model.Password);
            return Results.Redirect($"/2fa/setup?username={model.Email}");
        });
        
    }
}
