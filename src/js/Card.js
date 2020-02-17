export default class Card {
    constructor(props){
      this._name = props.name;
      this._link = props.link;
      this._cardId = props.cardId;
      this._ownerId = props.ownerId;    
      this._likes = props.likes;
      this._openImage = props.openImage;
      this._popupElement = props.popupElement;
      this._currentUser = props.user;
      this._deleteCard = props.deleteCard;
      this._putLike = props.putLike;
      this._deleteLike = props.deleteLike;
      this._element = null;
      this._remove = this._remove.bind(this);
      this._like = this._like.bind(this);
      this._onClick = this._onClick.bind(this);
    }
  
    _like(event){
      // убрать лайк с карточки
      if(event.target.classList.contains('place-card__like-icon_liked')){
        this._deleteLike(this._cardId)
          .then((res)=>{
            event.target.classList.remove('place-card__like-icon_liked');
            this._element.querySelector('.place-card__count-of-likes').textContent = res.likes.length;
          });
      }
      // добавить лайк на карточку
      else {
        this._putLike(this._cardId)
          .then((res)=>{
            event.target.classList.add('place-card__like-icon_liked');
            this._element.querySelector('.place-card__count-of-likes').textContent = res.likes.length;
          });
      }
    }
  
      // удалить карточку
    _remove(){
      if(window.confirm('Вы действительно хотите удалить эту карточку?')){
        this._deleteCard(this._cardId)
        .then(()=>{
          this._removeEventListeners();
          this._element.remove();
        })
      }
    }

      // открыть картинку в полном размере
    _onClick(event){
        if(!event.target.classList.contains('place-card__delete-icon')){
            this._openImage();
            this._popupElement.querySelector('.image__opened').src = this._link;
        }
    }
  
      // установка слушателей событий
    _setEventListeners(){
      this._element.querySelector('.place-card__like-icon').addEventListener('click', this._like);
      this._element.querySelector('.place-card__delete-icon').addEventListener('click', this._remove);
      this._element.querySelector('.place-card__image').addEventListener('click', this._onClick);
    }
  
      // удаление слушателей событий
    _removeEventListeners(){
      this._element.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
      this._element.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
      this._element.querySelector('.place-card__image').removeEventListener('click', this._onClick);
    }
  
      // разметка карточки
    _template(){
      return `<div class="place-card">
        <div class="place-card__image" style="background-image: url('${this._link}')">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">${this._name}</h3>
          <div class="place-card__likes">
            <button class="place-card__like-icon"></button>
            <p class="place-card__count-of-likes">${this._likes.length}</p>
          </div>
          </div>
        </div>`;
    }
  
      // DOM разметка карточки
    _create(markup){
      const newTag = document.createElement('div');
      newTag.innerHTML = markup;
      return newTag.firstChild;
    }
  
      // Загрузка карточки
    render(){
      this._element = this._create(this._template());
      if(this._currentUser !== this._ownerId){
        this._element.querySelector('.place-card__delete-icon').style = "display: none;"
      }
      if(this._likes.some((el)=>{
        if(el._id === this._currentUser){
          return true;
        }
        return false;
      })){
        this._element.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
      }
      this._setEventListeners();
      return this._element;
    }
  }