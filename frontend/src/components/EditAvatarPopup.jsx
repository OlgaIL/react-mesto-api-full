import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props){
	const textInput = useRef(null);

	function handleSubmit(e) {
		e.preventDefault();
		props.onUpdateAvatar({
			avatar: textInput.current.value
		});
	}

	return(
		<PopupWithForm 
							name="avatar" 
							title = "Обновить аватар"
							submitText="Сохранить"
							isOpen = {props.isOpen}
							onSubmit={handleSubmit}
							onClose = {props.onClose}>
								<input className="form__edt-text" name="link"  placeholder="Ссылка на картинку" ref={textInput} required type="url" pattern="https://.*" />
								<span id="link-error" className="form__error"></span>
		</PopupWithForm>
	
		);

}

export default EditAvatarPopup;
