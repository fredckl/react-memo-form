import './App.css';
import ContactForm from './components/ContactForm';
import ContactForm2 from './components/ContactForm2';

function App() {
  return (
    <div className="App">
      <h1 className="main-title">React Memo Form</h1>
      <div className="form-container">
        <ContactForm/>
        <ContactForm2/>
      </div>
    </div>
  );
}

export default App;
