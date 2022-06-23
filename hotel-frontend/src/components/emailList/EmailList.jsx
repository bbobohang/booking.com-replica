import React from 'react';
import './emailList.css';
const EmailList = () => {
	return (
		<div className='mail'>
			<div className='mailContainer'>
				<h1 className='title'>Save Time, Save Money</h1>
				<h2 className='subtitle'>Sign Up and we'll send the best deals to you</h2>
				<div className='subFromWrap'>
					<input type='text' className='emailBox' placeholder='Your Email' />
					<button className='subBtn'>Subscribe</button>
				</div>
			</div>
		</div>
	);
};

export default EmailList;
