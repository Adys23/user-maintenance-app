import Navbar from './components/Navbar/Navbar';
import PersonDetailsForm from './PersonDetailsForm/PersonDetailsForm';
import PersonsTable from './PersonsTable/PersonsTable';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route path={'/'} exact>
					<PersonsTable />
				</Route>
				<Route path={'/:fullName'}>
					<PersonDetailsForm />
				</Route>
			</Switch>
		</>
	);
}

export default App;
