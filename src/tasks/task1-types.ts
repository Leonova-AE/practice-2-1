// Задание 1: Интерфейсы и типы
// Описание модели каталога книг

import type { Book } from "../types";

// Формат: "Title (Year) — Authors"
// Если year не указан — пропустить скобки
export function formatBook(book: Book): string {
  const authors = book.authors.join(", ");
  if (book.year === undefined) {
    return `${book.title} — ${authors}`;
  }
  return `${book.title} (${book.year}) — ${authors}`;
}

// Вернуть средний год издания. Если книг нет или у них нет года — вернуть 0.
export function calculateAverageYear(books: Book[]): number {
  const years = books
    .map((book) => book.year)
    .filter((year): year is number => year !== undefined);
  if (years.length === 0) {
    return 0;
  }
  const sum = years.reduce((total, year) => total + year, 0);
  return sum / years.length;
}