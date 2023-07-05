import { createClientsForm } from "./createModalForm.js";
import { createClientItem } from "./createClientItem.js";
import { deleteClientModal } from './createDeleteModal.js';
import { createContactItem } from "./createContactItem.js";
import { getClients, sendClientData } from "./clientsApi.js";
import { deleteClientItem } from "./clientsApi.js";
import { getValidateString } from "./utilts.js";
import { validateClientForm } from "./validateForm.js";
import { validateClientContact } from "./validateContact.js";
import { render } from "./render.js";

export function editClientModal(data) {
  const editModal = document.createElement('div');
  const editModalContent = document.createElement('div');
  const editModalWrap = document.createElement('div');
  const createForm = createClientsForm();
  const titleId = document.createElement('span');

  titleId.classList.add('modal__id')
  editModal.classList.add('modal-edit', 'site-modal', 'modal-active');
  editModalWrap.classList.add('modal__wrap');
  editModalContent.classList.add('edit-modal__content', 'site-modal__content', 'modal-active');

  if (window.screen.width <= 576) {
    titleId.textContent = 'ID: ' + data.id.slice(7);
} else titleId.textContent = 'ID: ' + data.id;
  createForm.modalTitle.textContent = 'Изменить данные';
  createForm.cancelBtn.textContent = 'Удалить клиента';

  createForm.cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.deleteModal);

    deleteModal.modalClose.addEventListener('click', () => {
      document.body.style.overflow = 'hidden';
    });

    deleteModal.deleteModalBack.addEventListener('click', () => {
      document.body.style.overflow = 'hidden';
    });

    window.addEventListener('click', (e) => {
      if (e.target === deleteModal.deleteModalWrap || e.target === deleteModal.deleteModal) {
        document.body.style.overflow = 'hidden';
      }
    });

    deleteModal.deleteModalDelete.addEventListener('click', () => {
      try {
        setTimeout(() => {
         deleteClientItem(data.id);
          document.getElementById(data.id).remove();
          deleteModal.deleteModal.remove();
          editModal.remove();
          document.body.style.overflow = 'auto';
        }, 300);
      } catch (error) {
        console.log(error);
      }
    });
  });

  createForm.modalClose.addEventListener('click', () => {
    editModal.remove();
    document.body.style.overflow = 'auto';
  });

  createForm.inputName.value = data.name;
  createForm.inputSurname.value = data.surname;
  createForm.inputLastName.value = data.lastName;

  for (const contact of data.contacts) {
    const createContact = createContactItem();

    createContact.contactName.value = contact.type;
    createContact.contactInput.value = contact.value;

    if (createContact.contactInput.value) {
      createContact.contactDelete.classList.add('contact__delete--active');
    } else {
      createContact.contactDelete.classList.remove('contact__delete--active');
    }

    createForm.contactsBlock.prepend(createContact.contact);
  }

  if (data.contacts.length) createForm.contactsBlock.classList.add('modal__add-contact--active');

  if (data.contacts.length == 10) {
    createForm.addContactBtn.classList.remove('modal__btn-contact--active');
  }

  createForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(createForm.addContactBtn);
    if (!validateClientForm()) {
      createForm.form.querySelectorAll('.modal__input').forEach(input => {
        input.disabled = false;
      });
      return;
    } else {
      createForm.form.querySelectorAll('.modal__input').forEach(input => {
        input.disabled = true;
      });
    }

    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contacts = [];
    let client = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        createForm.form.querySelectorAll('.contact__name').forEach(input => {
          input.disabled = false;
        });
        createForm.form.querySelectorAll('.contact__input').forEach(input => {
          input.disabled = false;
        });
        createForm.contactsBlock.querySelectorAll('.contact__delete').forEach(button => {
          button.disabled = false;
        });
        createForm.addContactBtn.disabled = false;
        return;
      } else {
        createForm.form.querySelectorAll('.contact__name').forEach(input => {
          input.disabled = true;
        });
        createForm.form.querySelectorAll('.contact__input').forEach(input => {
          input.disabled = true;
        });
        createForm.contactsBlock.querySelectorAll('.contact__delete').forEach(button => {
          button.disabled = true;
        });
        createForm.addContactBtn.disabled = true;
      }
      contacts.push({
        type: contactTypes[i].value.trim(),
        value: contactValues[i].value.trim()
      });
    }


    client.name = getValidateString(createForm.inputName.value.trim());
    client.surname = getValidateString(createForm.inputSurname.value.trim());
    if (createForm.inputLastName.value) {
      client.lastName = getValidateString(createForm.inputLastName.value.trim())
    } else client.lastName = '';
    client.contacts = contacts;

    const spinner = document.querySelector('.modal__spinner');

    try {
      spinner.style.display = 'block';
      await sendClientData(client, 'PATCH', data.id);
      const clients = await getClients();
      setTimeout(() => {
        editModal.remove();
        document.body.style.overflow = 'auto';
        render(clients, 'id');
      }, 1500);
    } catch (error) {
      console.log(error);
    }
    finally {
      setTimeout(() => spinner.style.display = 'block', 1500);
    }
  });

  createForm.modalTitle.append(titleId);
  editModalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);
  editModalWrap.append(editModalContent);
  editModal.append(editModalWrap);

  document.addEventListener('click', (e) => {
    if (e.target == editModalWrap || e.target == editModal) {
      editModal.remove();
      document.body.style.overflow = 'auto';
    }
  });

  return {
    editModal,
    editModalContent
  }
}
