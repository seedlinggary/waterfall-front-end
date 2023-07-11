import { useState, useEffect } from "react"

const useFetch = (url, options) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    // let backend = 'http://127.0.0.1:5000'
    let backend = 'https://distributionresolutionapi.com'


    useEffect(() => {
        const abortCont = new AbortController();
        options.signal = abortCont.signal
        
            fetch(backend + url, options)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Couldnt fetch data')
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch(err => {
                    if (err.name === 'AbortError'){
                        console.log('fetch aborted')
                    }else{
                        setIsPending(false)
                        setError(err.message)    
                    }
                })
        
        console.log('use effect ran')
        return () => abortCont.abort
    }, [url]);
    return { data, isPending, error }
}

export default useFetch