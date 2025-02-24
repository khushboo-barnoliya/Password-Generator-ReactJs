import { useCallback, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";


function App() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(false);

   const passwordGenerator = useCallback(() => {
    let generatedPass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";
    if(includeNumbers){ 
      string += "0123456789";
    }
    if(includeSpecialCharacters) {
      string += "!@#$%^&*()_+-={}[]|:;<>,.?/~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1)
      generatedPass += string.charAt(char)
    }
    setPassword(generatedPass);

   }, [length, includeNumbers, includeSpecialCharacters, setPassword])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  // useEffect(() => {
  //   passwordGenerator();
  // }, [length, includeNumbers, includeSpecialCharacters, passwordGenerator])

  return (
    <>
      <div className="flex justify-center h-screen items-center text-center select-none px-5 hero" >
        <div className="flex form w-[100%] md:w-[700px] overflow-hidden flex-col gap-8 bg-white/10 backdrop-blur-[8px] p-5 md:p-10  shadow-[rgba(13,_38,_76,_0.3)_0px_9px_20px]">
          <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f896f6] via-white to-[#00b7ec] text-3xl">Password Generator</h1>

          <div className="flex flex-col gap-5 md:flex-row justify-between items-center md:gap-4">

            <input type="text" placeholder="Generate Password of your choice" className="border select-none rounded-md w-3/4 md:w-full p-2 shadow-[inset_0px_0px_6px_3px_#00000024] focus:shadow-[0px_0px_5px_3px_#00000024] focus:outline-none transition-all duration-500" value={password} readOnly />

            <div className="flex flex-row gap-5 md:gap-2">
            <button onClick={passwordGenerator} type="submit" className="bg-[#fff] hover:shadow-[0px_0px_5px_3px_#00000024] active:scale-[0.98] shadow-[inset_0px_0px_5px_3px_#00000024] font-semibold text-black flex items-center p-2  px-4 rounded-lg">Generate</button>

            <button type="submit" className="bg-[#000] font-semibold text-white flex items-center p-2 gap-1 px-4 rounded-lg shadow-lg hover:shadow-[0px_0px_5px_3px_#00000024] active:scale-[0.98]" onClick={copyToClipboard}><FaRegCopy />Copy</button>
            </div>
          </div>

          <div className="flex flex-col max-w-52 md:max-w-full md:flex-row gap-3 md:gap-8 justify-center items-start mx-auto md:mx-0 md:items-center">
            <div className="flex justify-between items-center gap-2">
              <input type="range" name="range" value={length} min={8} max={20} id="range" className="accent-[#ff99fd] cursor-pointer" onChange={(e) => {setLength(parseInt(e.target.value))}} />
              <label htmlFor="range" className="text-white">Length: <b>{length}</b></label>
            </div>

            <div className="flex justify-between items-center gap-2">
              <input type="checkbox" name="char" id="char" className="accent-[#ff99fd] cursor-pointer" defaultChecked={includeNumbers} onChange={() => {setIncludeNumbers((prev) => !prev)}} />
              <label htmlFor="char" className="text-white">Numbers</label>
            </div>

            <div className="flex justify-between items-center gap-2">
              <input type="checkbox" name="num" id="num" className="accent-[#ff99fd] cursor-pointer"  defaultChecked={includeSpecialCharacters} onChange={() => {setIncludeSpecialCharacters((prev) => !prev)}} />
              <label htmlFor="num" className="text-white">Special Characters</label>
            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default App
