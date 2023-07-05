import { addClientModal } from "./addClientModal.js";
import { createPreloader } from "./preloader.js";


export function createClientsSection() {
  const section = document.createElement('section');
  const h1 = document.createElement('h1');
  const container = document.createElement('div');
  const main = document.createElement('main');
  const clientsThead = document.createElement('thead');
  const theadTr = document.createElement('tr');
  const sortingTheadId = document.createElement('th');
  const sortingTheadName = document.createElement('th');
  const sortingTheadCreate = document.createElement('th');
  const sortingTheadEdit = document.createElement('th');
  const theadContacts = document.createElement('th');
  const theadActions = document.createElement('th');
  const sortingTheadIdSpan = document.createElement('span');
  const sortingTheadIdSpanArrow = document.createElement('span');
  // const preloader = createPreloader();
  const sortingTheadCreateDateSpan = document.createElement('span');
  const sortingTheadCreateSpan = document.createElement('span');
  const sortingTheadCreateSpanArrow = document.createElement('span');
  const sortingTheadNameSpan = document.createElement('span');
  const sortingTheadNameSpanArrow = document.createElement('span');
  const sortingTheadNameSort = document.createElement('span');
  const sortingTheadEditDateSpan = document.createElement('span');
  const sortingTheadEditSpan = document.createElement('span');
  const sortingTheadEditSpanArrow = document.createElement('span');
  const addUserBtn = document.createElement('button');
  const clientsTable = document.createElement('table');
  const tableWrapper = document.createElement('div');
  const tbody = document.createElement('tbody');

  const sortItems = [sortingTheadId, sortingTheadName, sortingTheadCreate, sortingTheadEdit];

  for (const item of sortItems) {
    item.addEventListener('click', function () {
      sortItems.forEach(el => {
        el.classList.remove('clients-table__th-sort-text--active');
      })
      this.classList.add('clients-table__th-sort-text--active');

      if (item.classList.contains('sort-down')) {
        item.classList.remove('sort-down');
        item.classList.add('sort-up');
      } else {
        item.classList.add('sort-down');
        item.classList.remove('sort-up');
      }
    });
  }

  sortingTheadId.setAttribute('data-type', 'id');
  sortingTheadName.setAttribute('data-type', 'surname');
  sortingTheadCreate.setAttribute('data-type', 'createdAt');
  sortingTheadEdit.setAttribute('data-type', 'updatedAt');

  section.classList.add('clients');
  tableWrapper.classList.add('clients-table__wrapper');
  h1.classList.add('clients__title');
  tbody.classList.add('clients-table__tbody');
  clientsThead.classList.add('clients-table__thead');
  theadTr.classList.add('clients-table__thead-tr');
  sortingTheadId.classList.add('clients-table__th', 'clients-table__th-sort', 'table__th-hover', 'sort-up');
  sortingTheadIdSpan.classList.add('table__th-text');
  sortingTheadIdSpanArrow.classList.add('th-icon');
  sortingTheadName.classList.add('clients-table__th', 'clients-table__th-sort', 'table__th-hover', 'sort-down');
  sortingTheadNameSpan.classList.add('table__th-text');
  sortingTheadNameSpanArrow.classList.add('th-icon');
  sortingTheadNameSort.classList.add('table__th-text-sort')
  sortingTheadCreate.classList.add('clients-table__th', 'clients-table__th-sort', 'table__th-hover', 'sort-down');
  sortingTheadCreateSpanArrow.classList.add('th-icon');
  sortingTheadCreateDateSpan.classList.add('table__th-text');
  sortingTheadCreateSpan.classList.add('table__th-text');
  sortingTheadEdit.classList.add('clients-table__th', 'clients-table__th-sort', 'table__th-hover', 'sort-down');
  sortingTheadEditDateSpan.classList.add('table__th-text');
  sortingTheadEditSpan.classList.add('table__th-text');
  sortingTheadEditSpanArrow.classList.add('th-icon');
  theadContacts.classList.add('clients-table__th', 'clients-table__th-contacts');
  theadActions.classList.add('clients-table__th', 'clients-table__th-actions');
  addUserBtn.classList.add('clients__add-btn', 'btn-reset');
  container.classList.add('container', 'clients__container');
  clientsTable.classList.add('clients__table');
  main.classList.add('main');

  h1.textContent = 'Клиенты';
  sortingTheadIdSpan.textContent = 'ID';

  sortingTheadNameSpan.textContent = 'Фамилия Имя Отчество';
  sortingTheadNameSort.textContent = 'А-Я';
  sortingTheadCreateDateSpan.textContent = 'Дата и время';
  sortingTheadCreateSpan.textContent = 'создания';
  sortingTheadEditDateSpan.textContent = 'Последние'
  sortingTheadEditSpan.textContent = 'изменения';
  theadContacts.textContent = 'Контакты ';
  theadActions.textContent = 'Действия ';
  addUserBtn.innerHTML = `<svg class="human-icon" width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z" fill="currentcolor" />
                          </svg>
                          Добавить клиента`;

  addUserBtn.addEventListener('click', () => {
    document.body.append(addClientModal());
  });

  main.append(section);
  section.append(container);
  sortingTheadId.append(sortingTheadIdSpan, sortingTheadIdSpanArrow);
  sortingTheadName.append(sortingTheadNameSpan, sortingTheadNameSpanArrow, sortingTheadNameSort);
  sortingTheadCreate.append(sortingTheadCreateDateSpan, sortingTheadCreateSpan, sortingTheadCreateSpanArrow);
  sortingTheadEdit.append(sortingTheadEditDateSpan, sortingTheadEditSpan, sortingTheadEditSpanArrow);
  theadTr.append(
    sortingTheadId,
    sortingTheadName,
    sortingTheadCreate,
    sortingTheadEdit,
    theadContacts,
    theadActions
  );
  clientsThead.append(theadTr);
  clientsTable.append(clientsThead, tbody);
  // tbody.append(preloader);
  tableWrapper.append(h1, clientsTable);
  container.append(tableWrapper, addUserBtn);



  return {
    main,
    clientsTable,
    tbody
  }
}
