import { getAuth, signInWithPopup,GoogleAuthProvider,GithubAuthProvider , signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/Firebase.initialize';

initializeAuthentication();

const googleProvider= new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();





function App() {
  const [user,setUser]=useState({})
  const auth = getAuth();

  const handleGoogleSgnIn=()=>{

    signInWithPopup(auth, googleProvider)
    .then(result=>{
      const  {displayName,email,photoURL}=result.user;
      const loggedInUser={
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(loggedInUser)
    })
  }

 const handleGithubSignIn=()=>{
  signInWithPopup(auth, githubProvider)
  .then((result) => {
   const {displayName,email,photoURL}=result.user;
   const loggedInUser={
     name:displayName,
     email:email,
     photo:photoURL
   }
   setUser(loggedInUser)
   
  })

 }
 const handleSignOut=()=>{
  signOut(auth)
  .then(()=>{
    setUser({})
  })
 }


  return (
    <div className="App">
    {  !user.email ?
    <div>
     <button onClick={handleGoogleSgnIn}>Google SignIn</button>
      <button onClick={handleGithubSignIn}>Github SignIn</button>
     </div> :
      <button onClick={handleSignOut}>Sign Out</button>}

      <br />

      {
        user.email && <div>
          <h2>Welcome {user.name}</h2>
          <p>i know your email adress: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
