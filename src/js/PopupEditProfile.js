export  default class PopupEditProfile extends Popup {
    constructor(props){
        super(props);
        this.validation = props.validation;
        this._editProfile = this._editProfile.bind(this);
        this._editCallback = props.callback;
    }

    // Открытие Popupa
    open(event){
        popup.classList.add('popup_is-opened');
        popup.appendChild(this.popupElement);
        this._popupSettings();
    }

    // Редактирование профиля 
    _editProfile(){
        event.preventDefault();
        this.popupElement.querySelector('.button').textContent = 'Идёт загрузка...';
        const name = document.querySelector('.user-info__name');
        const info = document.querySelector('.user-info__job');
        this._editCallback(this.popupForm.elements.name.value, this.popupForm.elements.info.value)
            .then((res)=>{
                name.textContent = res.name;
                info.textContent = res.about;
            });        
        this.close();
        this.popupElement.querySelector('.button').textContent = 'Сохранить';
    }

    // Начальный вид при открытии
    _popupSettings(){
        this.validation(this.popupForm);
        this.popupForm.elements.name.value = document.querySelector('.user-info__name').textContent;
        this.popupForm.elements.info.value = document.querySelector('.user-info__job').textContent;
    }

    // Установка слушателей событий
    _setEventListeners(){
        this.popupElement.querySelector('.popup__close').addEventListener('click', this.close);
        this.popupForm.addEventListener('submit', this._editProfile);
    }
}