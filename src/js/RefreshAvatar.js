import Popup from "./Popup";
import {popup} from "../index";

export default class RefreshAvatar extends Popup {
    constructor(props){
        super(props);
        this._validation = props.validation;
        this._avatar = props.avatar;
        this._newAvatar = props.changeAvatar;
        this._changeAvatar = this._changeAvatar.bind(this);
    }

    // Открытие Popupa
    open(event){
        popup.classList.add('popup_is-opened');
        popup.appendChild(this.popupElement);
        this._popupSettings();
    }

    // Начальный вид при открытии
    _popupSettings(){
        this._validation(this.popupForm);
        this.popupElement.querySelector('.popup__button').setAttribute('disabled', true);
        this.popupElement.querySelector('.popup__button').classList.remove('active__button');
    }

    // Установка слушателей событий
    _setEventListeners(){
        this.popupElement.querySelector('.popup__close').addEventListener('click', this.close);
        this.popupForm.addEventListener('submit', this._changeAvatar);
    }

    // Изменение аватара
    _changeAvatar(event){
        event.preventDefault();
        this._newAvatar(this.popupForm.elements.link.value)
            .then((res)=>{
                this._avatar.style.backgroundImage = `url('${res.avatar}')`;
            });
        this.close();
    }
}