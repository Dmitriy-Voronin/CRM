import { createClientsForm } from "./createModalForm.js";
import { getClients, sendClientData } from "./clientsApi.js";
import { getValidateString } from "./utilts.js";
import { validateClientForm } from "./validateForm.js";
import { validateClientContact } from "./validateContact.js";
import { render } from "./render.js";

export function addClientModal() {
  const createForm = createClientsForm();
  const modal = document.createElement('div');
  const modalWrap = document.createElement('div');
  const modalContent = document.createElement('div');

  modal.classList.add('modal', 'site-modal', 'modal-active');
  modalWrap.classList.add('modal__wrap');
  modalContent.classList.add('modal__content', 'site-modal__content', 'modal-active');
  createForm.form.classList.add('add-client');

  modalWrap.append(modalContent);
  modal.append(modalWrap);
  modalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);

  createForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateClientForm()) {
      return;
    } else {
      createForm.form.querySelectorAll('.modal__input').forEach(input => {
        input.disabled = true;
      });
      createForm.form.querySelectorAll('.contact__name').forEach(input => {
        input.disabled = true;
      });
      createForm.contactsBlock.querySelectorAll('.contact__delete ').forEach(button => {
        button.disabled = true;
      });
    }
    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contacts = [];
    let clientObj = {};

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

    clientObj.surname = getValidateString(createForm.inputSurname.value.trim());
    clientObj.name = getValidateString(createForm.inputName.value.trim());
    if (createForm.inputLastName.value) clientObj.lastName = getValidateString(createForm.inputLastName.value.trim());
    clientObj.contacts = contacts;

    const spinner = document.querySelector('.modal__spinner');

    try {
      spinner.style.display = 'block';
      await sendClientData(clientObj, 'POST');
      const clients = await getClients();
      setTimeout(() => {
        modal.remove();
        render(clients, 'id');
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => spinner.style.display = 'block', 1500);
    }
  });
  createForm.modalClose.addEventListener('click', () => {
    modal.remove();
    document.body.style.overflow = 'auto';
  });

  createForm.cancelBtn.addEventListener('click', () => {
    modal.remove();
    document.body.style.overflow = 'auto';
  });

  document.addEventListener('click', (e) => {
    if (e.target == modalWrap || e.target == modal) {
      modal.remove();
      document.body.style.overflow = 'auto';
    }
  });

  return modal;

}

