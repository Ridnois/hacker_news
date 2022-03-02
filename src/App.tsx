import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { Header, TabSelector } from './components';
import { AllPage, Favorites } from "./pages";

function App() {
  return (
    <div className="App">
      <Header />
      <TabSelector />
      <Routes>
        <Route path="/" element={<AllPage />}/>
        <Route path="/faves" element={<Favorites />}/>
      </Routes>
    </div>
  );
}

export default App;
