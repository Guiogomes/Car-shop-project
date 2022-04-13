import App from './app';
import { Car } from './interfaces/CarInterface';
import CarsController from './controllers/Cars';
import GenericRouter from './routes/Routes';
import MotorcycleController from './controllers/Motorcycle';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();
const carsController = new CarsController();
const carsRoute = new GenericRouter<Car>();
const motorcycleController = new MotorcycleController();
const motorcycleRoute = new GenericRouter<Motorcycle>();

carsRoute.addRoutes(carsController);
motorcycleRoute.addRoutes(motorcycleController);
server.addRouter(carsRoute.router);
server.addRouter(motorcycleRoute.router);
export default server;