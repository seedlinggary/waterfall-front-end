import { useState, useEffect } from "react"

async function apiRequest(gppd, infor,address) {
    console.log('inside func')
    console.log(infor)
    let backend = 'http://127.0.0.1:5000'
    const requestOptions = {
        method: gppd,
        headers: { 'Content-Type': 'application/json',
        },
        body: JSON.stringify(infor)
    };
    fetch(`${backend}${address}`, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            console.error('There was a response!', response);
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            // this.setState({ postId: data.id })
            console.error('There was data!', data);
            // setIsPending(false)
            // setError(null)
    return  data 
        })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            return error
        }); }

export default apiRequest