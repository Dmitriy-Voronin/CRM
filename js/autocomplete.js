import { tableSearch } from "./tableSearch.js";

export function autocomplete(value, input, arr, list, tbody) {
  let currentFocus;
  let val = value.toUpperCase();
  if (val !== '') {
    currentFocus = -1;
    let newArr = arr.filter(item => {
      item.fio = item.surname + ' ' + item.name;
      if (item.fio.toUpperCase().includes(val)) return true;
    });
    if (newArr.length === 0) return;
    list.classList.remove('hide');
    list.innerHTML = '';
    for (const client of newArr) {
      const findItem = document.createElement('li');
      findItem.textContent = `${client.surname} ${client.name}`;

      findItem.innerHTML = insertMark(findItem.textContent, findItem.textContent.toUpperCase().search(val), val.length);
      findItem.classList.add('find-list__item');
      findItem.addEventListener("click", function () {
        input.value = this.textContent;
        list.classList.add('hide');
        tableSearch(input.value, tbody);
      });
      list.append(findItem);
    }
    function insertMark(str, pos, len) {
      return str.slice(0, pos) + '<span class="find-list__item--mark">' + str.slice(pos, pos + len) + '</span>' + str.slice(pos + len);
    }
    input.addEventListener("keydown", function (e) {
      let x = list.getElementsByClassName('find-list__item');
      if (e.keyCode == 40) {
        /*Если нажата клавиша со стрелкой вниз,
          увеличьте текущую переменную фокуса:*/
        currentFocus++;
        /*и сделать текущий элемент более заметным:*/
        addActive(x);
      } else if (e.keyCode == 38) { //вверх
        /*Если нажата клавиша со стрелкой вверх,
          уменьшите текущую переменную фокуса:*/
        currentFocus--;
        /*и сделать текущий элемент более заметным:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*Если нажата клавиша ENTER, не допускайте отправки формы,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*и имитировать щелчок по "активному" пункту:*/
          if (x) x[currentFocus].click();
        }
      }
    });
  } else {
    list.innerHTML = '';
    list.classList.add('hide');
  }


  /*выполнение функции нажатие клавиши на клавиатуре:*/

  function addActive(x) {
    /*функция для классификации элемента как " активного":*/
    if (!x) return false;
    /*начните с удаления "активного" класса на всех элементах:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*добавить класс "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*функция для удаления класса "active" из всех элементов автозаполнения:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  /*выполните функцию, когда кто-то щелкает в документе:*/
  document.addEventListener("click", function (e) {
    if (e.target !== list && e.target !== input) list.classList.add('hide');
  });
}
