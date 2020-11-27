import React from 'react';

function Profile({userData, onLogOut}) {
	function signOut(){
		onLogOut();
	}

	return (
		<ul className="navbar">
			<li className="navbar__element">{userData.email}</li> 
			<li className="navbar__element"><button onClick={signOut} className="navbar__element navbar__button">Выйти</button></li>
		</ul>
	);
}

export default Profile;
