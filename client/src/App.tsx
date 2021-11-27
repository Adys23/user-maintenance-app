import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PersonForm from './PersonForm/PersonForm';
import PersonsTable from './PersonsTable/PersonsTable';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route path={'/'} exact component={PersonsTable} />
				<Route path={'/user/:userId'} component={PersonForm} />
			</Switch>
			<Footer />
		</>
	);
}

export default App;
