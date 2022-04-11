import React from 'react'

export const IndividualData = ({individualExcelData,header}) => {

    return (

          header.map(key=><th>{individualExcelData[key]}</th>)
    )
}
