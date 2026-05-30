# Entity Framework Core Setup (SQL Server)

Follow these steps to configure EF Core in your `ContactApi` project.

## 1. Install Required Packages

In terminal, go to your API project folder and run:

```bash
cd <apiFolder>
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet restore
dotnet build
```

## 2. Create `Data/AppDbContext.cs`

Create a `Data` folder (if it does not exist), then add `AppDbContext.cs`:

```csharp
using ContactApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<ContactMessage> ContactMessage { get; set; }
}
```

## 3. Update `Program.cs`

Add these lines:

```csharp
using ContactApi.Data;
using Microsoft.EntityFrameworkCore;

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## 4. Update `appsettings.json`

Add a connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ContactDb;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

Then run:

```bash
dotnet build
```

If you get errors, check your `.csproj` package versions, especially:

- `Microsoft.EntityFrameworkCore.SqlServer`
- `Microsoft.EntityFrameworkCore.Design`

## 5. Install `dotnet-ef`

Global install:

```bash
dotnet tool install --global dotnet-ef
```

For team projects, prefer a local tool manifest:

```bash
dotnet new tool-manifest
dotnet tool install dotnet-ef
```

## 6. Create Initial Migration and Update Database

```bash
dotnet tool install --global dotnet-ef
dotnet ef database update
```

Migration naming tip:

- Initial migration: `InitialCreate`
- Later changes: `AddUserTable`, `AddOrders`, etc.

## 7. Test With a New `User` Model

Create `Models/User.cs`:

```csharp
namespace ContactApi.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

Add this to `AppDbContext.cs`:

```csharp
public DbSet<User> User { get; set; }
```

Run:

```bash
dotnet ef migrations add AddUserTable
dotnet ef database update
```

## 8. Create Controller (Example: User Register)

Create `Controller/UserController.cs`:

```csharp
using CineLuxApi.Data;
using CineLuxApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CineLuxApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
  private readonly AppDbContext _context;

  public UserController(AppDbContext context)
  {
    _context = context;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] User user)
  {
    if (string.IsNullOrWhiteSpace(user.FullName) ||
        string.IsNullOrWhiteSpace(user.Email) ||
        string.IsNullOrWhiteSpace(user.PasswordHash))
      return BadRequest("FullName, Email, and PasswordHash are required");

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return Ok(new { message = "User registered", user.UserId, user.FullName, user.Email });
  }
}
```

Notes:

- Make sure your `User` model has all required fields (for example: `Email`, `PasswordHash` for real apps).
- For production apps, never store plain text passwords. Hash passwords before saving.

## 9. Link Frontend (React) With Backend API

### 9.1 Allow CORS in API (`Program.cs`)

Add CORS policy:

```csharp
builder.Services.AddCors(options =>
{
  options.AddPolicy("Frontend", policy =>
  {
    policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
  });
});
```

Then enable it before `app.MapControllers();`:

```csharp
app.UseCors("Frontend");
```

### 9.2 Use API Base URL in React

In your frontend project, create `.env`:

```bash
VITE_API_BASE_URL=http://localhost:5253
```

Replace port with your API port from `Properties/launchSettings.json`.

### 9.3 Register Call From React

Example in React (Axios):

```bash
npm install axios
```

```jsx
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(payload) {
  const response = await axios.post(`${API_BASE}/api/User/register`, payload);
  return response.data;
}
```

Example payload:

```js
await registerUser({
  fullName: "Haydar",
  email: "haydar@example.com",
  passwordHash: "temp-hash",
  role: "viewer",
});
```

### 9.4 Test Full Flow

1. Run backend API.
2. Run React frontend.
3. Submit register form.
4. Confirm API returns success and data is inserted into database.
