import React from 'react';
import {CurrentUserContext} from '../context/CurrentUserContext';

function Card (props) {
				const currentUser = React.useContext(CurrentUserContext);
		/** Определяем, являемся ли мы владельцем текущей карточки */
		const isOwn = props.owner._id === currentUser._id;
		/**  Создаём переменную, которую после зададим в `className` для кнопки удаления */
		const cardDeleteClassName = (
		`element__delete ${isOwn ? 'element__delete' : 'element__delete_disable'}`
		); 

		const isLiked = props.likes.some(i => i._id === currentUser._id);
		const cardLikeClassName  =  (
				`element__like${isLiked ? ' element__like_active' : ''}`
				);


		function handleClick () {
				props.onCardClick({name: props.name, link: props.link});
		}

		function handleLikeClick () {
				props.onCardLike(props);
		}

		function handleDeleteClick () {
				props.onCardDelete(props);
		}

		return(
					<li className="element">
							<button type="button" className={cardDeleteClassName} title="Удалить" onClick={handleDeleteClick}></button>
							<img  className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
							<div className="element__name">
									<h3 className="element__title">{props.name}</h3>
									<div className="element__likesinfo">
											<button type="button" className={cardLikeClassName} title="Нравится" onClick={handleLikeClick}></button>
											<div className="element__likecount">{props.likes.length}</div>
									</div>
							</div>
					</li>
		)
}

export default Card;