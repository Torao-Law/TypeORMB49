import { Request, Response } from "express";
import TodosService from "../services/TodoService";

export default new class TodoController {
  create(req: Request, res: Response) {
    TodosService.create(req, res)
  }
  
  find(req: Request, res: Response) {
    TodosService.find(req, res)
  }
  
  findOne(req: Request, res: Response) {
    TodosService.find(req, res)
  }
  
  update(req: Request, res: Response) {
    TodosService.find(req, res)
  }
  
  delete(req: Request, res: Response) {
    TodosService.find(req, res)
  }
}