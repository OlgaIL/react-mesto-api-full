import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';


import Header from './Header';
import Main from './Main';

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute'; // импортируем HOC


import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import ImagePopup from './ImagePopup';
import InfoPopup from './InfoPopup';

import api from '../utils/api';
import  {setToken, getToken, removeToken} from '../utils/token';
import  userAuth from '../utils/auth';


import {CurrentUserContext} from '../context/CurrentUserContext';


function App() {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);
	const [currentUser, setCurrentUser] = React.useState(null);
	const [cards, setCards] = React.useState([]);

	const [loggedIn , setIsLoggedIn] = React.useState(false);

	const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false);
	const [InfoToolValue, setInfoToolValue] = useState({ infoText: '', infoType: '', name:''});


	const [userData, setUserData] = useState({ email: ''});
	const history = useHistory();



	const tokenCheck = () => {
		const jwt = getToken();
		if (!jwt) {
		return;
			}

		userAuth.getContent(jwt).then((res) => {
				if (res) {
					console.log(res);
					const userData = {
							email: res.data.email
					}
					setIsLoggedIn(true);
					setUserData(userData);
					history.push('/cards')
				}
				
			})
			.catch(err => console.log( err));
	}


	

	const loadUserInfoandCards = async ()  => {
		try{
			const user = await api.getInitialUser();
			const data = await api.getInitialCards();
			setCurrentUser(user);
			setCards(data);
		} catch(error) { 
			console.log(error);
		} finally { 
			// loader false
		}
	}

	useEffect(() => {
		loadUserInfoandCards();
		}, []);

	useEffect(() => {
			tokenCheck();
			// eslint-disable-next-line react-hooks/exhaustive-deps
			}, []);



	function handleEditAvatarClick () {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick () {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick () {
		setIsAddPlacePopupOpen(true);
	}

	function handleDeleteClick () {
		setIsDeletePopupOpen(true);
	}

	function handleCardClick (card) {
		setIsImagePopupOpen(true);
		setSelectedCard(card);
	}

	function closeAllPopups () {
				setIsEditProfilePopupOpen(false);
				setIsAddPlacePopupOpen(false);
				setIsEditAvatarPopupOpen(false);
				setIsDeletePopupOpen(false);
				setIsImagePopupOpen(false);
				setSelectedCard(null);
				setIsInfoToolOpen(false);
	}
	
	function handleCardLike (card) {
		/**  Снова проверяем, есть ли уже лайк на этой карточке */
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		
		/**  Отправляем запрос в API и получаем обновлённые данные карточки */
		api.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => {
			/** Формируем новый массив на основе имеющегося, подставляя в него новую карточку */
		const newCards = cards.map((c) => c._id === card._id ? newCard : c);
			/** Обновляем стейт */
		setCards(newCards);
		})
		.catch(err=>console.log(err));
	}

	function handleCardDelete (card) {
			api.deleteCard(card._id)
			.then(() => {
				const newCards = cards.filter(c => c._id !== card._id);
				setCards(newCards);
			})
			.catch(err=>console.log(err));
	}

	function handleUpdateUser (user) {
		api.putUserInfo(user)
		.then((res) => {
			setCurrentUser(res);
			setIsEditProfilePopupOpen(false)
		})
		.catch(err=>console.log(err));
		//.finally(() => setIsEditProfilePopupOpen(false));
	}

	function handleAddPlaceSubmit (card) {
		api.createCard(card)
		.then((newCard) => {
			setCards([newCard, ...cards]); 
			setIsAddPlacePopupOpen(false);
		})
		.catch(err=>console.log(err));
	}

	function handleUpdateAvatar (avatar) {
		api.putAvatarInfo(avatar)
		.then((res) =>{
			setCurrentUser(res);
			setIsEditAvatarPopupOpen(false)
		})
		.catch(err=>console.log(err));
	}

	function handleOnRegister (password, email) {
		userAuth.register(password, email)
			.then((data) => {
				console.log(data);
				if (data) {
					setInfoToolValue({infoText: 'Вы успешно зарегистрировались!', infoType: 'popup__info-image', name: 'Успешно'});
					setIsInfoToolOpen(true);
					history.push('/sign-in');
				}
			})
			.catch((err) => {
				setInfoToolValue({infoText: 'Что-то пошло не так! Попробуйте еще раз', infoType: 'popup__info-image popup__info-image_err', name: 'Ошибка'});
				setIsInfoToolOpen(true);
				console.log(err)
			});
	}


	function handleOnLogin (password, email) {
		userAuth.authorize(password, email)
			.then((res) => {
				if (res.token) {
					setToken (res.token);
					setIsLoggedIn(true);
					tokenCheck();
					history.push('/cards');
					}
			})
			.catch((err) => {
				setInfoToolValue({infoText: 'Что-то пошло не так! Попробуйте еще раз', infoType: 'popup__info-image popup__info-image_err', name: 'Ошибка'});
				setIsInfoToolOpen(true);
				console.log(err);});
	}

	function handleOnLoguot(){
		removeToken();
		setIsLoggedIn(false);
		history.push('/sign-in');
	}


	return (
	<CurrentUserContext.Provider value={currentUser}>
		<div className="App">
			<div className="page">
				<Header  loggedIn={loggedIn} userData={userData} onLogOut={handleOnLoguot} />
				<Switch>
					<ProtectedRoute path="/cards" loggedIn={loggedIn}>
							<Main
								onEditAvatar={handleEditAvatarClick}
								onEditProfile ={handleEditProfileClick}
								onAddPlace ={handleAddPlaceClick}
								onCardClick={handleCardClick}
								onDeleteImg = {handleDeleteClick} 
								cards = {cards}
								onCardLike ={handleCardLike}
								onCardDelete ={handleCardDelete} />
					</ProtectedRoute>
						

					<Route path="/sign-up">
						<Register onRegister={handleOnRegister} />
					</Route>
					<Route path="/sign-in">
						<Login  onLogin={handleOnLogin} />
					</Route>

					<Route exact path="/*">
						{loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
					</Route>

				</Switch>
				<Footer />
			</div>

				<EditProfilePopup  onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
				<AddPlacePopup  onAddPlace ={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
				<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

				<PopupWithForm 
							name ="delete"
							title = "Вы уверены?"
							submitText = "Да"
							isOpen = {isDeletePopupOpen}
							onClose = {closeAllPopups} />
				
				<InfoPopup 
							isOpen = {isInfoToolOpen}
							onClose = {closeAllPopups} 
							infoTool = {InfoToolValue} />

				<ImagePopup 
						isOpen = {isImagePopupOpen}
						onClose = {closeAllPopups}
						card = {selectedCard} />
				
				

		</div>
	</CurrentUserContext.Provider>
	);

}

export default App;
