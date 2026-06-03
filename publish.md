

Your stack is: **React + Vite** frontend, **ASP.NET Core (.NET 10)** backend, **SQL Server** via EF Core. Here's the full publishing roadmap tailored to it:

---

## 1. Database — Azure SQL Database

You're already using SQL Server locally (`Microsoft.EntityFrameworkCore.SqlServer`). The smoothest cloud choice is **Azure SQL Database** — same engine, zero code changes needed.

**Steps:**
1. Create an [Azure account](https://azure.microsoft.com) (free tier available)
2. In Azure Portal → **SQL databases** → Create new → pick "Basic" tier (~$5/mo) to start
3. Enable **"Allow Azure services to access this server"** in the firewall settings
4. Get your connection string from Azure Portal and replace appsettings.json:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=your-server.database.windows.net;Database=CineLuxDB;User Id=your-user;Password=your-password;TrustServerCertificate=True;"
}
```

5. Run migrations against it: `dotnet ef database update --connection "your-azure-connection-string"`

> **Never commit the real connection string.** Use environment variables or Azure Key Vault in production.

---

## 2. Backend Hosting — Azure App Service

Best match for .NET 10 — it natively supports it with minimal config.

**Steps:**
1. In Azure Portal → **App Services** → Create → Runtime: **.NET 10**, OS: Linux (cheaper)
2. Publish from VS Code or CLI:
   ```bash
   dotnet publish -c Release -o ./publish
   # Then zip and deploy via Azure CLI:
   az webapp deploy --resource-group myRG --name myCineLuxApi --src-path publish.zip
   ```
3. Set the connection string as an **App Service Environment Variable** (Configuration → Application Settings), not in appsettings.json
4. Set `ASPNETCORE_ENVIRONMENT=Production`

---

## 3. Frontend Hosting — Vercel (recommended for Vite/React)

**Steps:**
1. Push your frontend folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import Project → select the repo
3. Set:
   - Framework: **Vite**
   - Root directory: frontend
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add an environment variable for your API URL:
   ```
   VITE_API_URL=https://your-api.azurewebsites.net
   ```
5. In your frontend code, use `import.meta.env.VITE_API_URL` instead of a hardcoded URL

---

## 4. CORS — Link Frontend to Backend

In Program.cs, you need to allow your Vercel domain:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("Production", policy =>
        policy.WithOrigins("https://your-app.vercel.app")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// then in the pipeline:
app.UseCors("Production");
```

---

## 5. Domain Name

1. Buy a domain from **Namecheap**, **Cloudflare Registrar**, or **GoDaddy** (~$10-15/year)
2. **Frontend (Vercel):** Go to Vercel → Project Settings → Domains → add your domain. Vercel gives you DNS records to set at your registrar.
3. **Backend (Azure):** In App Service → Custom Domains → add `api.yourdomain.com`. Point a `CNAME` record at your `.azurewebsites.net` URL.
4. SSL/HTTPS is **free and automatic** on both Vercel and Azure App Service.

---

## 6. Pre-publish Checklist

| Item | Action |
|------|--------|
| Secrets | Move connection string to Azure App Settings / env vars |
| CORS | Restrict to your actual domain, not `*` |
| EF Migrations | Run `dotnet ef database update` against production DB |
| `appsettings.Production.json` | Create one with production-safe logging levels |
| Video/thumbnail files | Move to **Azure Blob Storage** or similar CDN — don't serve from the app server |
| Payment handling | Your current code skips real payment processing — integrate **Stripe** before going live |
| Auth/JWT | Add proper token-based auth if not done yet |

---

## Summary Architecture

```
User Browser
    │
    ├── yourdomain.com → Vercel (React/Vite frontend)
    │                        │
    │                        └── api.yourdomain.com → Azure App Service (.NET 10 API)
    │                                                        │
    │                                                        └── Azure SQL Database
    │
    └── Videos/images → Azure Blob Storage (CDN)
```

The cheapest production setup (light traffic) runs around **$15-25/month** total on Azure + Vercel free tier.