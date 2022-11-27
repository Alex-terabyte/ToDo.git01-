import React, { FC } from "react";
import { ToDoItem } from "../models/ToDoItem";
import TodoItem from "./TodoItem";

/*
Принимает массив todoList и отрисовывает каждую todo 
через функцию map 
*/

interface TodoListProps {
  todoList: ToDoItem[];
}

const TodoList: FC<TodoListProps> = ({ todoList }) => {
  return (
    <div className="todo__list">
      {todoList.map((item) => {
        return <TodoItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default TodoList;
