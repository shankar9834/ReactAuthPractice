import { useState ,useContext} from "react";
import {Link} from 'react-router-dom'

import { AuthContext } from "../context/authContext";



const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const {user,dispatch}=useContext(AuthContext);




  const handleSubmit = async (e) => {
         e.preventDefault();
         /* console.log(email);
         console.log(password); */
         

         try{
          const res = await fetch("http://localhost:3005/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
           
          if(res.ok)
          {
            console.log(res);
            const resp=await res.json();
            localStorage.setItem('user',JSON.stringify(resp));

            console.log('logged in succesfully');

           await dispatch({type:'LOGIN',payload:resp});
            // console.log(context)
          // console.log(user)
           window.location.href='/home'
          }
          else{
               throw Error('not logged properly, something went wrong')
          }
         }
         catch(e){
          console.log(e);
         }

  };

  return (
    <div>
        <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button>Submit</button>
      </form>
      <Link to='/home'>Home</Link>
    </div>
  );
};

export default Signup;
