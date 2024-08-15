import { Outlet } from "react-router-dom";
import "./App.css";
import Nabbar from "./components/nabbar";

function App() {
  return (
    <div>
      <Nabbar></Nabbar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
