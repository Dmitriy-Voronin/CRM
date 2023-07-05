import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { deleteClientItem } from "./clientsApi.js";
import { getClientById } from "./clientsApi.js";
import { getFio } from "./utilts.js";
import { createContactItemByType } from "./utilts.js";
import { svgSpinner } from "./svg.js";
import { svgMoreIcons } from "./svg.js";


export function createClientItem(data) {
  const clientTr = document.createElement('tr');
  const clientIdTd = document.createElement('td');
  const clientId = document.createElement('span');
  const clientFullName = document.createElement('td');
  const clientLink = document.createElement('a');
  const clientCreated = document.createElement('td');
  const createDate = document.createElement('span');
  const createdTime = document.createElement('span');
  const clientChanged = document.createElement('td');
  const changedDate = document.createElement('span');
  const changedTime = document.createElement('span');
  const clientContacts = document.createElement('td');
  const clientActions = document.createElement('td');
  const clientEdit = document.createElement('button');
  const clientDelete = document.createElement('button');
  const deleteClient = deleteClientModal();

  const moreIcons = document.createElement('button');
  const moreIconsCount = document.createElement('span');

  const editSpinner = document.createElement('span');
  const deleteSpinner = document.createElement('span');

  moreIcons.classList.add('btn-reset', 'btn');
  moreIconsCount.classList.add('contacts__count');
  moreIcons.innerHTML = svgMoreIcons;

  clientLink.classList.add('client__link');
  editSpinner.classList.add('actions__spinner');
  deleteSpinner.classList.add('actions__spinner');
  clientTr.classList.add('clients__item');
  clientTr.id = data.id;
  clientIdTd.classList.add('client__id', 'clients__td');
  clientFullName.classList.add('clients__full-name', 'clients__td');
  clientCreated.classList.add('clients__created', 'clients__td');
  createDate.classList.add('created__date');
  createdTime.classList.add('created__time');
  clientChanged.classList.add('clients__changed', 'clients__td');
  changedDate.classList.add('changed__date');
  changedTime.classList.add('changed__time');
  clientContacts.classList.add('clients__contacts', 'clients__td');
  clientActions.classList.add('clients__actions', 'clients__td');
  clientContacts.classList.add('clients__contacts');
  clientDelete.classList.add('clients__delete', 'btn-reset');
  clientEdit.classList.add('clients__edit', 'btn-reset');

  let contactsIconArr = [];

    for (let i = data.contacts.length - 1; i >= 0; i--) {
      let itemContactIcon = createContactItemByType(data.contacts[i].type, data.contacts[i].value);
      contactsIconArr.push(itemContactIcon);
      clientContacts.append(itemContactIcon);
    }
    if (contactsIconArr.length > 4) {
      moreIcons.append(moreIconsCount);
      moreIconsCount.textContent = `+${contactsIconArr.length - 4}`;
      clientContacts.append(moreIcons);
    }
    moreIcons.addEventListener('click', () => {
      contactsIconArr.forEach(contact => contact.style.display = 'inline-flex');
      if (contactsIconArr.length > 5) {
        contactsIconArr.forEach(contact => contact.classList.add('visible'));
        clientContacts.classList.add('active');
      }
      moreIcons.style.display = 'none';
    })

  clientDelete.addEventListener('click', () => {

    deleteSpinner.style.display = 'block';
    clientDelete.classList.add('action-wait');

    setTimeout(() => {
      document.body.style.overflow = 'hidden';
      document.body.append(deleteClient.deleteModal);
      deleteClient.deleteModalDelete.addEventListener('click', () => {
        try {
          setTimeout(() => {
            deleteClientItem(data.id);
            document.getElementById(data.id).remove();
            deleteClient.deleteModal.remove();
            document.body.style.overflow = 'auto';
          }, 300);
        } catch (error) {
          console.log(error);
        }
      });

      deleteSpinner.style.display = 'none';
      clientDelete.classList.remove('action-wait');
    }, 700);
  });

  clientEdit.addEventListener('click', async () => {

    const clientData = await getClientById(data.id);
    const editClient = editClientModal(clientData);

    editSpinner.style.display = 'block';
    clientEdit.classList.add('action-wait');

    setTimeout(() => {
      document.body.append(editClient.editModal);
      document.body.style.overflow = 'hidden';

      editSpinner.style.display = 'none';
      clientEdit.classList.remove('action-wait');
    }, 700);
  });

  deleteSpinner.innerHTML = svgSpinner;
  editSpinner.innerHTML = svgSpinner;
  clientIdTd.id = data.id;
  clientId.textContent = data.id.slice(7);
  clientLink.href = `clientCard.html?id=${data.id}`;
  clientLink.target = 'blank';
  clientLink.textContent = getFio(data);
  clientEdit.textContent = 'Изменить';
  clientDelete.textContent = 'Удалить';
  createDate.textContent = new Date(Date.parse(data.createdAt)).toLocaleDateString();
  createdTime.textContent = new Date(Date.parse(data.createdAt)).toLocaleTimeString().slice(0, -3);
  changedDate.textContent = new Date(Date.parse(data.updatedAt)).toLocaleDateString();
  changedTime.textContent = new Date(Date.parse(data.updatedAt)).toLocaleTimeString().slice(0, -3);

  clientIdTd.append(clientId);
  clientFullName.append(clientLink);
  clientCreated.append(createDate, createdTime);
  clientChanged.append(changedDate, changedTime);
  clientDelete.append(deleteSpinner);
  clientEdit.append(editSpinner);
  clientActions.append(clientEdit, clientDelete);
  clientTr.append(
    clientIdTd,
    clientFullName,
    clientCreated,
    clientChanged,
    clientContacts,
    clientActions
  );

  return clientTr;
}
