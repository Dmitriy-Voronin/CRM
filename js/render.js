// import { getSortClients } from './sortClientsTable.js';
import { createClientItem } from './createClientItem.js';
import { createPreloader } from './preloader.js';
// import { getClients } from "./clientsApi.js";

export function render(arr, prop) {
  arr.sort(function (clientA, clientB) {
        if (clientA[prop] > clientB[prop]) return -1;
        if (clientA[prop] < clientB[prop]) return 1;
        if (clientA === clientB) return 0;
      });
      const preloader = createPreloader();
      const tbody = document.querySelector('.clients-table__tbody');
      tbody.innerHTML = '';
      tbody.append(preloader);
      setTimeout(() => {
        for (const item of arr) {
          document.querySelector('.clients-table__tbody').append(createClientItem(item));
        }
      }, 1500);

    setTimeout(() => {
      preloader.remove();
    }, 1500);

  }
