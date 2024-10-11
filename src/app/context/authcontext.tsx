// "use client"
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { createContext,ReactNode,useContext, useEffect, useState } from "react";

// import { app } from "../firebase/firebaseconfig";


// type userType = {
//     email: string | null,
//     uid: string,
//     emailVerified: boolean |null,
   
// }


// type AuthContextType = {
//    user: userType | null,
// id:   string | null,
// setId: string | null

 
// }

// const AuthContext = createContext<AuthContextType | null>(null)


// export default function AuthContextProvider({children}: {children: ReactNode}){
// const route = useRouter()
// const [user,setUser] = useState<userType | null>(null)

// const [id,setId] = useState<string | null>(null)


// useEffect(()=>{
//     const auth = getAuth(app);

//     onAuthStateChanged(auth, (logInUser) => {
        
//       if (logInUser) {
//         route.push('/homes')

//         const {email,uid,emailVerified} = logInUser
// setUser({email,uid,emailVerified})
// console.log(emailVerified);



        
//       } else {
//         console.log('user is not login');
//         setUser(null)
// route.push('/')
//       }
//     });
   


// },[])
 




//     return(

//       <AuthContext.Provider value={{user,id,setId}}>
// {children}
// </AuthContext.Provider>

// )

// }

// export const UseAuthContext = ()=>useContext(AuthContext)

