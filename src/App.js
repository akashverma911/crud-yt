import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Create from './Components/Create';
import List from './Components/List';
import Update from './Components/Update';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Create/>} />
          <Route exact path="/list" element={<List />}/>
          <Route exact path="/update" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
