using TicketSystem.Api.Endpoints;

namespace TicketSystem.Api;

public static class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        ConfigureServices(builder);
        
        var app = builder.Build();
        
        ConfigureMiddleware(app);
        
        app.Run();
    }
    
    private static void ConfigureServices(WebApplicationBuilder builder)
    {
        // Authentication & Authorization
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultScheme = "Cookies";
        }).AddCookie("Cookies");
        
        builder.Services.AddAuthorization();
        
        // API Documentation
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        // CORS Configuration
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
                policy.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });
    }
    
    private static void ConfigureMiddleware(WebApplication app)
    {
        // Development-specific middleware
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        
        // Security middleware
        app.UseCors();
        app.UseAuthentication();
        app.UseAuthorization();
        
        // Endpoint mappings
        MapEndpoints(app);
    }
    
    private static void MapEndpoints(WebApplication app)
    {
        app.MapAccountEndpoints();
        app.MapTwoFactorAuthEndpoints();
    }
}