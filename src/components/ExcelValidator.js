import {useState,useEffect,useLayoutEffect,useRef} from 'react'
 import {Data} from './Data'
 import "./excel.css";
import * as XLSX from 'xlsx'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import { useNavigate} from "react-router-dom";


export default function ExcelValidator(){
    
    const baseurl='https://safe-basin-97450.herokuapp.com/validate/val';
const navigate = useNavigate();
    const [excelFile, setExcelFile]=useState(null);
    const [excelFileError, setExcelFileError]=useState(null);  
    const [headerParsed,setHeaderParsed]=useState(null);
    const [valueParsed,setValueParsed]=useState(null);
    const [excelData, setExcelData]=useState(null);
    const [excelName,setExcelName]=useState(null);
    const [formSubmit,setFormSubmit]=useState(false);
    const [formUpload,setFormUpload]=useState(false);
    const [compon,setcompon]=useState(0);
    //const [scompon,ssetcompon]=useState(0);

    const fileType=['xlsx','csv'];
    var k=<div>Please while the session is loading</div>
    
    
    const [chk,setchk]=useState([{"All":true},{"Architecture":false},{"Customer Services":false},{"Digital":false},{"Ergo Direct":false},{"Global Delivery":false},{"Group & Enterprise Systems":false},{"Health Systems":false},{"Infrastructure":false},{"P&C Systems":false},{"Sales & Distribution Systems":false},{"Supplier Management":false},{"Test & Methods":false}])
    
        var clch = chk.map(e =><div><input type="checkbox" value={Object.keys(e)[0]} name="pan"  defaultChecked={Object.values(e)[0]} onChange={c=>handleOnChange(c)} />&nbsp;{Object.keys(e)[0]}&ensp;&ensp;</div>)


function handleOnChange(v){
        //console.log(v)
        var a=v.target.value
        var b=v.target.checked
      //console.log(a)
      //console.log(b)
        setchk([...chk].map(o=>{if(Object.keys(o)[0] === a){
            return{
                ...o,[Object.keys(o)[0]]:b
            }
        }else return o
        }))
     //   console.log(chk)
    }


    useLayoutEffect(() => {
    
check_session()

}, [])
    
            
    //file handling

    const handleFile = (e)=>{
      let selectedFile = e.target.files[0];
      let fileName=selectedFile.name;
      setExcelName(fileName)
      var fileExtension = fileName.split('.').pop(); 
      if(selectedFile){
      if(selectedFile&&fileType.includes(fileExtension)){
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload=(e)=>{
            setExcelFileError(null);
            setExcelFile(e.target.result);
          } 
        }
        else{
          setExcelFileError('Please select only excel or csv file types');
          setExcelFile(null);
        }
      }
    }

    //handle submit
    //conversion of excel data to json

    const handleSubmit=(e)=>{
       e.preventDefault();
        if(excelFile!==null){
  
        const workbook = XLSX.read(excelFile,{type:'buffer'});
        const worksheetName = workbook.SheetNames[0];
        const worksheet=workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet,{defval:""});
        const header = [];
        const columnCount = XLSX.utils.decode_range(worksheet['!ref']).e.c + 1;
        for (let i = 0; i < columnCount; ++i) {
          header[i] = worksheet[`${XLSX.utils.encode_col(i)}1`].v
         }
        var parsedHeader=Object.values(header);
        setHeaderParsed(parsedHeader);
        var parsedValue=Object.keys(header);
        setValueParsed(parsedValue);
        setExcelData(data);
        setFormSubmit(true);
         }
      else{
        setExcelData(null);
      }
        
    }

    //upload handling

    function handleUpload(){
      
        setFormUpload(true)
        axios.post(baseurl,excelData)
        .then(res=>{//console.log(res)
        })
        .then(window.alert('File Uploaded'))
    }

    function lout(){
        sessionStorage.removeItem('token');
        axios.get("https://safe-basin-97450.herokuapp.com/login/out")
            .then(navigate('/'))
    }
    
    //validation of excel data
    const handleValidate=(e)=>{
        e.preventDefault()
        /*    axios.get(baseurl)
          .then((res) => {
          //var result=JSON.stringify(res.data)
          var result=res.data
          var finalResult=result.replaceAll('\\n','\n')
          var fileDownload = require('js-file-download');
          fileDownload(finalResult, 'validatedFile.csv');
           })
           .catch(err=>{
             //console.log(err)
           })*/
          axios.post('https://safe-basin-97450.herokuapp.com/validate/valhds',chk)
          .then((res) => {
          //var result=//JSON.stringify(res.data)
          var result=res.data
          //console.log(result)
          var finalResult=result.replaceAll('\\n','\n')
          var fileDownload = require('js-file-download');
          fileDownload(finalResult, 'validatedFile.csv');
           })
           .catch(err=>{
             //console.log(err)
           })
       }

    
    ////////////////////////////////
     var dat = sessionStorage.getItem('token');
    if(dat==null){
            k = <div className="cnt">Please while the session is loading</div>
                //console.log(k)
           
        }
        else{
            k = [<div className="container">

              <div className='form'>

                    <form className='form-group' autoComplete="off"
                    onSubmit={handleSubmit} >
                      <label><h5>Upload Excel file</h5></label>

                        <button className='btn btn-success' id="lgout" onClick={lout}>logout</button>

                      <br/>

                      <input type='file' className='form-control'
                      onChange={handleFile} required></input> 

                      {excelFileError&& <div className='text-danger'
                                            style={{marginTop:5+'px'}}>{excelFileError}</div>
                      }

                      <button type='submit' className='btn btn-success'
                      style={{marginTop:5+'px'}}>Submit</button>

                        <button onClick={handleUpload}className='btn btn-success'
                      style={{marginTop:5+'px',marginLeft:5+'px'}} disabled={!formSubmit}>Upload</button>

                     </form>

              </div>
              <br></br>
                    
                    <div className="chk">
                       
                       
                    {clch}
                    </div>
                    <br/>
                  
              <br/>
                    
              <h5>File Name : {excelName}</h5>
              <hr></hr>

              <button onClick={handleValidate} className='btn btn-success'
              style={{marginTop:5+'px',marginBottom:5+'px'}} disabled={!formUpload} >Validate</button>

              <div className='viewer'>
                 { excelData===null && <h4> No file selected</h4> }
                {excelData!=null&&(
                  
                    <div className='table-responsive'> 
                    <table className='table'>
                      <thead>
                    {
                      headerParsed.map((value)=><th scope='col'>{value}</th>)
                    }
                      </thead>
                      <tbody>
                        <Data excelData={excelData} header={headerParsed}/>
                      </tbody>
                    </table>            
                  </div> 
                )}   

                  
              </div>
                  
            </div>]
            //console.log(k)
            
        }
    
    function check_session(){
       
        //console.log("dat")
        //console.log(dat)
        //console.log("compon")
        //console.log(compon)
        load_session(dat)
        
      
    }
    
    function load_session(fl){
        //console.log("Session loading fl:",fl)
                    if(fl==null){
                      
                        setcompon(0)
                     setTimeout(gohome, 2000);
                        //gohome()
                        
        }
        else{

            
            setcompon(1)
               
        }
        
              }
    function gohome(){
        
         navigate("/")
    }
    ////////////////////////////////
       return (
        <div className="container">
        
                  
              {k}
        </div>
              
      );

}