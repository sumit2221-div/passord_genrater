import { useState,useCallback,useRef,useEffect } from 'react'


function App() {
  const [password,setPassword]=useState("")
  const[length,setLength]=useState(8)
  const[NumberAllow,setNumberAllow]=useState(false)
  const[CharAllow,setCharAllow]=useState(false)
  
  const passwordref =useRef(null)
  const passwordGenrater = useCallback (() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (NumberAllow) str += "0123456789"
    if (CharAllow) str += "!@#$%^&*-_+=[]{}~`"
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass)
  },[length,NumberAllow,CharAllow,setPassword])
 
  useEffect(() => {
    passwordGenrater()
    
  },[passwordGenrater,CharAllow,NumberAllow,length])
  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  
  
  return (
    <>
    <div className="absolute flex justify-center w-screen bg-gray-800 h-lvh item-center">
    
    <div className="w-[500px] h-[200px]  px-4 py-3 my-8  bg-gray-900 rounded-lg shadow-2xl text-lime-700">
    <h1 className='my-3 text-center text-white'>Password generator</h1>
  <div className="flex mb-4 overflow-hidden rounded-lg shadow">
    <input type="text"
    value={password}
    placeholder="password"
    className="w-full px-3 py-1 outline-none"
    ref={passwordref}
    readOnly

     />
      <button
      onClick={copyPasswordToClipboard}
      
        className='outline-none  text-white px-3 py-0.5 shrink-0 focus:bg-orange-700 shadow-2xl bg-orange-500'
        >copy</button>
        

    
      
  </div>
  <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={NumberAllow}
          id="numberInput"
          onChange={() => {
            setNumberAllow((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={CharAllow}
              id="characterInput"
              onChange={() => {
                  setCharAllow((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
 
  </div>
  </div>
</>
    
  )
}

export default App
