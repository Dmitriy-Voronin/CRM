

export async function getClients() {
  try {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'GET'
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function sendClientData(client, method, id = null) {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/${method === 'POST' ? '' : id}`, {
      method,
      body: JSON.stringify(client)
    });

    if (response.status === 404 || response.status === 422 || response.status >= 500) {
      if (response.statusText !== '') {
        const error = document.querySelector('.modal__error');
        error.textContent = response.statusText;
      }
    } else if (response.status === 200 || response.status === 201) {
      const result = await response.json();
      return result;
    } else error.textContent = 'Что-то пошло не так...';

  } catch (error) {
    error.textContent = 'Что-то пошло не так...';
  }
}

export async function deleteClientItem(id) {
  try {
    await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getClientById(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function findClient(value) {
  try {
    const response = await fetch(`http://localhost:3000/api/clients?search=${value}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}
