import React, { Fragment, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { Location, useLocation } from 'react-router-dom';

import './list.css';

const List = () => {
	const location = useLocation();

	const [destination, setDestination] = useState(location.state.destination);
	const [date, setDate] = useState(location.state.date);
	const [options, setOptions] = useState(location.state.options);
	console.log(location);
	const [dateOpen, setDateOpen] = useState(false);
	const [dateState, setDateState] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	return (
		<Fragment>
			<Navbar />
			<Header type='list' />
			<div className='listContainer'>
				<div className='listWrapper'>
					<div className='listSearch'>
						<h1 className='lsTitle'>Search</h1>
						<div className='lsItem'>
							<label>Destination</label>
							<input
								type='text'
								placeholder='Where are you going?'
								value={destination}
							/>
						</div>
						<div className='lsItem'>
							<label>Destination</label>
							<span
								onClick={() => {
									setDateOpen(!dateOpen);
								}}
							>{`${format(dateState[0].startDate, 'dd/MM/yyyy')} to ${format(
								dateState[0].endDate,
								'dd/MM/yyyy'
							)}`}</span>
							{dateOpen && (
								<DateRange
									editableDateInputs={true}
									onChange={(item) => setDateState([item.selection])}
									minDate={new Date()}
									moveRangeOnFirstSelection={false}
									ranges={dateState}
								/>
							)}
						</div>
						<div className='lsItem'>
							<label>Options</label>
							<div className='lsOptions'>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Min price <small>per night</small>
									</span>
									<input type='number' className='lsOptionInput' min={1} />
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Max price <small>per night</small>
									</span>
									<input type='number' className='lsOptionInput' min={1} />
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Adult</span>
									<input
										type='number'
										className='lsOptionInput'
										placeholder={options.adult}
										min={1}
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Children</span>
									<input
										type='number'
										className='lsOptionInput'
										placeholder={options.children}
										min={0}
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Room</span>
									<input
										type='number'
										className='lsOptionInput'
										placeholder={options.room}
										min={0}
									/>
								</div>
							</div>
						</div>
						<button>Search</button>
					</div>
					<div className='listResult'></div>
				</div>
			</div>
		</Fragment>
	);
};

export default List;
