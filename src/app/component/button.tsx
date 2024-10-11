"use client"

import { addDatafromDb } from '../firebase/firebasefirestore';
import './index.css' 
export default function ThemeButton({value,disabled,title}:any){

const saveChanges = ()=>{
    addDatafromDb(value)
    console.log(value);
    
}
   
    return(
        <>
            <button style={{borderColor: disabled && "#a1a3a1",color: disabled && "#a1a3a1" }}   onClick={saveChanges} disabled={  disabled} className='themBtn'  >
  {title}
            </button>
        </>
    )
}