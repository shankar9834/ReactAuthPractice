import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
const Home=()=>{

    
    const {user,dispatch}=useContext(AuthContext);
         
    const logoutHandler=()=>{

          localStorage.removeItem('user');
          
           dispatch({type:'LOGOUT'})
    }

    return (
        <div>
        <div>
            <h1>Home page</h1>
        </div>

        {!user&&<Link to ="/login">LOGIN</Link>}
        <br />
        {!user&&<Link to ="/signup">SIGNUP</Link>}
        <br/>
         {user&&<h2>logged in as {user.email}</h2>}
         {user&&<button onClick={logoutHandler}>logout</button>}
        </div>

    )
}


export default Home;