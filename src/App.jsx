import { Outlet } from "react-router-dom";
import "./App.css";
import Nabbar from "./components/nabbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container mx-auto">
      <Nabbar></Nabbar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
