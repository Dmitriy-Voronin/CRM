import { svgDelete } from "./svg.js";

export function createContactItem() {
  const contact = document.createElement('div');
  const contactType = document.createElement('div');
  const contactName = document.createElement('input');
  const contactList = document.createElement('ul');
  const contactInput = document.createElement('input');
  const contactDelete = document.createElement('button');

  contact.classList.add('contact');
  contactType.classList.add('contact__type');
  contactName.classList.add('contact__name', 'contact__name-hover');
  contactList.classList.add('contact__list', 'list-reset');
  contactInput.classList.add('contact__input');
  contactDelete.classList.add('contact__delete', 'js-tooltip');

  contactName.value = 'Телефон';
  if (window.screen.width <= 576) {
    contactInput.placeholder = 'Введите данные';
  } else contactInput.placeholder = 'Введите данные контакта';
  contactInput.type = 'text';
  contactDelete.innerHTML = svgDelete;
  contactDelete.dataset.tippyContent = 'Удалить контакт';
  tippy(contactDelete, {
    trigger: 'mouseenter',
    // maxWidth: 264,
    // interactive: true,
  });
  contactDelete.addEventListener('click', (e) => {
    e.preventDefault();
    contact.remove();
    const contacts = document.querySelectorAll('.contact');
    if (!contacts.length) document.querySelector('.modal__contact').classList.remove('modal__add-contact--active');

    document.querySelector('.modal__btn-contact').classList.add('modal__btn-contact--active');
  });


  contactInput.addEventListener('input', () => {
    if (contactInput.value) {
      contactDelete.classList.add('contact__delete--active');
    } else {
      contactDelete.classList.remove('contact__delete--active');
    }

  });

  contactType.addEventListener('mouseleave', () => {
    contactList.classList.remove('contact__list--active');
    contactType.classList.remove('contact__list--active');
  });


  let listItemsArr = [
    'Телефон',
    'Доп. телефон',
    'E-mail',
    'Vk',
    'Facebook',
    'Другое'
  ];

  function createListItem(item, btn, list, wrapper) {
    const listItem = document.createElement('li');
    listItem.classList.add('contact__item');
    listItem.textContent = item;
    listItem.addEventListener('click', function () {
      if (this.textContent === 'Другое') {
        btn.value = '';
        btn.focus();
      } else {
        btn.value = this.textContent;
        // btn.focus();
        btn.blur();
      }
      list.classList.remove('contact__list--active');
      wrapper.classList.remove('contact__list--active');
    });
    return listItem;
  }

  contactName.type = 'text';
  contactName.addEventListener('click', () => {
    contactName.blur();
    contactList.classList.toggle('contact__list--active');
    contactType.classList.toggle('contact__list--active');

  });

  for (const item of listItemsArr) {
    let listItem = createListItem(item, contactName, contactList, contactType);
    contactList.append(listItem);
  }

  contact.append(contactType, contactInput, contactDelete);
  contactType.append(contactName, contactList);

  return {
    contact,
    contactName,
    contactInput,
    contactDelete
  }
}


