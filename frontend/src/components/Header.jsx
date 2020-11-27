import React from 'react';
import logoMesto from '../images/logo.svg';
import Profile from './Profile';
import Enter from './Enter';

/**{loggedIn ? <UserInfo / > : <NavReg />} */
function Header({loggedIn, userData, onLogOut, page}) {
	return (
		<header className="header">
			<img src={logoMesto} className="header__logo" alt="Место" />
			{ loggedIn ? <Profile onLogOut={onLogOut}  userData={userData} /> : <Enter page = {page} /> }
		</header>
	);
}

export default Header;
