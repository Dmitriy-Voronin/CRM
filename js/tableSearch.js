export function tableSearch(value, tbody) {
  let regPhrase = new RegExp(value, 'i');
  let flag = false;
  for (let i = 0; i < tbody.rows.length; i++) {
    flag = regPhrase.test(tbody.rows[i].cells[1].innerHTML);

    if (flag) {
      tbody.rows[i].style.backgroundColor = "var(--color-mischka)";
      tbody.rows[i].scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
    } else {
      tbody.rows[i].style.backgroundColor = "inherit";
    }
  }
}
