import React,{useEffect} from 'react';
import './App.css';
import Home from './screens/Home'
import Login from './screens/Login';
import { useStateValue } from './StateProvider';
import {auth} from './firebase'

function App() {
  const [{user},dispatch] = useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      if(authUser)
      {
          dispatch({
            type:"SET_USER",
            user:authUser
          })
      }
      else{
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    })
  },[])
  return (
    <div className="App">
     {/* <Home/> */}
     {user?<Home/>:<Login/>}
    </div>
  );
}
export default App;
