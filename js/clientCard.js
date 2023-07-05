// import { editClientModal } from "./editClient.js";
import { getClientById } from "./clientsApi.js";
import { createClientsForm } from "./createModalForm.js";

function getClientId() {
  const paramsString = document.location.search;
  const searchParams = new URLSearchParams(paramsString);
  let postId = searchParams.get("id");
  return postId;
}

function createCardContactItem() {
  const contact = document.createElement('div');
  const contactType = document.createElement('div');
  const contactName = document.createElement('input');
  const contactInput = document.createElement('input');

  contact.classList.add('contact');
  contactType.classList.add('contact__type');
  contactName.classList.add('contact__name');
  contactInput.classList.add('contact__input');

  contact.append(contactType, contactInput);
  contactType.append(contactName);

  return {
    contact,
    contactName,
    contactInput,
  }
}

function editClientModal(data) {
  const editModal = document.createElement('div');
  const editModalContent = document.createElement('div');
  const editModalWrap = document.createElement('div');
  const createForm = createClientsForm();
  const titleId = document.createElement('span');

  titleId.classList.add('modal__id')
  editModal.classList.add('modal-edit', 'site-modal', 'modal-active');
  editModalWrap.classList.add('modal__wrap');
  editModalContent.classList.add('edit-modal__content', 'site-modal__content', 'modal-active');
  editModal.style.cursor = 'auto';
  editModalWrap.style.cursor = 'auto';

  titleId.textContent = 'ID: ' + data.id;
  createForm.modalTitle.textContent = 'Карточка клиента';
  createForm.contactsBlock.classList.add('modal__add-contact--active');
  createForm.modalClose.style.display = 'none';
  createForm.cancelBtn.style.display = 'none';
  createForm.addContactBtn.style.display = 'none';
  createForm.saveBtn.style.display = 'none';



  createForm.inputName.value = data.name;
  createForm.inputSurname.value = data.surname;
  createForm.inputLastName.value = data.lastName;

  createForm.inputName.disabled = true;
  createForm.inputSurname.disabled = true;
  createForm.inputLastName.disabled = true;

  for (const contact of data.contacts) {
    const createContact = createCardContactItem();

    createContact.contactName.value = contact.type;
    createContact.contactInput.value = contact.value;

    createContact.contactName.disabled = true;
    createContact.contactName.style.cursor = 'auto';
    createContact.contactInput.disabled = true;


    createForm.contactsBlock.prepend(createContact.contact);
  }


  createForm.modalTitle.append(titleId);
  editModalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);
  editModalWrap.append(editModalContent);
  editModal.append(editModalWrap);


  return {
    editModal,
    editModalContent
  }
}

async function createClientCard() {
  const clientId = getClientId();
  const clientData = await getClientById(clientId);
  const clientCard = editClientModal(clientData);
  console.log(clientCard);
  document.body.style.overflow = 'hidden';
  document.body.prepend(clientCard.editModal);

}

createClientCard();

