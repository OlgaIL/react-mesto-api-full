import React from 'react';

function ImagePopup ({isOpen, onClose, card}) {
	return(
			<div className={`popup popup_bigimage  ${isOpen&&'popup_opened'}`}>
				<div className="popup__container popup__container_bigimage">
					<figure className="popup__images">
						<img className="popup__image" alt={isOpen ? card.name : ''} src={isOpen ? card.link : ''} />
						<figcaption className="popup__caption">
							{isOpen ? card.name : ''}
						</figcaption>
					</figure>
					<button type="button" className="form__close" title="Закрыть" onClick={onClose}></button>
				</div>
			</div>
			
	)

}

export default ImagePopup;
