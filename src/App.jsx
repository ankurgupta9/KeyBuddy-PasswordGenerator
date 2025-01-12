import { useCallback, useEffect } from "react";
import { useState } from "react"

function App() {
  const [length, setLength] = useState(6);
  const [number, setIsnumber] = useState(false);
  const [char, setIschar] = useState(false);
  const [simple, setIssimple] = useState(false);
  const [password, setPassword] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffex, setSuffex] = useState("");


  const CopyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password])

  const generate_password = useCallback(() => {

    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let sim = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXY3456789";

    if (number) str += "1234567890"
    if (char) str += "@#%&-_\*^~/."
    if (simple) { str = sim; console.log(str); }
    if (!prefix == "") { pass += prefix; }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    if (!suffex == "") { pass += suffex; }


    setPassword(pass);

  }, [length, number, char, prefix, suffex, simple, setPassword]
  )

  const save = useCallback(() => {
    localStorage.setItem("Password: ", JSON.stringify(password));
    window.location.reload();
  }, [password]);

  useEffect(() => { generate_password() }, [setPassword])

  return (
    <div align="center" style={{ backgroundColor: "black", width: "100vw", height: "100vh" }} className="p-5">
      <h1 className="text-light">KeyBuddy</h1>

      <div align="center" className="mt-5 p-3 border border-2 bg-dark border-white rounded-3 w-50" >
        <div align="center" className=" m-2 justify-content-center">
          <input type="text" name="pass" id="pass" size={40}  className="p-2 border-2 border-primary rounded-3 mx-1 size" value={password} readOnly />
          <button className="text-white border-2 btn btn-outline-primary rounded-circle py-3 mx-1" onClick={CopyToClipboard}>copy</button>
          <button className="text-white border-2 btn btn-outline-success rounded-circle py-3 mx-1" onClick={save}>save</button>
        </div>
        <div align="left" className="p-2">
          <div className="mx-4 my-2"><input type="range" min={3} max={20} value={length} onChange={(e) => { setLength(e.target.value) }} />
            <label className="text-white px-2">length({length})</label></div>
          <div className="mx-4 my-2"><input type="checkbox" onChange={() => { setIsnumber((prev) => !prev) }} /><label className="text-white px-2">Numbers</label> </div>
          <div className="mx-4 my-2"><input type="checkbox" onChange={() => { setIschar((prev) => !prev) }} /><label className="text-white px-2">Special characters</label> </div>
          <div className="mx-4 my-2"><input type="checkbox" onChange={() => { setIssimple((prev) => !prev) }} /><label className="text-white px-2">Easy to read</label> </div>
          <div className="mx-4 my-2"><input type="text" className="rounded px-2 border-primary" size={10} maxLength={5} onChange={(e) => { setPrefix(e.target.value) }} /><label className="text-white px-2">Add prefix</label> </div>
          <div className="mx-4 my-2"><input type="text" className="rounded px-2 border-primary" size={10} maxLength={5} onChange={(e) => { setSuffex(e.target.value) }} /><label className="text-white px-2">Add suffex</label> </div>
        </div> </div>
      <button className="btn btn-success m-1" onClick={generate_password}>Generate</button>
      {localStorage.length > 0 && (
        <div className="w-50">
          <h4 className="text-light text-start">Saved Password:</h4>
          <div align='justify' className=" d-flex justify-content-between m-2 p-3 text-light bg-dark rounded-3">{localStorage.getItem("Password: ")} <button className="btn btn-danger" onClick={() => { localStorage.clear(); window.location.reload(); }}>Clear</button></div>
        </div>
      )}
    </div>
  )
}

export default App
