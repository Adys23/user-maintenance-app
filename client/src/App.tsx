import Navbar from './components/Navbar/Navbar';
import PersonDetailsForm from './PersonDetailsForm/PersonDetailsForm';
import PersonsTable from './PersonsTable/PersonsTable';

function App() {
	return (
		<>
			<Navbar />
			<PersonsTable />
			<PersonDetailsForm />
		</>
	);
}

export default App;
