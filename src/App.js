// css
import './App.css';

// hooks & others
import {Routes, Route} from "react-router-dom";

// importing components
import Login from './components/login/Login';
import Main from './components/main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main/*' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
