import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props) {
	const [inputValue , setInputValue] = React.useState({
			name: '',
			link: ''
		});

		

	function handleChange (event) {
		const {name, value} = event.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	}

	function handleSubmit (e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		// Передаём значения управляемых компонентов во внешний обработчик
		props.onAddPlace(inputValue);

		setTimeout(() =>{
			setInputValue({
				name:'',
				link:''
			});
		}, 3000);
		
	}

	
	return(
			<PopupWithForm 
			name = "add"
			title = "Новое место"
			submitText = "Создать"
			isOpen = {props.isOpen}
			onSubmit={handleSubmit}
			onClose = {props.onClose}>
						<input type="text" value={inputValue.name}  className="form__edt-text" name="name" placeholder="Название" required minLength="1" maxLength="30" onChange={handleChange} />
						<span id="name-error" className="form__error"></span>
						<input value={inputValue.link}  className="form__edt-text" name="link" placeholder="Ссылка на картинку" required type="url" pattern="https://.*" onChange={handleChange} />
						<span id="link-error" className="form__error"></span>
			</PopupWithForm>
				
		);

}

export default AddPlacePopup;
