# How to Create a .NET API for Car Management

This guide will walk you through creating a simple .NET Web API for managing cars. The steps use the .NET CLI and Visual Studio Code, but you can adapt them for Visual Studio or other editors.

---

## 1. Create a New .NET Web API Project

```bash
dotnet new webapi -n CarApi
cd CarApi
```

---

## 2. Create the Car Model

Create a new file in the `Models` folder:

**Models/Car.cs**

```csharp
namespace CarApi.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
    }
}
```

---

## 3. Create the Car Service (Optional)

Add a service to manage car data (in-memory for simplicity):

**Services/CarService.cs**

```csharp
using CarApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace CarApi.Services
{
    public class CarService
    {
        private static List<Car> cars = new List<Car>();

        public List<Car> GetAll() => cars;
        public Car Get(int id) => cars.FirstOrDefault(c => c.Id == id);
        public void Add(Car car) => cars.Add(car);
        public void Update(Car car)
        {
            var index = cars.FindIndex(c => c.Id == car.Id);
            if (index != -1) cars[index] = car;
        }
        public void Delete(int id) => cars.RemoveAll(c => c.Id == id);
    }
}
```

---

## 4. Register the Service in Program.cs

Add the service to the DI container in `Program.cs`:

```csharp
builder.Services.AddSingleton<CarApi.Services.CarService>();
```

---

## 5. Create the Car Controller

Add a new controller:

**Controllers/CarController.cs**

```csharp
using Microsoft.AspNetCore.Mvc;
using CarApi.Models;
using CarApi.Services;

namespace CarApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly CarService _service;
        public CarController(CarService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Car>> GetAll() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Car> Get(int id)
        {
            var car = _service.Get(id);
            if (car == null) return NotFound();
            return car;
        }

        [HttpPost]
        public IActionResult Create(Car car)
        {
            _service.Add(car);
            return CreatedAtAction(nameof(Get), new { id = car.Id }, car);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Car car)
        {
            if (id != car.Id) return BadRequest();
            _service.Update(car);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return NoContent();
        }
    }
}
```

---

## 6. Run the API

```bash
dotnet run
```

The API will be available at `https://localhost:5001/api/car` (or similar).

---

## 7. Test the API

Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the endpoints:

- `GET /api/car` — List all cars
- `GET /api/car/{id}` — Get a car by ID
- `POST /api/car` — Add a new car
- `PUT /api/car/{id}` — Update a car
- `DELETE /api/car/{id}` — Delete a car

---

## 8. Next Steps

- Connect to a real database (e.g., Entity Framework Core)
- Add authentication/authorization
- Add validation and error handling
- Create a frontend to consume the API

---

This is a basic template. Adjust as needed for your project!
