import Login from "./login";
import Signup from "./components/Signup";
import ExcelValidator from "./components/ExcelValidator";
import Admin from "./admin";
import Admin_Login from "./adm_login";
import "./apover.css";
//................................//
import {BrowserRouter,Routes,Route} from "react-router-dom";
//................................//

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adm" element={<Admin />} />
          <Route path="/admin" element={<Admin_Login />} />
          <Route path="/validator" element={<ExcelValidator />} />
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
