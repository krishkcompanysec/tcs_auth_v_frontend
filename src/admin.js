import Nav_adm from "./admin_navbar";
import Users from "./users";
import Approve from "./approve";
import Loggedin from "./loggedin";
import {Lst,Seclst,Thrlst} from "./lst";
import axios from 'axios';
import "./adm.css";
import React, {useLayoutEffect,useState} from 'react';
import { useNavigate} from "react-router-dom";
function Admin(){
    useLayoutEffect(() => {
     
        let g=<Lst/>
    },[])
    
    const navigate = useNavigate();
        
    const[state,setstate]=useState(0);
        const [compon,setcompon]=useState(0);
    var flg = 0
   
    let g=<Lst/>
    
   if(state == 0){console.log("yep")
                            g=<Lst/>}else if(state==1){
                                console.log("yep")
                                g=<Seclst/>}
                                    else if(state==2){console.log("yep")
                                         //g=<Thrlst/>
                                    g=<Thrlst/>}
                                    
     var con=<div>Please while the session is loading</div>                               
     var dat = sessionStorage.getItem('adm_token');
        
   function tgl(a){
       if(a == 0){
           setstate(0)
       }else if(a == 1){
           setstate(1)
       }
       else if(a == 2){
           setstate(2)
       }
       console.log(flg)
    
       
       
   }
    
    if(dat==null){
            con=<div>Please while the session is loading</div>                           
    }
    else{
        con = <div className="adm">
                <Nav_adm />
                <div id="cards" >
                <div onClick={()=>tgl(0)}><Users/></div>
                <div onClick={()=>tgl(1)}><Approve/></div>
                <div onClick={()=>tgl(2)}><Loggedin /> </div>   
                </div>
                <div id="lt">
                {g}
                </div>
                </div>
    }
                                                           
    
        
    function check_session(){
      load_session(dat)
    }        
    
    function load_session(fl){
      if(fl==null){
        setcompon(0)  
          gohome()
      }  else{
            setcompon(1)    
        }
    }
                                                      
    function gohome(){
        
         navigate("/") 
    }  
                                                      
    return(
        [con]
    )
}

export default Admin;