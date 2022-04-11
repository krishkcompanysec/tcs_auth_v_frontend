import {useState,useEffect} from 'react'
import {Data} from './Data'
import * as XLSX from 'xlsx'
import TableHeader from './TableHeader';
import axios from 'axios';
import Validate from './Validate';

function ExcelFile() {
  
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
  const [headerParsed,setHeaderParsed]=useState(null);
  const [valueParsed,setValueParsed]=useState(null);
  const [formSubmit,setFormSubmit]=useState(null);
  const [formClick,setFormClick]=useState(null);
  const [excelData, setExcelData]=useState(null);
  const [excelName,setExcelName]=useState(null);
  // it will contain array of objects
  
  // handle File
  const fileType=['xlsx','csv'];
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
        setExcelFileError('Please select only excel file types');
        console.log(selectedFile.type);
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
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
      console.log("Clicked")
       axios.post("https://safe-basin-97450.herokuapp.com/validate/val",excelData)
       .then(res=>console.log(res))
       .catch(error=>console.log(error))
    }
    else{
      setExcelData(null);
    }
    
  }

  return (
    <div className="container">
      <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit} >
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={handleFile} required></input>                  
          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>}
          <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>Submit</button>
        </form>
      </div>
      <br></br>
      <hr></hr>
</div>
  );
}

export default ExcelFile;