const express = require('express');
const app = express();

app.use(express.json());

const cars = require('./cars.json');

// get all cars
app.get('/cars', (req, res) => {
  try {
    res.json(cars);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get car by id
app.get('/cars/:id', (req, res) => {
  try {
    const id = req.params.id;
    const car = cars.find((car) => car.id === id);
    if (!car) {
      res.status(404).json({ message: `Car with id ${id} not found` });
    } else {
      res.json(car);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// update car by id
app.put('/cars/:id', (req, res) => {
  try {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex((car) => car.id === id);
    if (index === -1) {
      res.status(404).json({ message: `Car with id ${id} not found` });
    } else {
      cars[index] = updatedCar;
      res.json(updatedCar);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// delete car by id
app.delete('/cars/:id', (req, res) => {
  try {
    const id = req.params.id;
    const index = cars.findIndex((car) => car.id === id);
    if (index === -1) {
      res.status(404).json({ message: `Car with id ${id} not found` });
    } else {
      cars.splice(index, 1);
      res.json({ message: `Car with id ${id} deleted` });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// add car
app.post('/cars', (req, res) => {
  try {
    const newCar = req.body;
    cars.push(newCar);
    res.json(newCar);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// start app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

