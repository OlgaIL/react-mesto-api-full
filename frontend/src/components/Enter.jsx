import React from 'react';
import {useLocation, Link} from "react-router-dom";

function Enter() {
	const location = useLocation().pathname;
	let pageEnter = true;
	if(location !== "/sign-in"){ pageEnter = false} else { pageEnter = true;};
	
	return (
		<Link className="header__link" to={ pageEnter ? '/sign-up' : '/sign-in' } >{ pageEnter ? 'Регистрация' : 'Вход' }</Link>
	);
}

export default Enter;