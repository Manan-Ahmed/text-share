"use client"
import './index.css'
import { useRef } from "react"





export default function TextArea({value,onChange}:any){

    






const textareaRef:any = useRef()
const resizeTextArea = (event: any)=>{
    // console.log( textareaRef.current.style.scrollHeight);
     textareaRef.current.style.height = '24px'
     textareaRef.current.style.height = textareaRef.current.scrollHeight + 12 + 'px'
     
}
    return(
        <>
        <textarea value={value} onInput={resizeTextArea} ref={textareaRef}
        placeholder="Type SomeThing..." className="text-area" onChange={onChange}>{value}</textarea>
        
        </>
    )
}