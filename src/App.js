import logo from './logo.svg';
import './App.css';
import Login from "./frontend/Login.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. oOo
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>below is the login component</p>
        <Login />
      </header>
    </div>
  );
}

export default App;
