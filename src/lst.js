import "./lst.css";
import axios from 'axios';
import React, {useLayoutEffect,useState} from 'react';


 const hd=[{fname:"First Name",lname:"Last Name",email:"Email",status:"Approve",delete:"Delete"}]
 
 
 var b =  hd.map((f)=><ul className="tab" key={f.email}><h3 className="cell">{f.fname}</h3><h3 className="cell">{f.lname}</h3><h3 className="cell">{f.email}</h3><h3 className="sts_cell">{f.status}</h3><h3 className="dsts_cell">{f.delete}</h3><br/></ul>) 
var l =  hd.map((f)=><ul className="tab" key={f.email}><h3 className="cell">{f.fname}</h3><h3 className="cell">{f.lname}</h3><h3 className="cell">{f.email}</h3><h3 className="sts_cell">{f.status}</h3><br/></ul>)
            
        

        
function Lst(){
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
     }//console.log("c")
         setLst({data:c})
     //console.log(c)
     }
     
     async function tog_sec(email,status){
        //console.log(email)
        await axios.post(`https://safe-basin-97450.herokuapp.com/toggle`,{email,status}).then((res)=>{
            //console.log(res)
            window.location.reload();
        })
    }
     
     var g = stLst.data.map((e)=>
                            <ul className="tab" key={e.email}><div className="cell">{e.fname}</div><div className="cell">{e.lname}</div><div className="cell">{e.email}</div><div onClick={()=>tog_sec(e.email,e.status)} className="sts_cell">{e.status}</div><br/></ul>
                           )
    return(
        <div className="patab">
            {l}
            {g}
        </div>
    )
}



function Seclst(){
    useLayoutEffect(() => {
       fetchseclst()
    },[])
    
    const [stSeclst,setSeclst]=useState({data:[]})
    
    async function fetchseclst(){
     const ressec = await axios.get(`https://safe-basin-97450.herokuapp.com/admin/users`);
        let d =[]
       for ( let l=0;l<ressec.data.length ;l++){
        if(ressec.data[l].status==0){
           
            d.push(ressec.data[l])
        }}//console.log("d")
        //console.log(d)
        
        setSeclst({data:d})
    }
    
    async function tog_sec(email,status){
        //console.log(email)
        await axios.post(`https://safe-basin-97450.herokuapp.com/toggle`,{email,status}).then((res)=>{
            //console.log(res)
            window.location.reload();
        })
    }
    async function del(email){
        //console.log(email)
        await axios.post(`https://safe-basin-97450.herokuapp.com/toggle/delete`,{email}).then((res)=>{
            //console.log(res)
            window.location.reload();
        })
        
    }
       var g = stSeclst.data.map((e)=>
                            <ul className="tab"  key={e.email}><div className="cell">{e.fname}</div><div className="cell">{e.lname}</div><div className="cell">{e.email}</div><div className="sts_cell" onClick={()=>tog_sec(e.email,e.status)}>{e.status}</div><div onClick = {()=>del(e.email)} className="dsts_cell">Delete</div><br/></ul>
                           )
    return(
        <div className="patab">
            {b}
             {g}
        </div>
    )
}

 const td=[{email:"Email",id:"Session id"}]
 
 var c = td.map((f)=><ul className="tab" key={f.email}><h3 className="cell">{f.email}</h3><h3 className="idcell">{f.id}</h3><br/></ul>)
                
function Thrlst(){
    useLayoutEffect(() => {
       fetchthrlst()
    },[])
     
     const [stThrlst,setThrlst]=useState({data:[]})
     
     async function fetchthrlst(){
         //console.log("3rd fn")
     const resthr = await axios.get(`https://safe-basin-97450.herokuapp.com/admin/sessions`);
         
         
         
      setThrlst({data:resthr.data})
         //console.log(resthr.data)
    }
     
     var z = stThrlst.data.map((e)=><ul  className="tab" key={e._id}><div className="cell">{e.session.email}</div><div className="idcell">{e._id}</div><br/></ul>
                           ) 
     
    return(
        <div className="patab">
            {c}
             {z}
        </div>
    )
}
export {Lst,Seclst,Thrlst}