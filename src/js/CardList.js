export default class CardList {
  constructor(props) {
    this._container = props.container;
    this._initialCards = props.initialCards;
    this._createCard = props.createCard;
    this.addCard = this.addCard.bind(this);
    this._createCard = this._createCard.bind(this);
    this.addDefaultCards = this.addDefaultCards.bind(this);
  }

  // Добавление новой карточки в галлерею
  addCard(card) {
    this._container.appendChild(card);
  }

  // Добавление в галлерею первоначального набора карточек
  addDefaultCards() {
    this._initialCards()
      .then((res) => {
        res.forEach((card) => {
          this.addCard(this._createCard(card.name, card.link, card.likes, card._id, card.owner._id));
        });
      })
  }
}