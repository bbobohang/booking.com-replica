import React, { Fragment } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';

const List = () => {
	return (
		<Fragment>
			<Navbar />
			<Header type='list' />
		</Fragment>
	);
};

export default List;
