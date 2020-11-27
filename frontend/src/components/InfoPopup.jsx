import React from 'react';

function InfoPopup ({isOpen, onClose, infoTool}) {
	return(
			<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
				<div className="popup__container popup__container_infotext">
						<div className="popup__info">
							<div className={infoTool.infoType} alt = {infoTool.name} />
							<h3 className="popup__info-title">{infoTool.infoText}</h3>
						</div>
					<button type="button" className="form__close" title="Закрыть" onClick={onClose}></button>
				
				</div>
			</div>
	)
}

export default InfoPopup;