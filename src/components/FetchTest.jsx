import { useEffect, useState } from 'react'

function FetchTest() {
    const [cats, setCats] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadCats() {
            try{
                const res = await fetch('http://localhost:3001/cats') //'await' - function pauses here to wait for the promise to resolve
                const data = await res.json() //'await' - function pauses here until the body has been parsed
                setCats(data) //'data' here is the actual parsed array of cats. We only reach here after the two lines above finish resolving
                //setCats() technically returns something, but it is called withing the loadCats function body. 
                //For it's value to affect the outer useEffect callback, we must write return setCats(data) inside loadCats and then write return loadCats() in the outer function (useEffect callback)
            }catch(err){
                setError(err.message)
            }finally{
                setIsLoading(false)
            }
        }

        loadCats() //this line does not have await in front of it, so it does not wait for the async loadCats function to finish
        //loadCats is called and returns a Promise, but that promise does not get captured anywhere so it eventually disappears

        //sequence of the callback in useEffect
        //1. useEffect callback runs
        //2. loadCats is defined, then loadCats is called
        //3. loadCats starts running synchronously up until fetch(...) - the request is sent over the network
        //4. fetch(...) immediately returns a pending promise (no response yet) - await sees this and pauses loadCats here
        //5. with loadCats paused, control returns to the outer useEffect callback, which has nothing left to do - it finishes and returns undefined to React
        //6. Steps 1-5 happens in a single uninterrupted instant, well before any response has traveled back from the network
        //7. some real time later, (network latency - a few miliseconds or longer), the server's response arrives, and ONLY then does loadCats resume
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

  return (
    <ul>
        {cats.map((cat) => { <li key={cat.id}>{cat.name}</li> }) }
    </ul>
  )
}

export default FetchTest