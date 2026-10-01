import './styles.css';
import { Book, Catalog, BookFilter, formatBook } from './task1-types';
import { addBook } from './task2-functions';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';
import { createBookFromForm } from './task4-integration';

// Готовые данные для старта
let catalog: Catalog = {
  '1': { id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2023 },
  '2': { id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022 },
};

const bookList = document.getElementById('bookList')!;

function renderBooks(books: Book[]) {
  bookList.innerHTML = books.map(book => 
    `<div class="book-card">${formatBook(book)}</div>`
  ).join('');
}

// Отрисовать начальные книги
renderBooks(Object.values(catalog));

// Обработчик формы
const bookForm = document.getElementById('bookForm') as HTMLFormElement;
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(bookForm);
  const newBook = createBookFromForm(formData);

  catalog = addBook(catalog, newBook);
  bookForm.reset();
  renderBooks(Object.values(catalog));
});


//вот бы оно сохранилось
// Обработчик фильтров
document.getElementById('applyFilters')?.addEventListener('click', () => {
  const authorInput = document.getElementById('filterAuthor') as HTMLInputElement;
  const yearInput = document.getElementById('filterYear') as HTMLInputElement;

  const filters: BookFilter[] = [];
  if (authorInput.value) {
    filters.push(filterByAuthor(authorInput.value));
  }
  if (yearInput.value) {
    filters.push(filterByMinYear(Number(yearInput.value)));
  }

  renderBooks(applyFilters(Object.values(catalog), filters));
});