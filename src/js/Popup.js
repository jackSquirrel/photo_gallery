import {popup} from "../index";

export default class Popup {
    constructor(props) {
        this._content = props.content;
        this.popupElement = null;
        this.popupForm = null;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    // Создание Попапа
    _createPopup(content) {
        const newTag = document.createElement('div');
        newTag.innerHTML = content;
        return newTag.firstChild;
    }

    // Закрытие Попапа
    close() {
        popup.removeChild(this.popupElement);
        popup.classList.remove('popup_is-opened');
    }

    // Открытие Попапа
    open(event) {
        popup.classList.add('popup_is-opened');
        popup.appendChild(this.popupElement);
    }

    // Установка слушателей событий
    _setEventListeners() {
        this.popupElement.querySelector('.popup__close').addEventListener('click', this.close);
    }

    // Загрузка Попапа
    render() {
        this.popupElement = this._createPopup(this._content);
        this.popupForm = this.popupElement.querySelector('.popup__form') || null;
        this._setEventListeners();
        return this.popupElement;
    }
}