import axios from "axios"
import { useRef, useState } from "react"


function App() {
  const [status , setStatus] = useState("invalid")
  const myText = useRef<HTMLInputElement>(null)
  const [lat , setlat] = useState<number | null>(null)
  const [long , setlong] = useState<number | null>(null)
  setInterval(getForm ,5000)
  async function getForm(){
    navigator.geolocation.getCurrentPosition((position)=>{
      setlat(position.coords.latitude)
      setlong(position.coords.longitude)
    })
    // console.log("getformJa")
    const formData = await myText.current?.value
    await axios.post("https://asdasd.rachatat.com/checktext",{ text : formData ,lat,long })
    .then((res)=>{
      if(res.data == 'ok'){
        setStatus('ok')
      }
      else {
        setStatus('invalid')
      }
      // res.data == 'ok' ? setStatus('ok') : setStatus('invalid')
    })
    .catch(()=>{
      setStatus('network error')
    })

  }
  return (
    <div>
      <form>
        <label htmlFor="text">text</label>
        <input ref={myText} name="text" type="text"  />
      </form>
      <p>{status}</p>
    </div>

  )
}

export default App
