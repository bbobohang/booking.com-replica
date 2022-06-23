import React, { Fragment } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Featured from '../../components/feature/Featured';
import FeaturedProperty from '../../components/featuredProperty/FeaturedProperty';
import FeaturedHomes from '../../components/featuredHomes/FeaturedHomes';
import EmailList from '../../components/emailList/EmailList';
import Footer from '../../components/footer/Footer';
import './home.css';

const Home = () => {
	return (
		<Fragment>
			<Navbar />
			<Header />
			<div className='homeContainer'>
				<Featured />
				<div className='homeTitle'>
					<h2 className='homeSubheader'>Browse by property type</h2>
				</div>
				<FeaturedProperty />
				<div className='homeTitle'>
					<h2 className='homeSubheader'>Homes guest love</h2>
				</div>
				<FeaturedHomes />
				<EmailList />
				<Footer />
			</div>
		</Fragment>
	);
};

export default Home;
