import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { Header, TabSelector } from './components';
import { AllPage } from "./pages";


function App() {
  return (
    <div className="App">
      <Header />
      <TabSelector />
      <Routes>
        <Route path="/" element={<AllPage />}/>
      </Routes>
    </div>
  );
}

export default App;
