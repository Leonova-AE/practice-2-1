// Общие типы, которые используют все задания практики 2.1 - это мне клод сказал добавить, чтобы я смогла сделать задания с 1го по 4й. Как вы предложили не получилось. Извините меня, но я хочу с вами практику успеть на паре поделать((()))

export interface Book {
  readonly id: string;
  title: string;
  authors: string[];
  year?: number;
  rating?: number;
}

export type Catalog = Record<string, Book>;

export type BookFilter = (book: Book) => boolean;