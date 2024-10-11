import { collection, addDoc, doc, getDoc, query, where } from "firebase/firestore"; 
import { getFirestore, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";
const db = getFirestore(app);
// import { collection, query, where, getDocs } from "firebase/firestore";


export  async function addDatafromDb(text:any){
try {
  const docRef = await addDoc(collection(db, "textsharing"), {
    text: text
  });
  console.log("data add in firestore==> ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}


export async function addFileFromDb(file:any){
try{
  const docRef = await addDoc(collection(db, "filesharing"), {
     file: file
});
console.log("file add in firestore==> ", docRef.id);

}
catch(e){
    console.log('Error adding file document==>',e)
}
}