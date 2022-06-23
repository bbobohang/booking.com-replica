import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/Hotel';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/hotels' element={<List />} />
				<Route path='/hotels/:id' element={<Hotel />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
