import React from 'react';
import {useLocation, Link} from "react-router-dom";

function Form ({name,title, onSubmit, children, submitText, onClose}) {
	const location = useLocation().pathname;
	let pageEnter = true;
	if(location !== "/sign-in"){ pageEnter = false} else { pageEnter = true;};
	

	return(
				<form name={`form_type_${name}`} className='form form_type_login' noValidate onSubmit={onSubmit}>
						<div className="form__edit form__edit_theme_dark">
							<div className="form__element-login">
								<h2 className="form__title form__title_theme_dark">{title}</h2>
								{children}
							</div>
							<div className="form__element-login">
								<input type="submit" value={submitText} className="form__submit form__submit_theme_dark"></input>
								{ !pageEnter ? <Link to="/sign-in" className="form__link">Уже зарегистрированы? Войти</Link> : ''}
							</div>
						</div>
				</form>
	)
}

export default Form;
