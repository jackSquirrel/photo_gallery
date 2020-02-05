export default class Api{
    constructor(props){
        this._link = props.link;
        this._token = props.token;
    }

    // Получение информации о пользователе с сервера
    getUserInfo(){
        return fetch(`${this._link}/users/me`, {
            headers: {
                authorization: this._token
            }})
            .then((res)=>{
                if(res.ok){
                    return res.json();
                }
                return Promise.reject(res.status); 
            })
            .catch((err)=>{
                console.log(`Ошибка: ${err}`);
            })
    }

    // Получение первоначального набора карточек с сервера
    getInitialCards(){
        return fetch(`${this._link}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .catch((err)=>{
            console.log(`Ошибка: ${err}`);
        })
    }

    // Изменение информации о пользователе на сервере
    changeUserInfo(name, about){
        return fetch(`${this._link}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .catch((err)=>{
            console.log(`Ошибка: ${err}`);
        })
    }

    // Загрузка новой карточки на сервер
    postNewCard(name, link){
        return fetch(`${this._link}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .catch((err)=>{
            console.log(`Ошибка: ${err}`);
        })
    }

    // Удаление карточки с сервера
    removeCard(id){
        return fetch(`${this._link}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .catch((err)=>{
            console.log(`Ошибка: ${err}`);
        })
    }

    // Добавление пользователя в массив лайкнувших
    putLike(id){
        return fetch(`${this._link}/cards/like/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .catch((err)=>{
            console.log(`Ошибка: ${err}`);
        })
    }

    // Удаление пользователя из массива лайкнувших
    removeLike(id){
        return fetch(`${this._link}/cards/like/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .catch((err)=>{
            console.log(`Ошибка: ${err}`);
        })
    }

    // Обновление аватара пользователя
    refreshAvatar(url){
        return fetch(`${this._link}/users/me/avatar`, {
            method: 'PATCH',
            headers:{
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: url
            })
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .catch((err)=>{
            console.log(`Ошибка: ${err}`);
        })
    }
}