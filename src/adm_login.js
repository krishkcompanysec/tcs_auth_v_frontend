import React from "react";
import { makeStyles } from "@mui/styles";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Portal } from "@mui/material";
import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import excel from './assets/am.jpg';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./lg.css";
const useStyles=makeStyles({
  container:{
       backgroundImage:`url(${excel})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        color:'white'
    },
    para:{
        margin:'10px',
        padding:'2px'
    },
    button:{
      margin:'10px',
      paddingTop:'20px',
      border:'none',
      backgroundColor:'white',
      cursor:'pointer'
      
    },
    
  });

  const theme=createTheme();

function Adm_Login(){
    const classes = useStyles();
    const navigate = useNavigate();
    async function spo(values){
        //console.log(values)
        await axios.post(`https://safe-basin-97450.herokuapp.com/admin/login`,values).then(function (response) {
                //console.log(response);
                //console.log(response.status);
                if(response.status===200){
                    // console.log("sucess");
                    // console.log(response);
                    sessionStorage.removeItem('token');
         sessionStorage.setItem('adm_token',response.data.token);
                     navigate('/adm');
                }
              })
        .catch((error) => {//console.log(error.response.status)
                           if(error.response.status===400){
                                     //console.log("response");
                                     //console.log(error.response.data);
                               alert(error.response.data);

            }})
    }
    
    const formik = useFormik({
        initialValues: {
          email:'',pwd:''
        },
        validationSchema: Yup.object({
          email: Yup.string().matches(/@tcs.com/).email('Invalid email address').required('Required'),
          pwd: Yup.string()
          .min(2, 'Password must have atleast 8 characters or more')
          .required('Required'),
        }),
        onSubmit: values => {
         // alert(JSON.stringify(values));
            spo(values)
        },
      });

    
      const [show, setShow] = React.useState(false);
      const container = React.useRef(null);
    
      const handleClick = () => {
        setShow(!show);
      };
    
    return(
   <>
    <div className={classes.container}>
            <button  style={{background: 'white',borderRadius: '10px',borderColor:'white'}} onClick={()=>{
        //console.log("Admin")
    }} id="adml">Admin</button>
       <center> <h1>Welcome to Auth-V</h1> </center>
     <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop:8,
            marginBottom:9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:'white',
            borderRadius:'5px'
          }}
        >

          <Typography component="h1" variant="h5" sx={{paddingTop:'5px', color:'black'}}>
            Admin Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete="email"
              autoFocus
            />
            {formik.touched.email && formik.errors.email ? (
         <div className={classes.error}>{formik.errors.email}</div>
       ) : null}
            <TextField
              margin="normal"
              fullWidth
              name="pwd"
              label="Password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              autoComplete="current-password"
            />
            {formik.touched.pwd&& formik.errors.pwd ? (
         <div className={classes.error}>{formik.errors.pwd}</div>
       ) : null}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <NavLink to='/'>  
                
                  {"User Login"}
                
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
    <center>    
      <h3>Click on below arrow to know more about how to use</h3>
      <button className={classes.button} type="button" onClick={handleClick}>
        {show ? <ArrowUpwardOutlinedIcon/>: <ArrowDownwardOutlinedIcon/>}
      </button>
    </center>
    
    {show ? (
    <Portal container={container.current}>
     <center>
     <h2>How to use Auth-V?</h2>
      <p className={classes.para}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
         and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
      </p>

     <p className={classes.para}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
    </center>
    </Portal>
        ) : null}
    
 </>
 )
}

export default Adm_Login;