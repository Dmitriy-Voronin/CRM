export function validateClientForm () {
    const userName = document.getElementById('floatingName');
    const userSurname = document.getElementById('floatingSurname');
    const userLastName = document.getElementById('floatingLastName');
    const error = document.querySelector('.modal__error');
    const regexp = /[^а-яА-ЯёЁ]+$/g;

    const inputs = document.querySelectorAll('.modal__input');

    inputs.forEach(input => {
      input.addEventListener('input', () => {
            input.style.borderColor = 'var(--color-gray-suit)';
              error.textContent = '';
      });

            input.oncut = input.oncopy = input.onpaste = () => {
              input.style.borderColor = 'var(--color-gray-suit)';
                error.textContent = '';
          };

          input.onchange = () => {
              input.style.borderColor = 'var(--color-gray-suit)';

              if (userSurname.value && userName.value && userLastName.value) {
                    error.textContent = '';
              }
          }
        });


    function checkRequiredName(input, errorBlock, name) {
        if (!input.value) {
            input.style.borderColor = 'var(--color-burnt-sienna)';
            errorBlock.textContent = `Введите ${name} клиента!`;
            return false;
        } else {
          errorBlock.textContent = '';
        }

        return true;
    };

    function checkByRegexp(input, regexp) {
        if (regexp.test(input.value)) {
            input.style.borderColor = 'var(--color-burnt-sienna)';
            error.textContent = 'Недопустимые символы!';
            return false;
        }

        return true;
    };

    function checkByLength(input, name) {
      if (input.value && input.value.length < 2) {
          input.style.borderColor = 'var(--color-burnt-sienna)';
          error.textContent = `Длина ${name} должна быть не менее 2 символов!`;
          return false;
      }

      return true;
  };

    if (!checkRequiredName(userSurname, error, 'фамилию')) return false;
    if (!checkRequiredName(userName, error, 'имя')) return false;
    if (!checkByLength(userSurname, 'фамилии')) return false;
    if (!checkByLength(userName, 'имени')) return false;
    if (!checkByLength(userLastName, 'отчества')) return false;
    if (!checkByRegexp(userName, regexp)) return false;
    if (!checkByRegexp(userSurname, regexp)) return false;
    if (!checkByRegexp(userLastName, regexp)) return false;

    return true;
}
