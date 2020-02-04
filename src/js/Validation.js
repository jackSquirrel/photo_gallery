class Validation {
  constructor(messages) {
    this.messages = messages;
  }

  popupFormDefault(form) {
    Array.from(form.elements).forEach(element => {
      element.value = '';
    });

    form.addEventListener('input', () => {
      this._validButton(form);
    });

    this._resetError(form);
    this._setEventListeners(form);
  }

  // Сбрасывание ошибок валидации при новом открытии попапа
  _resetError(form) {
    const errorList = Array.from(form.querySelectorAll(".popup__error"));
    errorList.forEach((error) => {
      error.classList.remove('popup__is-not-valid');
      error.textContent = '';
    })
  }

  // Установка валидации на все поля ввода в форме попапа
  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(".popup__input"));

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._elementValidity(form, input);
      });
    });
  }

  // Вывод текста ошибки при неправильных действиях пользователя
  _elementValidity(form, inputElement) {
    const error = form.querySelector(`#${inputElement.name}`);
    /* Можно лучше: удалите else а внутри условия добавьте return
     например было: 
     if(условие){  
       // ваш код 
     } else if(условие2){ 
       // ваш код 
     } 
     стало : 
     if(условие){  
         // ваш код 
      return; 
    } 
   
     if(условие2){ 
      // ваш код 
      return; 
    } 
   
  */

    // можно лучше: Для валидации используйте кастомный метод validation
    // https: //developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity() 
    if (inputElement.validity.valueMissing) {
      error.classList.add('popup__is-not-valid');
      error.textContent = this.messages.requiredField;
    } else if (inputElement.validity.typeMismatch) {
      error.classList.add('popup__is-not-valid');
      error.textContent = this.messages.linkPlace;
    } else if ((inputElement.value.length < 2 || inputElement.value.length > 30) && inputElement.type !== "url") {
      error.classList.add('popup__is-not-valid');
      error.textContent = this.messages.wrongLength;
    } else {
      error.classList.remove('popup__is-not-valid');
      error.textContent = "";
    }
  }

  // Является ли элемент попапа валидным 
  _checkElementValidity(element) {
    if (element.validity.valid && element.type === "url") {
      return true;
    }
    if (!(element.validity.valid) || element.value.length < 2 || element.value.length > 30) {
      return false;
    }
    return true;
  }

  // Неактивная кнопка submit
  _disableButton(button) {
    button.classList.remove('active__button');
    button.setAttribute('disabled', 'disabled');
  }

  // Активная кнопка submit
  _activeButton(button) {
    button.classList.add('active__button');
    button.removeAttribute('disabled');
  }

  // Все ли поля формы прошли условия валидации
  _validButton(form) {
    const button = form.querySelector('.popup__button');
    const inputList = Array.from(form.querySelectorAll('.popup__input'));

    let isButtonActive = true;

    inputList.forEach((input) => {
      if (!this._checkElementValidity(input)) isButtonActive = false;
    });

    if (!isButtonActive) {
      this._disableButton(button);
    } else {
      this._activeButton(button);
    }
  }
}