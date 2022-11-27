import { FC, useContext, useState } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { ToDoItem } from "../models/ToDoItem";
import currentDate from "../utils/CurrentDate";
import TodoService from "./../API/TodoService";

/*
Todo item имеет 2 состояния - режим просмотра и режим 
редактирования, в зависимости от этого отрисовываются либо 
параграфы и заголовки, либо инпуты
*/

interface ItemProps {
  item: ToDoItem;
}

const TodoItem: FC<ItemProps> = ({ item }) => {
  const { setFetching } = useContext(UpdateContext);
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState({
    id: item.id,
    title: item.title,
    discription: item.discription,
    expDate: item.expDate,
    isComplited: item.isComplited,
  });

  async function deleteTodo() {
    const result = window.confirm("Удалить задачу");
    if (result) {
      try {
        setFetching(true);
        await TodoService.deleteTodos(item.id);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function changeStatus() {
    try {
      setFetching(true);
      await TodoService.putchTodosStatus(item.id, !item.isComplited);
    } catch (e) {
      console.error(e);
    }
  }

  async function editTodoAsync() {
    try {
      setFetching(true);
      await TodoService.putchTodosFields(
        todo.id,
        todo.title,
        todo.discription,
        todo.expDate
      );
      setEdit(false);
    } catch (e) {
      console.error(e);
    }
  }

  function editTodo() {
    setEdit(true);
  }

  function canselChanges() {
    setEdit(false);
  }

  return (
    <>
      {edit ? (
        <ul className="todo__item" key={item.id}>
          <li className="field__title">
            Заголовок:
            <br />
            <input
              type="text"
              value={todo.title}
              className="edit_input input__title"
              onChange={(e) =>
                setTodo((currentVal) => ({
                  ...currentVal,
                  title: e.target.value,
                }))
              }
            />
          </li>
          <li className="field__discription">
            <p>
              Описание:
              <br />
              <input
                type="text"
                value={todo.discription}
                className="edit_input input__discription"
                onChange={(e) =>
                  setTodo((currentVal) => ({
                    ...currentVal,
                    discription: e.target.value,
                  }))
                }
              />
            </p>
          </li>
          <li className=" field__expDate">
            <p>
              Сделать до:
              <br />
              <input
                min={currentDate}
                type="date"
                value={todo.expDate}
                className="edit_input input__expDate"
                onChange={(e) =>
                  setTodo((currentVal) => ({
                    ...currentVal,
                    expDate: e.target.value,
                  }))
                }
              />
            </p>
          </li>
          <li>
            <button
              onClick={() => editTodoAsync()}
              className="button save_button"
            >
              Сохранить
            </button>
          </li>
          <li>
            <button
              onClick={() => canselChanges()}
              className="button cansel_button"
            >
              Отмена
            </button>
          </li>
        </ul>
      ) : (
        <ul className="todo__item" key={item.id}>
          <li className="todo__item-field field__title">
            <h4>
              Заголовок:
              <br /> {item.title}
            </h4>
          </li>
          <li className="todo__item-field field__discription">
            <p>
              Описание:
              <br /> {item.discription}
            </p>
          </li>
          <li className="todo__item-field field__expDate">
            <p
              style={{ color: currentDate > item.expDate ? "red" : "#27b627" }}
            >
              Сделать до:
              <br /> {item.expDate}
            </p>
          </li>

          {/* Данный элемент списка не задейстовован потому 
              что на сервере не поддерживается
              загрузка файлов  */}

          {/* <li className="todo__item-field field__file">
            <div>
              Файл:
              <br /> {item.file}
            </div>
          </li> */}
          <li>
            <button
              onClick={() => changeStatus()}
              className="button complite__button"
            >
              {item.isComplited ? (
                <img src="../../public/checkbox.svg" />
              ) : (
                <img src="../../public/checkbox-unchecked.svg" />
              )}
            </button>
          </li>
          <li>
            <button onClick={() => editTodo()} className="button edit_button">
              <img src="../../public/edit.svg" alt="" />
            </button>
          </li>
          <li>
            <button
              onClick={() => deleteTodo()}
              className="button delete_button"
            >
              <img src="../../public/delete.svg" alt="" />
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default TodoItem;
