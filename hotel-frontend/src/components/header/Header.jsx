import React, { Fragment, useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBed,
	faCalendarDays,
	faCar,
	faPerson,
	faPlane,
	faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
const Header = ({ type }) => {
	const [dateState, setDateState] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	const [dateOpen, setDateOpen] = useState(false);
	const [optionsOpen, setOptionsOpen] = useState(false);
	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
		room: 0,
	});

	const handleOptions = (name, operation) => {
		setOptions((prev) => {
			return {
				...options,
				[name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
			};
		});
	};
	return (
		<div className='header'>
			<div className='headerContainer'>
				<div className='headerList'>
					<div className='headerListItem active'>
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faPlane} />
						<span>Flights</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faCar} />
						<span>Car rentals</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faBed} />
						<span>Attractions</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faTaxi} />
						<span>Airport taxis</span>
					</div>
				</div>
				{type !== 'list' && (
					<Fragment>
						<h1 className='headerTitle'>Welcome to Booking Genius</h1>
						<p className='headerDesc'>
							This is a replica of booking.com
							<br />
							Search low prices on hotels, homes and much more...
						</p>
						<button className='headerBtn'>Sign In / Register</button>
						<div className='headerSearch'>
							<div className='headerSearchItem'>
								<FontAwesomeIcon icon={faBed} />
								<input
									type='text'
									placeholder='Where are you going'
									className='headerSearchInput'
								/>
							</div>
							<div className='headerSearchItem'>
								<FontAwesomeIcon icon={faCalendarDays} />
								<span
									onClick={() => {
										setDateOpen(!dateOpen);
										setOptionsOpen(false);
									}}
									className='headerSearchText'
								>{`${format(dateState[0].startDate, 'dd/MM/yyyy')} to ${format(
									dateState[0].endDate,
									'dd/MM/yyyy'
								)}`}</span>
								{dateOpen && (
									<DateRange
										editableDateInputs={true}
										onChange={(item) => setDateState([item.selection])}
										moveRangeOnFirstSelection={false}
										ranges={dateState}
										className='date'
									/>
								)}
							</div>
							<div className='headerSearchItem'>
								<FontAwesomeIcon icon={faPerson} />
								<span
									className='headerSearchText'
									onClick={() => {
										setDateOpen(false);
										setOptionsOpen(!optionsOpen);
									}}
								>
									{`${options.adult} adults | ${options.children} children | ${options.room} rooms`}
								</span>
								{optionsOpen && (
									<span className='optionsContainer'>
										<span className='optionsItemList'>
											<span className='optionsItem optionsItemText'>Adults</span>
											<span className='optionsOperation'>
												<button
													disabled={options.adult <= 1}
													className='optionsBtn'
													onClick={() => handleOptions('adult', 'd')}
												>
													-
												</button>
												<span className='optionItem'>{options.adult}</span>
												<button
													className='optionsBtn'
													onClick={() => handleOptions('adult', 'i')}
												>
													+
												</button>
											</span>
										</span>
										<span className='optionsItemList'>
											<span className='optionsItem optionsItemText'>Children</span>
											<span className='optionsOperation'>
												<button
													disabled={options.children <= 0}
													className='optionsBtn'
													onClick={() => handleOptions('children', 'd')}
												>
													-
												</button>
												<span className='optionItem'>{options.children}</span>
												<button
													className='optionsBtn'
													onClick={() => handleOptions('children', 'i')}
												>
													+
												</button>
											</span>
										</span>
										<span className='optionsItemList'>
											<span className='optionsItem optionsItemText'>Rooms</span>
											<span className='optionsOperation'>
												<button
													disabled={options.room <= 0}
													className='optionsBtn'
													onClick={() => handleOptions('room', 'd')}
												>
													-
												</button>
												<span className='optionItem'>{options.room}</span>
												<button
													className='optionsBtn'
													onClick={() => handleOptions('room', 'i')}
												>
													+
												</button>
											</span>
										</span>
									</span>
								)}
							</div>
							<div className='headerSearchItem'>
								<button className='headerBtn'>Submit</button>
							</div>
						</div>
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default Header;
