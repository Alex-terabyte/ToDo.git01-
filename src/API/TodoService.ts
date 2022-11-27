import { ToDoItem } from "../models/ToDoItem";
import axios, { AxiosResponse } from "axios";

/**
 * Для запросов на сервер используется библиотека axios
 * Всего 5 видов запросов можно послать. Запрос на получений всех данных,
 * запрос на добавление, удаление, изменение статуса и изменение данных
 * todo
 */

export default class TodoService {
  static async getTodos(): Promise<AxiosResponse<ToDoItem[]>> {
    return axios.get<ToDoItem[]>("http://localhost:3001/todos");
  }

  static async addTodo(
    title: string,
    discription: string,
    expDate: string
  ): Promise<AxiosResponse<ToDoItem[]>> {
    const id: number = Date.now();
    const isComplited: boolean = false;

    return axios.post<ToDoItem[]>("http://localhost:3001/todos", {
      id,
      title,
      discription,
      expDate,
      isComplited,
    });
  }

  static async deleteTodos(id: number): Promise<AxiosResponse<ToDoItem[]>> {
    return axios.delete(`http://localhost:3001/todos/${id}`);
  }

  static async putchTodosStatus(
    id: number,
    isComplited: boolean
  ): Promise<AxiosResponse<ToDoItem[]>> {
    return axios.patch(`http://localhost:3001/todos/${id}`, {
      isComplited,
    });
  }

  static async putchTodosFields(
    id: number,
    title: string,
    discription: string,
    expDate: string
  ): Promise<AxiosResponse<ToDoItem[]>> {
    return axios.patch(`http://localhost:3001/todos/${id}`, {
      title,
      discription,
      expDate,
    });
  }
}
