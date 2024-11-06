# Ticket System with 2FA

A modern ticket management system built with .NET 8 backend, Node.js frontend, and Nginx reverse proxy. Features two-factor authentication for enhanced security.

## 🚀 Tech Stack

- **Backend**: .NET 8 Web API
- **Frontend**: Node.js
- **Proxy**: Nginx
- **Containerization**: Docker & Docker Compose
- **Authentication**: Cookie-based with 2FA support

## 📋 Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🛠️ Project Structure

```
ticket-system/
├── TicketSystem.Api/          # .NET 8 Backend
├── TicketSystem.Frontend/     # Node.js Frontend
├── docker-compose.yml         # Docker configuration
├── nginx.conf                 # Nginx configuration
└── README.md                  # This file
```

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticket-system
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:8080
   - API: http://localhost:8080/api/swagger
   - Direct API access: http://localhost:5000
   - Direct Frontend access: http://localhost:3000

## 🔍 Service Verification

Check if services are running properly:

```bash
# View all containers
docker-compose ps

# Check nginx logs
docker-compose logs nginx

# Check API logs
docker-compose logs ticketsystem.api

# Check frontend logs
docker-compose logs ticketsystem.ui
```

## 🔧 Testing Nginx

1. **Check Nginx Status**
   ```bash
   docker-compose exec nginx nginx -t
   ```

2. **Test HTTP Response**
   ```bash
   curl -I http://localhost:8080
   ```

3. **View Nginx Logs**
   ```bash
   docker-compose logs -f nginx
   ```

## 🛑 Stopping the Application

```bash
# Stop all services
docker-compose down

# Stop specific service
docker-compose stop [service-name]
```

## 🔄 Common Commands

```bash
# Rebuild services
docker-compose build

# Restart services
docker-compose restart

# View logs
docker-compose logs -f

# Enter container shell
docker-compose exec [service-name] sh
```

## 🔐 Security Features

- Two-Factor Authentication (2FA)
- Cookie-based authentication
- Secure communication between services
- CORS protection

## 🌐 Environment Variables

### Backend (.NET API)
```env
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:5000
```

### Frontend (Node.js)
- Default port: 3000
- Configure additional variables in `.env` file

## 🐳 Docker Services

### API Service
```yaml
ticketsystem.api:
  - Port: 5000
  - Environment: Development
  - Base Image: mcr.microsoft.com/dotnet/aspnet:8.0
```

### Frontend Service
```yaml
ticketsystem.ui:
  - Port: 3000
  - Base Image: node:alpine
  - Hot Reload Enabled
```

### Nginx Service
```yaml
nginx:
  - Port: 8080
  - Base Image: nginx:latest
  - Reverse Proxy Configuration
```

## 🔨 Troubleshooting

1. **502 Bad Gateway**
   - Check if all services are running
   - Verify nginx configuration
   - Check service logs

2. **Service not starting**
   ```bash
   # Check logs
   docker-compose logs [service-name]
   
   # Rebuild service
   docker-compose build [service-name]
   ```

3. **Port conflicts**
   - Modify ports in docker-compose.yml
   - Check for running services on same ports

## 📝 License

MIT License - See [LICENSE](LICENSE) for details
