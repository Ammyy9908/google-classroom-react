import React,{useEffect} from 'react';
import './App.css';
import Home from './screens/Home'
import Login from './screens/Login';
import { useStateValue } from './StateProvider';
import {auth,db} from './firebase'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {Redirect} from "react-router-dom";
import ClassDetail from './screens/ClassDetail';
import Work from './screens/Work';
import Peoples from './screens/Peoples';

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
    <Router>
  <div>
  
  
  <Switch>
  <Route exact path="/">
    <Home/>
    </Route>
    <Route  path="/login">
    <Login/>
    </Route>
    <Route path="/c/:id" render={(props) => {
   const id = props.match.params.id;
    return <ClassDetail id={id} />
}}  />

<Route path="/work/:id" render={(props) => {
   const id = props.match.params.id;
    return <Work id={id} />
}}  />

<Route path="/peoples/:id" render={(props) => {
   const id = props.match.params.id;
    return <Peoples id={id} />
}}  />

  </Switch>
</div>
</Router>
    

  );
}
export default App;
