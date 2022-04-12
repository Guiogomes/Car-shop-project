import { Router } from 'express';
import Controller from '../controllers';

class GenericRouter<GenericController> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoutes(
    controller: Controller<GenericController>,
    route: string = controller.route,
  ): void {
    this.router.get(`${route}`, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.post(`${route}`, controller.create);
    this.router.put(`${route}/:id`, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}

export default GenericRouter;