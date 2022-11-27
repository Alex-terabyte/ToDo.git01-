/**
 * Функция для получения текущей даты в строковом формате
 */

let date = new Date();
let currentDate =
  date.getFullYear() +
  "-" +
  String(date.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(date.getDate()).padStart(2, "0");

export default currentDate;
