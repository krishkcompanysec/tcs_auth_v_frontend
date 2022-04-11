import "./users.css";
import axios from 'axios';
import React, {useLayoutEffect,useState} from 'react';
function Users(){
    useLayoutEffect(() => {
       fetchlst()
    },[])
    const [stLst,setLst]=useState({data:[]})
     async function fetchlst(){
     const res = await axios.get(`https://safe-basin-97450.herokuapp.com/admin/users`);
     let c =[]
       for ( let l=0;l<res.data.length ;l++){
        if(res.data[l].status==1){
            
            c.push(res.data[l])
        }   
     }//console.log("c users")
         setLst({data:c})
     //console.log(c)
     }
    return(
        <div className="users" id="usr" onClick={()=>{//console.log("Clicked")
    }}>
            <h1>Users</h1>
            <br/>
            <h1>{stLst.data.length}</h1>
        </div>
    )
}
export default Users;