import "./users.css";
import axios from 'axios';
import React, {useLayoutEffect,useState} from 'react';
function Loggedin(){
    useLayoutEffect(() => {
       fetchlst()
    },[])
    
    const [stLst,setLst]=useState({data:[]})
    
    async function fetchlst(){
     const res = await axios.get(`https://safe-basin-97450.herokuapp.com/admin/sessions`);
     let c =res.data
       
         setLst({data:c})
     //console.log(c)
     }
    
    return(
        <div className="users" id="lgd" onClick={()=>{//console.log("Clicked")
    }}>
            <h1>Loggedin</h1>
            <br/>
            <h1>{stLst.data.length}</h1>
        </div>
    )
}
export default Loggedin;