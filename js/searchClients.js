import { findClient } from './clientsApi.js';
import { render } from './render.js';
import { createPreloader } from "./preloader.js";
import { tableSearch } from "./tableSearch.js";
import { autocomplete } from "./autocomplete.js";


  export function searchClients() {
    const findList = document.querySelector('.find-list');
    const input = document.querySelector('.header__input');
    const tbody = document.querySelector('.clients-table__tbody');
    const preloader = createPreloader();
    let timeoutId;

   function timeout() {
    timeoutId = setTimeout(async () => {
      const response = await findClient(input.value);
      autocomplete(input.value, input, response, findList, tbody);
      console.log(tbody.rows);
    }, 300);

    }

    async function startTimeout() {
    if (!timeoutId) {
      timeout();
    } else {
      clearTimeout(timeoutId);
      timeout();
    }
  }
    input.addEventListener('input', startTimeout);

  }



