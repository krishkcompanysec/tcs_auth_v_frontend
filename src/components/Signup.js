import React,{useState} from "react";
import Validation from "./Validation";
import "./signup.css";
import axios from 'axios'
import { NavLink } from "react-router-dom";
export default function Signup(){
    const [values,setValues]=useState({
        fname:"",
        lname:"",
        email:"",
        pwd:"",
    });
    
    const [errors,setErrors]=useState({});
    const[message,setMessage]=useState("");
    const handleChange=(e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value,
        })
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("Submitting here")
        setErrors(Validation(values));
        
        
        try{
            //console.log(values);
            //let res=await fetch("https://safe-basin-97450.herokuapp.com/signup",dt).then(response => {
            //    console.log("response")
            //    console.log(response)});
            //let resJson=await res.json();
            /*if(res.status===200){
                console.log("created");
               setMessage("User created successfully");
               setValues("");
               
            }
            else{
                if(res.status===500){
                    setMessage("server error");
                }else if(res.status===400){
                    setMessage("error in input fields");
                }
            }*/
            axios.post("https://safe-basin-97450.herokuapp.com/signup", {
                fname: values.fname,
                lname: values.lname,
                email:values.email,
                pwd:values.pwd
              })
              .then(function (response) {
                console.log(response);
                console.log(response.status);
                if(response.status===200){
                    setMessage(response.data)
                }
                
                
               
              })
              .catch(function (error) {
                console.log("You have already submitted the request")
    
                setMessage("Already submitted request, fill up the whole form fields")
                console.log(error);
              });
             

        }
            catch(err){
                console.log(err)
            }
        

    };
    return(
        <div className="container_signup">
            <div className="wrapper">
                <div>
                    <h2 className="title">Create Account</h2>
                </div>
                <form className="formwrapper">
                    <div className="firstName">
                        <label className="label">First Name</label>
                        <input className="input" type="text"  name="fname" value={values.fname} onChange={handleChange} required/>
                        {errors.fname && <p className="error">{errors.fname}</p>}
                    </div>
                    <div className="lastName">
                        <label className="label">Last Name</label>
                        <input className="input" type="text"  name="lname" value={values.lname} onChange={handleChange} required/>
                        {errors.lname && <p className="error">{errors.lname}</p>}
                    </div>
                    <div className="email">
                        <label className="label">Email</label>
                        <input className="input" type="email"  name="email" value={values.email} onChange={handleChange} required/>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="password">
                        <label className="label">Password</label>
                        <input className="input" type="password"  name="pwd" value={values.pwd} onChange={handleChange} required/>
                        {errors.pwd && <p className="error">{errors.pwd}</p>}
                    </div>
                    <div>
                        <button className="submit" onClick={handleSubmit}>Sign Up</button>
                    </div>
                    <br/>
                        <NavLink to='/' className="lg">Login here</NavLink>
                    <div className="message">{message?<p>{message} </p>:null}</div>
                    

                </form>
            </div>
        </div>
    )
}