import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todos } from "./Todo";


@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Todos, (todo) => todo.user, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
    todos: Todos[]
}