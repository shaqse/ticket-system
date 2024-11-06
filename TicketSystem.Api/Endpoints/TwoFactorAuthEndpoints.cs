using Google.Authenticator;
using Microsoft.AspNetCore.Mvc;
using TicketSystem.Api.Database;
using TicketSystem.Api.Contracts;

namespace TicketSystem.Api.Endpoints;

public static class TwoFactorAuthEndpoints
{
    public static void MapTwoFactorAuthEndpoints(this IEndpointRouteBuilder app) 
    {
        app.MapGet("/2fa/setup", ([FromQuery] string username) =>
        {
            var user = InMemoryUserStore.GetUser(username);
            if (user is null)
            {
                return Results.NotFound("User not found");
            }

            var tfa = new TwoFactorAuthenticator();
            var userUniqueKey = Guid.NewGuid().ToString(); // Generate a new secret key for the user
            var setupInfo = tfa.GenerateSetupCode("Tpc", user.Username, userUniqueKey, false, 3);

            // Store the secret key in the user store
            user.TwoFactorSecret = userUniqueKey;

            var setupData = new SetupData
            {
                QRCodeImageUrl = setupInfo.QrCodeSetupImageUrl,
                ManualEntryKey = setupInfo.ManualEntryKey,
                Username = username
            };

            return Results.Ok(setupData);
        });

        // Validate 2FA endpoint
        app.MapPost("/2fa/validate", ([FromBody] ValidateData data) =>
        {
            var user = InMemoryUserStore.GetUser(data.Username);
            if (user == null)
            {
                return Results.NotFound("User not found");
            }

            var tfa = new TwoFactorAuthenticator();
            var isValid = tfa.ValidateTwoFactorPIN(user.TwoFactorSecret, data.VerificationCode);

            if (isValid)
            {
                user.IsTwoFactorEnabled = true;
                return Results.Ok(new { Message = "Two-Factor Authentication setup successfully!" });
            }
            else
            {
                return Results.BadRequest(new { Message = "Invalid authentication code, please try again." });
            }
        });
    }
}
        
   