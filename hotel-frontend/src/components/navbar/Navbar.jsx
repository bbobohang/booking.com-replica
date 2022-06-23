import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
	const navigate = useNavigate();
	return (
		<div className='navbar'>
			<div className='navContainer'>
				<div onClick={() => navigate('/')} className='logo'>
					Booking Logo
				</div>
				<div className='navItems'>
					<button className='navButton'>Register</button>
					<button className='navButton'>Login</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
