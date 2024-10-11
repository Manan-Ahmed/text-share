"use client"
import Image from "next/image";
import { FaFileAlt } from "react-icons/fa";
import { MdOutlineTextFields } from "react-icons/md";
import LOGO from "./assets/logo.svg";
import textColor from "./assets/text-color.svg"
import textGrey from "./assets/text-grey.svg"
import fileColor from "./assets/files-color.svg"
import fileGrey from "./assets/files-grey.svg"
import { AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from "react";
import TextArea from "./component/text";
import DropZone from "./component/drop";
import FilList from "./component/filelist";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ThemeButton from "./component/button";
import { doc, getFirestore, onSnapshot,collection, DocumentData, deleteDoc } from "firebase/firestore";
import { app } from "./firebase/firebaseConfig";
import Link from "next/link";
import CodeEditor from "./component/codeEditor";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { addFileFromDb } from "./firebase/firebasefirestore";


export default function Home() {
  const [type, setType] = useState('Text')
  const [textValue, setTextValue] = useState('')
  const [tempFile, setTempFile] = useState<any>([])
const [file,setFile] = useState<any>([])
  const [isText,setIsText] = useState(false)
const [targetId,setTargetId] = useState('')
  const db = getFirestore(app)
  const storage = getStorage(app);

  const onDrop = async (acceptedFiles: any) => {
    setTempFile([...tempFile, ...acceptedFiles])

    let arr:any= []
    for(let i = 0;i < acceptedFiles.length;i++){
            arr.push(uploadFile(acceptedFiles[i],i))
    }
  let allfiles = await Promise.all(arr)
   setFile([...file,...allfiles])
   setTempFile([])
   addFileFromDb([...file,...allfiles])

  }

  console.log('files',file)
const uploadFile = (file:any,i:number)=>{

 return new Promise((resolve,reject)=>{

 
const storageRef = ref(storage, `files/image${i}`);

const uploadTask = uploadBytesResumable(storageRef,file );


uploadTask.on('state_changed', 
  (snapshot) => {
  
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
reject(console.log(error))
  }, 
  () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      // setImageUrl(downloadURL)
      resolve({url:downloadURL,type:file.type,name:file.name})
    });
  }
);
})

}

  const clear = async()=>{
    await deleteDoc(doc(db,'textsharing',targetId))
    setTextValue('')
        setIsText(false)

    console.log('remove')
  }
  useEffect(()=>{
      const collectionRef = collection(db,'textsharing')
      onSnapshot(collectionRef,(snapShot: { docChanges: () => { doc: { data: () => any; id: SetStateAction<string>; }; }[]; })=>{
          snapShot.docChanges().forEach((change: { doc: { data: () => any; id: SetStateAction<string>; }; })=>{
                 let text =  change.doc.data()
                 text.id = change.doc.id
                 setTargetId(change.doc.id)             
                    console.log(text)
             setTextValue(text.text)
             if(text){
              setIsText(true)
           }
              
              
             })
            
      })
    
      const fileCollectionRef = collection(db,'filesharing')
      onSnapshot(fileCollectionRef,(snapShot: { docChanges: () => any[]; })=>{
          snapShot.docChanges().forEach((change)=>{
            console.log(change.doc.data())
                 let file =  change.doc.data()
                 file.id = change.doc.id
                 console.log(file.file)
                 setFile(file.file)
          //        setTargetId(change.doc.id)             
          //           console.log(text)
          //    setTextValue(text.text)
          //    if(text){
          //     setIsText(true)
          //  }
              
              
             })
            
      })
  },[])


  const deleteFile = async()=>{
console.log(file);

let delFile = await deleteObject(ref(storage, "filesharing"))
console.log(delFile);


  }

    let expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  const links:any = textValue.match(regex) || [];

  return (
    <>


      <div className="container" style={{ width: '70%', margin: ' auto', marginTop: '50px' }}>
        <div className="header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* <div className="logo" style={{cursor: 'pointer'}}>
      
            <svg xmlns="http://www.w3.org/2000/svg" width="107" height="51" viewBox="0 0 107 51">
    <defs>
        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="101.259%">
            <stop offset="0%" stop-color="#864BFF"/>
            <stop offset="100%" stop-color="#5082FF"/>
        </linearGradient>
    </defs>
    <path fill="url(#a)" fill-rule="evenodd" d="M277.8 80.292h-.056a3.95 3.95 0 0 1-1.862 1.568 6.4 6.4 0 0 1-2.45.476 6.317 6.317 0 0 1-1.834-.266 4.628 4.628 0 0 1-1.554-.798 3.854 3.854 0 0 1-1.064-1.316c-.262-.523-.392-1.13-.392-1.82 0-.784.144-1.447.434-1.988.289-.541.68-.99 1.176-1.344a5.84 5.84 0 0 1 1.694-.826c.634-.196 1.292-.34 1.974-.434.68-.093 1.362-.15 2.044-.168a69.356 69.356 0 0 1 1.89-.028c0-.747-.266-1.34-.798-1.778-.532-.439-1.162-.658-1.89-.658-.691 0-1.321.145-1.89.434-.57.29-1.078.686-1.526 1.19l-2.24-2.296a7.707 7.707 0 0 1 2.744-1.638 9.807 9.807 0 0 1 3.248-.546c1.232 0 2.244.154 3.038.462.793.308 1.428.76 1.904 1.358.476.597.807 1.33.994 2.198.186.868.28 1.871.28 3.01V82H277.8v-1.708zm-1.036-4.256c-.318 0-.714.014-1.19.042a6.03 6.03 0 0 0-1.372.238c-.44.13-.812.327-1.12.588-.308.261-.462.625-.462 1.092 0 .504.214.877.644 1.12.429.243.877.364 1.344.364.41 0 .807-.056 1.19-.168.382-.112.723-.27 1.022-.476a2.3 2.3 0 0 0 .714-.784c.177-.317.266-.69.266-1.12v-.896h-1.036zm5.867-7.644h4.2V82h-4.2V68.392zm-.336-4.284c0-.672.238-1.246.714-1.722a2.347 2.347 0 0 1 1.722-.714c.672 0 1.246.238 1.722.714s.714 1.05.714 1.722c0 .672-.238 1.246-.714 1.722a2.347 2.347 0 0 1-1.722.714 2.347 2.347 0 0 1-1.722-.714 2.347 2.347 0 0 1-.714-1.722zm5.84 4.284h4.2v2.184h.055c.448-.84.98-1.47 1.596-1.89.616-.42 1.391-.63 2.324-.63.243 0 .486.01.728.028.243.019.467.056.672.112v3.836a5.711 5.711 0 0 0-1.792-.28c-.802 0-1.437.112-1.904.336a2.528 2.528 0 0 0-1.078.938c-.252.401-.415.882-.49 1.442-.074.56-.112 1.176-.112 1.848V82h-4.2V68.392zm11.13 3.36h-2.771v-3.36h2.772v-2.408c0-.747.065-1.451.196-2.114.13-.663.382-1.246.756-1.75.373-.504.91-.9 1.61-1.19.7-.29 1.62-.434 2.758-.434.43 0 .85.019 1.26.056.41.037.812.103 1.204.196l-.196 3.556a4.938 4.938 0 0 0-.672-.21 3.172 3.172 0 0 0-.7-.07c-.672 0-1.176.145-1.512.434-.336.29-.504.882-.504 1.778v2.156h3.108v3.36h-3.108V82h-4.2V71.752zm6.68 3.444c0-1.083.196-2.063.588-2.94a6.768 6.768 0 0 1 1.61-2.254 7.11 7.11 0 0 1 2.408-1.442 8.577 8.577 0 0 1 2.954-.504c1.046 0 2.03.168 2.954.504a7.11 7.11 0 0 1 2.408 1.442 6.768 6.768 0 0 1 1.61 2.254c.392.877.588 1.857.588 2.94s-.196 2.063-.588 2.94a6.768 6.768 0 0 1-1.61 2.254 7.11 7.11 0 0 1-2.408 1.442 8.577 8.577 0 0 1-2.954.504 8.577 8.577 0 0 1-2.954-.504 7.11 7.11 0 0 1-2.408-1.442 6.768 6.768 0 0 1-1.61-2.254c-.392-.877-.588-1.857-.588-2.94zm4.2 0c0 1.027.294 1.857.882 2.492.588.635 1.414.952 2.478.952 1.064 0 1.89-.317 2.478-.952.588-.635.882-1.465.882-2.492s-.294-1.857-.882-2.492c-.588-.635-1.414-.952-2.478-.952-1.064 0-1.89.317-2.478.952-.588.635-.882 1.465-.882 2.492zm11.664-6.804h4.2v2.184h.056c.448-.84.98-1.47 1.596-1.89.616-.42 1.39-.63 2.324-.63.242 0 .485.01.728.028.242.019.466.056.672.112v3.836a5.711 5.711 0 0 0-1.792-.28c-.803 0-1.438.112-1.904.336a2.528 2.528 0 0 0-1.078.938c-.252.401-.416.882-.49 1.442-.075.56-.112 1.176-.112 1.848V82h-4.2V68.392zm-80.451 26.173c-.81-1.23-2.04-1.845-3.69-1.845-.57 0-1.14.135-1.71.405-.57.27-.9.735-.99 1.395-.09.54.135.937.675 1.193.54.255 1.215.48 2.025.675.81.195 1.687.404 2.632.63a8.78 8.78 0 0 1 2.588 1.057 4.982 4.982 0 0 1 1.822 1.957c.435.826.563 1.928.383 3.308-.18 1.41-.645 2.572-1.395 3.487a8.822 8.822 0 0 1-2.678 2.206 11.53 11.53 0 0 1-3.397 1.17c-1.23.225-2.43.337-3.6.337-1.53 0-3.045-.217-4.545-.653-1.5-.435-2.715-1.207-3.645-2.317l4.725-4.545c.54.78 1.162 1.372 1.867 1.777.705.406 1.568.608 2.588.608.78 0 1.5-.112 2.16-.337.66-.226 1.035-.638 1.125-1.238.09-.57-.128-.997-.653-1.282-.525-.286-1.2-.525-2.025-.72l-2.655-.63a9.942 9.942 0 0 1-2.61-1.013 4.776 4.776 0 0 1-1.867-1.912c-.45-.826-.57-1.928-.36-3.308.18-1.29.6-2.4 1.26-3.33a8.549 8.549 0 0 1 2.407-2.295c.945-.6 1.988-1.042 3.128-1.328 1.14-.285 2.28-.427 3.42-.427 1.44 0 2.865.21 4.275.63 1.41.42 2.55 1.17 3.42 2.25l-4.68 4.095zm16.1-18.585l-2.116 15.12h.09c.21-.42.518-.84.923-1.26.405-.42.885-.795 1.44-1.125.555-.33 1.192-.6 1.912-.81a8.158 8.158 0 0 1 2.295-.315c1.71 0 3.06.262 4.05.787.99.526 1.71 1.253 2.16 2.183.45.93.69 2.025.72 3.285.03 1.26-.06 2.625-.27 4.095L266.997 110h-6.75l1.485-10.71c.09-.63.165-1.282.225-1.958a5.418 5.418 0 0 0-.135-1.867 2.688 2.688 0 0 0-.855-1.395c-.42-.36-1.065-.54-1.935-.54-.87 0-1.597.157-2.182.472a3.97 3.97 0 0 0-1.418 1.26 5.826 5.826 0 0 0-.81 1.778c-.18.66-.315 1.35-.405 2.07l-1.53 10.89h-6.75l4.77-34.02h6.75zm26.674 31.275h-.09c-.9 1.17-2.01 2.01-3.33 2.52-1.32.51-2.67.765-4.05.765-1.02 0-1.98-.142-2.88-.428-.9-.285-1.673-.712-2.318-1.282a5.027 5.027 0 0 1-1.417-2.115c-.3-.84-.375-1.815-.225-2.925.27-1.89.982-3.352 2.137-4.388 1.155-1.035 2.52-1.8 4.095-2.294a19.9 19.9 0 0 1 4.95-.878 90.944 90.944 0 0 1 4.703-.135c.15-1.2-.15-2.152-.9-2.858-.75-.705-1.71-1.057-2.88-1.057-1.11 0-2.153.232-3.128.697a10.316 10.316 0 0 0-2.722 1.913l-3.06-3.69a14.596 14.596 0 0 1 4.747-2.632 16.763 16.763 0 0 1 5.333-.878c1.98 0 3.577.247 4.792.742 1.215.496 2.138 1.223 2.768 2.183.63.96.997 2.137 1.102 3.532.105 1.396.023 3.008-.247 4.838L289.982 110h-6.21l.36-2.745zm-.72-6.84c-.51 0-1.148.022-1.913.067-.765.046-1.515.173-2.25.383-.735.21-1.38.525-1.935.945-.555.42-.877 1.005-.967 1.755-.06.42-.015.772.135 1.058.15.285.36.532.63.742.27.21.592.36.967.45.375.09.743.135 1.103.135.66 0 1.312-.09 1.957-.27a6.62 6.62 0 0 0 1.755-.765 4.62 4.62 0 0 0 1.328-1.26c.36-.51.585-1.11.675-1.8l.18-1.44h-1.665zm12.14-12.285h6.75l-.496 3.51h.09c.9-1.35 1.89-2.362 2.97-3.037 1.08-.676 2.37-1.013 3.87-1.013.39 0 .78.015 1.17.045.39.03.75.09 1.08.18l-.855 6.165c-.48-.15-.945-.262-1.395-.338a8.761 8.761 0 0 0-1.44-.112c-1.29 0-2.34.18-3.15.54-.81.36-1.455.862-1.935 1.508-.48.645-.847 1.417-1.102 2.317-.255.9-.458 1.89-.608 2.97l-1.26 9.135h-6.75l3.06-21.87zm33.919 18.09a12.922 12.922 0 0 1-4.523 3.195c-1.755.75-3.517 1.125-5.287 1.125-1.68 0-3.225-.27-4.635-.81-1.41-.54-2.588-1.312-3.533-2.318-.945-1.005-1.635-2.212-2.07-3.622-.435-1.41-.532-2.985-.292-4.725.24-1.74.772-3.315 1.597-4.725a13.316 13.316 0 0 1 3.083-3.623 13.567 13.567 0 0 1 4.185-2.317c1.56-.54 3.18-.81 4.86-.81 1.56 0 2.94.27 4.14.81 1.2.54 2.175 1.312 2.925 2.317.75 1.006 1.267 2.213 1.552 3.623.285 1.41.308 2.985.068 4.725l-.315 2.115h-15.66c.09 1.29.532 2.317 1.327 3.082.795.766 1.853 1.148 3.173 1.148 1.11 0 2.077-.247 2.902-.742a9.695 9.695 0 0 0 2.273-1.913l4.23 3.465zm-4.365-9.63c.18-1.14-.06-2.115-.72-2.925-.66-.81-1.605-1.215-2.835-1.215-.75 0-1.425.12-2.025.36-.6.24-1.125.547-1.575.922a5.19 5.19 0 0 0-1.125 1.305c-.3.496-.51 1.013-.63 1.553h8.91z" transform="translate(-225 -60)"/>
</svg>        
    </div> */}
          <div className="logo" style={{ cursor: 'pointer' }}><img src={LOGO} alt="" /></div>
          <div className="menu-bar" >
            <ul style={{ display: 'flex', gap: '30px' }}>
              <li>How it works </li>
              <li>Download  </li>
              <li>Upgrade </li>
              <li>Feedback </li>
              <li style={{ color: '#638eff', fontWeight: '700px', }}>Login / Register </li>

            </ul>
          </div>
        </div>

        <div className="main-card"
          style={{
            width: '100%', minHeight: '340px', backgroundColor: 'white', marginTop: '30px',
            display: 'flex'
          }}>
          <div className="side-bar" style={{ backgroundColor: '#f8f8f8' }}>
            <div  onClick={() => { setType('Text') }} style={{ padding: "30px", cursor: 'pointer' }}>
              <img style={ {width: '30px'}} src={type === 'Text' ? textColor.src : textGrey.src} alt="" />
            </div>

            <div onClick={() => { setType('Files') }} style={{ padding: "30px", cursor: 'pointer' }}>
              <img src={type === 'Files' ? fileColor.src : fileGrey.src} alt="" />
            </div>
          </div>
          <div className="card-container" style={{ width: '100%', margin: '15px' }}>
            {type === 'Text' ? <div className="text-section">
              <h1 style={{
                padding: '20px', fontSize: '48px', fontWeight: '700',
                marginBottom: '28px', letterSpacing: '.6px',

              }}>Text</h1>

              <div style={{ width: '100%', border: '1px solid black', padding: '20px' }}>
              
                <TextArea value={textValue} onChange={(e: any) => { setTextValue(e.target.value) }} />
              </div>

              <div className="text-foater" style={
                {display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
<div >
  {
links.map((v:any,i: any)=>(
        <div key={i}>
          <span>
            <Link href={v} style={{color: 'blue'}}>{v}</Link>
          </span>
        </div>
))

}
</div>  
              <div className="save-btn" style={{ padding: '10px 10px', textAlign: 'right' }}>

                {
                  textValue &&
                <span style={{ margin: '10px', cursor: 'pointer' }}
                
                onClick={clear} >     clear</span>

                }

                {
                   isText ?  <ThemeButton onClick={
                    ()=>{navigator.clipboard.writeText(textValue)}} 
                    title={'copy'}
                   
                   />
                   :   <ThemeButton value={textValue} title={'save'} disabled={textValue ? false : true}                />
                }
              </div>
            </div>
            </div>
              :
              <div className="file-section" style={{ height: '100%' }}>
                <div className="files-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }} >
                  <h1
                    style={{
                      padding: '10px', fontSize: '48px', fontWeight: '700',
                      marginBottom: '20px', letterSpacing: '.6px',

                    }}
                  >
                    Files
                  </h1>
                  <div className="files-btn"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '15px'
                    }}
                  >
                    <div >

                      <FaArrowAltCircleDown />
                      DownloadAll

                    </div>

                    <div>
                      <MdDelete onClick={deleteFile}/>

                      delete All
                    </div>
                  </div>

                </div>
                <div className="file" >
                  {
                    tempFile.length || file.length ?
                      <FilList tempFile={tempFile} files={file} onDrop={onDrop} />
                      :
                      <DropZone
                        onDrop={onDrop}
                        textElement={
                          <>
                            <div>
                              Drag and drop any files up to 2 files, 5Mbs each <br /> or <span style={{ color: '#779eff' }}>Browse
                                Upgrade</span> to get more space
                            </div>
                          </>
                        } />
                  }

                </div>
              </div>

            }


          </div>
        </div>
      </div>


    </>
  );
}



















{/* {
      type === 'text'?
<>
  <div className="text" style={{backgroundColor: ' black'}}>
                  <h1 style={{ border: '1px solid black',
                    padding: '20px', fontSize: '48px', fontWeight: '700',
                    marginBottom: '28px', letterSpacing: '.6px',

                  }}>{type}</h1>
                </div>
<h1></h1>
</>

  : 
  
  <div className="files"><h1 style={{padding: '20px', fontSize: '48px',fontWeight: '700',
    marginBottom: '28px',    letterSpacing: '.6px',

  }}>{type}</h1>
  </div>
    } */}


{/* <div>files</div> */ }