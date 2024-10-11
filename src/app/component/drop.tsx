'use client'
import { useDropzone } from 'react-dropzone'
import './index.css'


export default function DropZone({textElement,onDrop}:any){

        
        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return(
        <>
         <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='text'>
     {textElement}
      
      </div>
    </div>
        
        </>
    )
}