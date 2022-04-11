import React from 'react'
import { IndividualData } from './IndividualData'

export const Data = ({excelData,header}) => {
    return excelData.map((individualExcelData)=>(
        <tr key={individualExcelData.key}>
            <IndividualData individualExcelData={individualExcelData} header={header}/>
        </tr>        
    ))
}
