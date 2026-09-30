// Задание 4: Интеграция с DOM (Парсинг сырых данных)
// Преобразование данных из HTML-формы в строго типизированный объект

import { Book } from "./task1-types";

/**
 * Создаёт объект Book из данных HTML-формы.
 * 
 * ВАЖНО: Данные из формы всегда приходят как строки. 
 * Ваша задача — преобразовать их в правильные типы и проверить границы значений.
 */
export function createBookFromForm(formData: FormData): Book {
  // 1. Сырые значения полей формы
  const rawTitle = formData.get("title") as string;
  const rawAuthors = formData.get("authors") as string;
  const rawYear = formData.get("year") as string;
  const rawRating = formData.get("rating") as string;

  // 2. Авторы: строка "A, B" -> ["A", "B"], без пустых элементов
  const authors = rawAuthors
    .split(",")
    .map((author) => author.trim())
    .filter((author) => author.length > 0);

  // 3. Год: пустое поле -> undefined, иначе число
  const year = rawYear ? parseInt(rawYear, 10) : undefined;

  // 4. Рейтинг: пустое поле -> undefined, иначе число с валидацией диапазона 0..5
  let rating: number | undefined;
  if (rawRating) {
    rating = parseFloat(rawRating);
    if (rating < 0 || rating > 5) {
      throw new Error("Рейтинг должен быть числом от 0 до 5");
    }
  }

  // 5. Уникальный ID
  const id = crypto.randomUUID();

  // 6. Итоговый объект Book
  return {
    id,
    title: rawTitle,
    authors,
    year,
    rating,
  };
}