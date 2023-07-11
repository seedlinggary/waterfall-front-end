





import { useState, useEffect } from "react"
import {reactLocalStorage} from 'reactjs-localstorage';

function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click(); 
  }
async function DownloadFile(gppd, infor,address) {
    console.log('inside func')
    console.log(infor)
    // let backend = 'https://distributionresolutionapi.com'
    // let backend = 'https://distributionresolutionapi.com'
    let backend = 'http://127.0.0.1:5000'
    let cookie = reactLocalStorage.get('cookie')
    const requestOptions = {
        method: gppd,
        headers: { 'Content-Type': 'application/json',
        'x-access-token': cookie
        },
        body: JSON.stringify(infor)
    };
    try {
        const response = await fetch(`${backend}${address}`, requestOptions);
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        console.error('There was a response!', response);

        if (!response.ok) {
            const error = (data && data.message) || response.status;
            throw error;
        }
        response.blob().then((blob) => {
            saveBlob(blob, 'Investor_CSV');
         });

        // console.error('There was data!', data);
        // console.log(data)
        // return data;
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
    }
}
export default DownloadFile






// const downloadcsv = (e) => {
    
       
//     let backend = 'https://distributionresolutionapi.com'
//     let address = `/downloadcsv`
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(info)
//     };
//     fetch(`${backend}${address}`, requestOptions)
//         .then((response) => {
//           response.blob().then((blob) => {
//              saveBlob(blob, 'waterfallDistribution');
//           });
//     });

//     e.preventDefault();
//     }    
