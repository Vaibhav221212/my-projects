import React, { useState } from 'react'

const M = () => {

    const { fname, setfName } = useState("")
    const { lname, setLname } = useState("")
    const { email, setEmail } = useState("")
    const { number, setNumber } = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(fname)
        if(!fname || !lname || email)
          {
            alert("fanme is empty..,")
          }
       
          
    }
    return (
        <form onSubmit={submitHandler} className='flex flex-col gap-3 justify-center items-center' >
            <label htmlFor='fname'>Fname</label>
            <input type='text ' id='fname' name='fname' value={fname} onChange={(e)=>setfName(e.target.value)}></input>
            <label htmlFor='lname'>Fname</label>
            <input type='text ' id='lname' name='lname' value={lname} onChange={(e) => setLname(e.target.value)}></input>
            <label htmlFor='email'>Fname</label>
            <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label htmlFor='number'>Fname</label>
            <input type='number' id='number' name='number' value={number} onChange={(e) => setNumber(e.target.value)}></input>

            <button type='submit'>Submit</button>
        </form>
    )
}

export default M;
