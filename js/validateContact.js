export function validateClientContact(contactType, contactInput) {
  const error = document.querySelector('.modal__error');
  const onlyNumbers = /[\+7]\s\([\d]{3}\)\s[\d]{3}\-[\d]{2}\-[\d]{2}/;
  const onlyEmail = /[\w\d]+@[\w\d]+\.\w+/;

  contactInput.addEventListener('input', () => {
    contactInput.style.borderColor = 'var(--color-gray-suit)';
    document.querySelector('.contact__delete ').disabled = false;
    error.textContent = '';
  });

  contactInput.oncut = contactInput.oncopy = contactInput.onpaste = () => {
    contactInput.style.borderColor = 'var(--color-gray-suit)';
    document.querySelector('.contact__delete ').disabled = false;
    error.textContent = '';
  };


  function showErrorMessage(message, block, input) {
    block.textContent = message;
    input.style.borderColor = 'var(--color-burnt-sienna)';
  };


  if (!contactInput.value) {
    showErrorMessage('Заполните все поля контактов!', error, contactInput);
    return false;
  }


  switch (contactType.value) {
    case 'Телефон' || 'Доп. телефон':
      if (!onlyNumbers.test(contactInput.value) || contactInput.value.length !== 18) {
        showErrorMessage('Номер должен быть в формате +7 (999) 999-99-99!', error, contactInput);
        console.log(contactInput.value.length, onlyNumbers.test(contactInput.value));
        return false;
      }
      return true;

    case 'E-mail':
      if (!onlyEmail.test(contactInput.value)) {
        showErrorMessage('Непарвильный E-mail!', error, contactInput);
        return false;
      }

      return true;
    default:
      return true;
  }
};
