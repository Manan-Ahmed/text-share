"use client"
import Dropzone from "react-dropzone";
import { CiFileOn } from "react-icons/ci";
import DropZone from "./drop";

import { FaCss3Alt, FaPlus } from "react-icons/fa";
import { Span } from "next/dist/trace";
import { FaPlusSquare } from "react-icons/fa";
import { IoLogoHtml5, IoLogoJavascript } from "react-icons/io";
import './index.css'
export default function FilList({tempFile,onDrop,files}:any){
    console.log(tempFile)

    // console.log(onDrop);
    
    return(
        <>
                <div className="filelist">


{
    files.map((v:any,i:any)=>{
        let icon;
        switch(v.type){
           case "text/html":
            icon = <IoLogoHtml5 />
break;
case "text/css":
    icon = <FaCss3Alt />
    break;
    case "text/css":
    icon = <FaCss3Alt />
    break;
  case "text/javascript":
    icon = <IoLogoJavascript />
default: icon = <CiFileOn size={25}/>

        }
        return(
            <div key={i}>
                {v.type.indexOf("image") !== -1 ?
                <img src={v.url} width={100} height={200} alt="" />   
            :(
            <>
               {icon}
               <span>
                {v.name.slice(0,10)} <b> {v.name.lastIndexOf(".")} </b>
               </span>
            </>
            )
}
            </div>
        )
    })
}

{
    tempFile.map((v:any,i:any)=>{
        let icon;
        switch(v.type){
           case "text/html":
            icon = <IoLogoHtml5 />
break;
case "text/css":
    icon = <FaCss3Alt />
    break;
    case "text/css":
    icon = <FaCss3Alt />
    break;
  case "text/javascript":
    icon = <IoLogoJavascript />
default: icon = <CiFileOn size={25}/>

        }
        return(
            <div className={'tempfile'}   key={i}>
                {v.type.indexOf("image") !== -1 ?
                <img src={URL.createObjectURL(v)} width={100} height={100} alt="" />   
            :(
            <>
               {icon}
               <span>
                {v.name.slice(0,10)} <b> {v.name.lastIndexOf(".")} </b>
               </span>
            </>
            )
}
            </div>
        )
    })
}

{/* {
    files.map((file:any,ind:any)=>(
<div className="box" key={ind}>
    
<CiFileOn size={25}/>
{file.type}
</div>

    ))
} */}

  {/* <div className="box" style={{border: '1px solid black'}}>
<CiFileOn size={25}/>
index.html
 </div>   */}

    <div className="box" style={{border: '1px solid black'}}>
    
        <DropZone onDrop={onDrop} textElement={
            <>
            <FaPlus />
            AddFile
            </>
        }

        />

    </div>
    </div>

        </>
    )
}