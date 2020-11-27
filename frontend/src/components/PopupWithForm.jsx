import React from 'react';

function PopupWithForm (props) {
	return(
			<div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
				<div className="popup__container">
					<form name={`form_type_${props.name}`} className='form' noValidate onSubmit={props.onSubmit}>
						<div className="form__edit">
							<h2 className="form__title">{props.title}</h2>
							{props.children}
							<input type="submit" value={props.submitText} className="form__submit"></input>
						</div>
						<button type="button" className="form__close" title="Закрыть" onClick={props.onClose}></button>
					</form>
				</div>
			</div>
	)
}

export default PopupWithForm;


