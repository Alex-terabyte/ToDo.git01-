import React, { FC, useContext, useState } from "react";
import TodoService from "../API/TodoService";
import currentDate from "../utils/CurrentDate";
import { UpdateContext } from "./../context/UpdateContext";

const CreateToDo: FC = () => {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [expdate, setExpdate] = useState("");

  const { setFetching } = useContext(UpdateContext);

  async function createTodo(
    title: string,
    discription: string,
    expdate: string,
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    try {
      setFetching(true);
      await TodoService.addTodo(title, discription, expdate);
      setTitle("");
      setDiscription("");
      setExpdate("");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form
      className="createTodo__form"
      onSubmit={(event) => {
        createTodo(title, discription, expdate, event);
      }}
    >
      <input
        type="text"
        className="input input__title"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="input input__description"
        placeholder="Описание"
        value={discription}
        onChange={(e) => setDiscription(e.target.value)}
      />
      <input
        type="date"
        min={currentDate}
        className="input input__date"
        placeholder="Дата завершения"
        value={expdate}
        onChange={(e) => setExpdate(e.target.value)}
      />

      {/* Данный импут не задейстовован потому 
      что на сервере не поддерживается
      загрузка файлов  */}

      {/* <input
        type="file"
        className="input input__file"
        placeholder="Прикрепить файл"
        onChange={handleFile}
        accept=".pdf,.docx,.doc"
      /> */}
      <button type="submit" className="input__button">
        Создать задачу
      </button>
    </form>
  );
};

export default CreateToDo;
