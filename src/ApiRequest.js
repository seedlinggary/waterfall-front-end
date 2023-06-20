import { useState, useEffect } from "react"

async function apiRequest(gppd, infor,address) {
    console.log('inside func')
    console.log(infor)
    let backend = 'https://distributionresolutionapi.com'
    const requestOptions = {
        method: gppd,
        headers: { 'Content-Type': 'application/json',
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

        console.error('There was data!', data);
        return data;
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
    }
}

    

export default apiRequest