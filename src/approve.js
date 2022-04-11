import axios from 'axios';
import React, {useLayoutEffect,useState} from 'react';
import "./users.css";
function Approve(){
     useLayoutEffect(() => {
       fetchlst()
    },[])
    
    const [stLst,setLst]=useState({data:[]})
    
     async function fetchlst(){
     const res = await axios.get(`https://safe-basin-97450.herokuapp.com/admin/users`);
     let c =[]
       for ( let l=0;l<res.data.length ;l++){
        if(res.data[l].status==0){
            
            c.push(res.data[l])
        }   
     }//console.log("c")
         setLst({data:c})
     //console.log(c)
     }
    
    return(
        <div className="users" id="apr"  onClick={()=>{//console.log("Clicked")
                                                      }}>
            <h1>Approve</h1>
            <br/>
            <h1>{stLst.data.length}</h1>
        </div>
    )
}
export default Approve;