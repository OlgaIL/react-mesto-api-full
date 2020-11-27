import React from 'react';
import Form from './Form';


function Login (props) {

	const [inputValue , setInputValue] = React.useState({
			email: '',
			password: ''
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
		const { email, password } = inputValue;
		if (!email || !password){
			return;
		}
	
		props.onLogin(password, email);

		setTimeout(() =>{ 
			setInputValue({
				email:'',
				password:''
			});
		}, 3000);

	}


	return (
		<main className="content__form">

		<Form 
			name = "login"
			title = "Вход"
			submitText = "Войти"
			isOpen = {props.isOpen}
			onSubmit={handleSubmit}
			>
						<input type="email" value={inputValue.email}  className="form__edt-text form__edt-text_theme_dark" name="email" placeholder="E-mail" required minLength="1" maxLength="30" onChange={handleChange} />
						<span id="name-error" className="form__error"></span>
						<input value={inputValue.password}  className="form__edt-text  form__edt-text_theme_dark" name="password" placeholder="Ваш пароль" required type="password" onChange={handleChange} />
						<span id="pwd-error" className="form__error"></span>
		</Form> 
	
		</main>
	);
}

export default Login;
