import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import UserForm from './componentes/UserForm';
import UserList from './componentes/UserList';

const App = () => {

  const [users, setUsers]=useState([])
  const [userSelected, setUserSelected]=useState(null)

  useEffect(()=>{
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res=>setUsers(res.data))
  },[])
  
  const getUser=()=>{
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res=>setUsers(res.data))
  }

  const selectUser=(user)=>{
    setUserSelected(user)
  }

  const deselectUser=()=>{
    setUserSelected(null)
  }

  return (
    <div className='components'>
      <UserList 
        users={users}
        getUser={getUser}
        selectUser={selectUser}
      />
      <UserForm 
        getUser={getUser}
        userSelected={userSelected}
        deselectUser={deselectUser}
      />
    </div>
  );
};

export default App;