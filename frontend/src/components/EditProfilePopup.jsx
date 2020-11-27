import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../context/CurrentUserContext';


function EditProfilePopup(props) {

	const currentUser = React.useContext(CurrentUserContext); // подписываем на контекст
	
	const [inputValue , setInputValue] = React.useState({
			name: '',
			about: ''
		});

		useEffect(() => {
					setInputValue({
						name : currentUser ? currentUser.name : '',
						about : currentUser ? currentUser.about : ''
					});
		}, [currentUser]);


	function handleChange(event) {
		const {name, value} = event.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	}


	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		// Передаём значения управляемых компонентов во внешний обработчик
		props.onUpdateUser(inputValue);
	} 


return(
	<PopupWithForm 
		name = "edit"
		title = "Редактировать профиль"
		submitText = "Сохранить"
		onSubmit={handleSubmit}
		isOpen = {props.isOpen}
		onClose = {props.onClose}>
		<input value={inputValue.name} type="text" className="form__edt-text" name="name" minLength="2" maxLength="40" required placeholder="Имя" onChange={handleChange} />
		<span id="name-error" className="form__error"></span>
		<input value={inputValue.about} type="text" className="form__edt-text" name="about" minLength="2" maxLength="200" required placeholder="О себе" onChange={handleChange} />
		<span id="about-error" className="form__error"></span>
</PopupWithForm>

	);


}

export default EditProfilePopup;