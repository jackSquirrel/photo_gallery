import "../images/close.svg";

// Попап добавления карточек
const popupAddCard = `<div class="popup__content">
  <img src="./images/close.svg" alt="" class="popup__close">
  <h3 class="popup__title">Новое место</h3>
  <form class="popup__form" name="new" novalidate>
      <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Название" required>
      <span id = "name" class = "popup__error"></span>
      <input type="url" name="link" class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку" required>
      <span id = "link" class = "popup__error"></span>
      <button type class="button popup__button add__button">+</button>
  </form>
</div>`;

// Попап редактирования профиля
const popupEditProfile = `<div class="popup__content">
<img src="./images/close.svg" alt="" class="popup__close">
<h3 class="popup__title">Редактировать профиль</h3>
<form class="popup__form" name="edit" novalidate>
    <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Имя" required>
    <span id = "name" class = "popup__error"></span>
    <input type="text" name="info" class="popup__input popup__input_type_info" placeholder="О себе" required>
    <span id = "info" class = "popup__error"></span>
    <button type class="button popup__button save__button active__button">Сохранить</button>
</form>
</div>`;

// Попап с открытой картинкой
const popupOpenImage = `<div class="image__content">
<img src="./images/close.svg" alt="" class="popup__close">
<img class="image__opened">
</div>`;

// Попап для изменения автара
const changeAvatar = `<div class="popup__content">
<img src="./images/close.svg" alt="" class="popup__close">
<h3 class="popup__title">Обновить аватар</h3>
<form class="popup__form" name="avatar" novalidate>
    <input type="url" name="link" class="popup__input popup__input_type_link-url" placeholder="Ссылка на аватар" required>
    <span id = "link" class = "popup__error"></span>
    <button type class="button popup__button save__button">Сохранить</button>
</form>
</div>`

export {popupAddCard, popupEditProfile, popupOpenImage, changeAvatar};