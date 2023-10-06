import { Repository } from "typeorm";
import { Todos } from "../entities/Todo";
import { AppDataSource } from "../data-source";
import { createTodoSchema, updateTodoSchema } from "../utils/validators/Todos";
import { Request, Response } from "express"

export default new class TodosService {
  private readonly TodoRepository: Repository<Todos> = AppDataSource.getRepository(Todos)

  async create(req: Request, res: Response) : Promise<Response> {
    try {
      const data = req.body

      const { error } = createTodoSchema.validate(data)
      if(error) return res.status(400).json({ error: error})

      const obj = this.TodoRepository.create({
        name: data.name
      })

      const todos = await this.TodoRepository.save(obj)
      
      return res.status(200).json(todos)
    } catch (err) {
      return res.status(500).json({ Error: "errow while inserting data"})
    }
  }

  async find(req: Request, res: Response) : Promise<Response> {
    try {
      const todos = this.TodoRepository.find()
      console.log(todos)
      return res.status(200).json(todos)
    } catch (error) {
      return res.status(500).json({ Error: "errow while finding datas"})
    }
  }

  async findOne(req: Request, res: Response) : Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const todo = await this.TodoRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user"],
      });

      return res.status(200).json(todo);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const todo = await this.TodoRepository.findOne({
        where: {
          id: id,
        },
      });

      const data = req.body;
      const { error } = updateTodoSchema.validate(data);

      if (error)  return res.status(400).json({ error: error });
      

      if (!todo) return res.status(404).json("Thread ID not found!")
      if (data.name != "") {
        todo.name = data.name;
      }

      const response = await this.TodoRepository.save(todo);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.TodoRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!thread) return res.status(404).json("Thread ID not found!")
      
      await this.TodoRepository.delete({ id: id });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }
}