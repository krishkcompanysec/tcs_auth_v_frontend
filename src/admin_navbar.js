import "./admin_nav.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Nav_adm(){
    const navigate = useNavigate();
    async function out(){
        navigate('/');
        await axios.get(`https://safe-basin-97450.herokuapp.com/admin/logout`);
        sessionStorage.removeItem('adm_token')
        
    }
    
    return(
        <div className="nav">
            <h2 id="av">Auth-V</h2>
            <div onClick={out}><h3 id="hiadm">Logout</h3></div>
        </div>
    )
}
export default Nav_adm;