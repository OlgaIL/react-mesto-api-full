import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../context/CurrentUserContext';

function Main (props) {
	const currentUser = React.useContext(CurrentUserContext); // подписываем на контекст
	//console.log(currentUser);
	return (
		<main className="content">
		<section className="lead">
			<a href="#" className="lead__avatar-cover" onClick = {props.onEditAvatar}>
				<img  alt={currentUser ? currentUser.name : ''} src={currentUser ? currentUser.avatar : ''} className="lead__avatar" />
			</a>
			<div className="lead__profile-info">
				<div className="lead__profile-header">
					<h1 className="lead__name">{currentUser ? currentUser.name : ''}</h1>
					<button type="button" title="Редактировать" className="lead__edit-button" onClick={props.onEditProfile}></button>
				</div>
					<p className="lead__text">{currentUser ? currentUser.about : ''}</p>
			</div>
			<button type="button" className="lead__add-button" title="Добавить" onClick={props.onAddPlace}></button>
		</section>

		<section className="elements">
			<ul className="elements__list">
				{props.cards.map(card  => <Card key={card._id} {...card}  onCardClick={props.onCardClick} onCardLike ={props.onCardLike} onCardDelete={props.onCardDelete} />)}
			</ul>
		</section>
		</main>
	);
}

export default Main;
