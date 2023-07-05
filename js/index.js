// (() => {

import { createClientsHeader } from "./createClientsHeader.js";
import { createClientsSection } from "./createClientSection.js";
import { getClients } from "./clientsApi.js";
import { render } from "./render.js";
import { searchClients } from "./searchClients.js";
import { sortTable } from "./sortClientsTable.js";


async function createApp() {
  const header = createClientsHeader();
  const clientSection = createClientsSection();
  document.body.append(header.header, clientSection.main);
  const clients = await getClients();
  try {
    render(clients, 'id');
  } catch (error) {
    console.log(error);
  }
}

createApp();
sortTable();
searchClients();
