//import "./index.css";

// ПЕРЕМЕННЫЕ 
const formButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.edit__button');
const popup = document.querySelector('.popup');
const avatar = document.querySelector('.user-info__photo');
let userId = '';

// Взаимодействия с сервером
const api = new Api({
  link: "http://95.216.175.5/cohort6",
  token: 'bcfb843c-3935-4485-8bf6-145f7aa5fc64'
});

// Добавление карточек в галлерею
const cardsList = new CardList({
  container: document.querySelector(".places-list"),

  createCard: function (name, link, likes, cardId, ownerId) {
    return newCard(name, link, likes, cardId, ownerId)
  },

  initialCards: function () {
    return api.getInitialCards()
  }
});

// Проверка валидности введеных данных
const validation = new Validation({
  requiredField: "Это обязательное поле",
  linkPlace: "Здесь должна быть ссылка",
  wrongLength: "Должно быть от 2 до 30 символов"
});

// Попап для обновления аватара пользователя
const newAvatar = new RefreshAvatar({
  content: changeAvatar,
  avatar: avatar,
  validation: function (form) { validation.popupFormDefault(form) },
  changeAvatar: function (url) {
    return api.refreshAvatar(url);
  }
});
newAvatar.render();

// Попап для добавления карточек
const newCardPopup = new PopupNewCard({
  content: popupAddCard,

  validation: function (form) { validation.popupFormDefault(form) },

  addCard: function (name, link, likes, cardId, ownerId) {
    cardsList.addCard(newCard(name, link, likes, cardId, ownerId))
  },

  callback: function (name, link) {
    return api.postNewCard(name, link)
  }
});
newCardPopup.render();

// Попап для редактирования профиля
const editPopup = new PopupEditProfile({
  content: popupEditProfile,
  validation: function (form) { validation.popupFormDefault(form) },
  callback: function (name, about) {
    return api.changeUserInfo(name, about)
  }
});
editPopup.render();

// Попап для увеличенного изображения
const imagePopup = new Popup({
  content: popupOpenImage,
});
imagePopup.render();

// ФУНКЦИИ

// Функция для загрузки информации о пользователе
function renderInfo() {
  const name = document.querySelector('.user-info__name');
  const about = document.querySelector('.user-info__job');
  const avatar = document.querySelector('.user-info__photo');
  api.getUserInfo()
    .then((res) => {
      userId = res._id;
      name.textContent = res.name;
      about.textContent = res.about;
      avatar.style = `background-image: url(${res.avatar})`;
    });
}

// Функция, возвращающая экземпляр класса Card
function newCard(name, link, likes, cardId, ownerId) {
  //Можно лучше: В качестве параметров передавайте в шаблон карточки не переменные а объект
  // если вы в ходе развития проекта захотите добавить переменных, то вам придётся менять код во многих местах _
  return new Card({
    name: name,
    link: link,
    likes: likes,
    cardId: cardId,
    ownerId: ownerId,
    user: userId,
    popupElement: imagePopup.popupElement,

    putLike: function (id) {
      return api.putLike(id);
    },

    deleteLike: function (id) {
      return api.removeLike(id);
    },

    deleteCard: function (ip) {
      return api.removeCard(ip);
    },
    openImage: function () {
      imagePopup.open();
    }
  }).render()
}

// СЛУШАТЕЛИ СОБЫТИЙ И ВЫЗОВЫ ФУНКЦИЙ

// Загрузка информации о пользователе
renderInfo();

// Заполнение галлереи первоначальным набором карточек
cardsList.addDefaultCards();

// Открытие попапа по нажатию на кнопку
formButton.addEventListener('click', newCardPopup.open);
editButton.addEventListener('click', editPopup.open);
avatar.addEventListener('click', newAvatar.open);
/**
 * Шикарная работа. Видно что вы потрудились основательно.
 *
 * Проработали каждый метод, каждый класс
 *  Я могу только добавить что вам бы вынести конечно в отдельный config файл вот это
 * link: "http://95.216.175.5/cohort6",
  *  token: 'bcfb843c-3935-4485-8bf6-145f7aa5fc64'
  *
  * Работа принимается
 *
 */