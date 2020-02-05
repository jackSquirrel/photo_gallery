export default class PopupNewCard extends Popup {
    constructor(props){
        super(props);
        this._validation = props.validation;
        this._cardListAdd = props.addCard;
        this._addCard = this._addCard.bind(this);
        this._newCallback = props.callback;
    }

    // Открытие Popup
    open(event){
        popup.classList.add('popup_is-opened');
        popup.appendChild(this.popupElement);
        this._popupSettings();
    }

    // Добавление новой карточки
    _addCard(event){
        event.preventDefault();
        this.popupElement.querySelector('.popup__button').textContent = 'Загрузка...';

        this._newCallback(this.popupForm.elements.name.value, this.popupForm.elements.link.value)
            .then((res)=>{
                this._cardListAdd(res.name, res.link, res.likes, res._id, res.owner._id); 
            });
        this.close();
        this.popupElement.querySelector('.popup__button').textContent = '+';
    }

    // Начальный вид при открытии
    _popupSettings(){
        this._validation(this.popupForm);
        this.popupElement.querySelector('.popup__button').setAttribute('disabled', true);
        this.popupElement.querySelector('.popup__button').classList.remove('active__button');
    }

    // установка слушателей событий
    _setEventListeners(){
        this.popupElement.querySelector('.popup__close').addEventListener('click', this.close);
        this.popupForm.addEventListener('submit', this._addCard);
    }
}