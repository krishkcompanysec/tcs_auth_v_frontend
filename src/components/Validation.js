export default function Validation(values){
    let errors={};
    if(!values.fname){
        errors.fname="FirstName is required"
    }
    if(!values.lname){
        errors.lname="LastName is required"
    }
    if(!values.email){
        errors.email="Email is required"
    }else if(!/@tcs.com/.test(values.email)){
        errors.email="Email is invalid"
    }
    if(!values.pwd){
        errors.pwd="Password is required"
    }else if(values.pwd.length<5){
        errors.pwd="Password must be more than five characters"
    }
    return errors;
}