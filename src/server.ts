import App from './app';
import { Car } from './interfaces/CarInterface';
import CarsController from './controllers/Cars';
import GenericRouter from './routes/Routes';

const server = new App();
const carsController = new CarsController();
const carsRoute = new GenericRouter<Car>();

carsRoute.addRoutes(carsController);
server.addRouter(carsRoute.router);

export default server;