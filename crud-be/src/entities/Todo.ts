import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "todos" })
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ 
    type: "timestamp", 
    default: () => "CURRENT_TIMESTAMP"
  })
  posted_at: Date

  @ManyToOne(() => User, user => user.todos, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  user: User
}