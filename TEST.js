const express = require(express);
const body_parser = require(body-parser);

const app = express ();
app.use(express.json());
let CarId = 1;
const cars = [];
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
  app.get("/cars", (request, response) => {
    response.json(cars);
  });
  
  app.get("/cars/:id", (request, response) => {
    const carid = parseInt(request.params.id)
    const car = cars.find(car => car.id === carid);
    if (!car) {
        return response.status(404).send('Car not found');
    }
    response.json(car);
  });
  /*app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };
    response.send(status);
  });*/
app.post("/cars", (request, response)=> {
    const { make, model, year, colour, engineType } = request.body;
    const newCar = {
        id: CarId++,
        make,
        model,
        year,
        colour,
        engineType
    };
    cars.push(newCar);
    response.status(201).json(newCar);
});
// Define the route handler for DELETE /cars/:id
app.delete('/cars/:id', (request, response) => {
    const oneCarId = parseInt(request.params.id);
    const index = cars.findIndex(car => car.id === oneCarId);
    if (index === -1) {
        return response.status(404).send('Car not found');
    }
    cars.splice(index, 1);
    response.status(204).send();
});
 app.put('/cars/:id', (request, response)=> {
    const carid = parseInt(request.params.id);
    const index = cars.findIndex(car => car.id === carid);
    if (index === -1){
        return request.status(404).send("Car not found");
    }
    cars[index] = {
        id: carid,
        make: make || cars[index].make, 
        model: model || cars[index].model, 
        year: year || cars[index].year, 
        colour: colour || cars[index].colour,
        engineType: engineType || cars[index].engineType
    };
    response.json(cars[index]); 
});