import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import swal from 'sweetalert';

const UserForm = ({getUser, userSelected, deselectUser}) => {

    const [email, setEmail]=useState("")
    const [contrasena, setPassword]=useState("")
    const [firstName, setFirstName]=useState("")
    const [lastName, setLastName]=useState("")
    const [cumple, setBirthday]=useState("")

    useEffect(()=>{
        if (userSelected!=null){
            setEmail(userSelected.email)
            setPassword(userSelected.password)
            setFirstName(userSelected.first_name)
            setLastName(userSelected.last_name)
            setBirthday(userSelected.birthday)
        }
    },[ userSelected ])

    const submit=(e)=>{
        e.preventDefault()

        const newUser={            
            email: email,
            password: contrasena,
            first_name: firstName,
            last_name: lastName,
            birthday: cumple
        }
        if(userSelected!=null){
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`,newUser)
            .then(()=>{
                getUser()
                reset() 
                deselectUser()
            })
            swal({
                title:'User update',
                icon:'success',
                timer:'2000',
                buttons:'Accept'
            })
        }else{
            axios.post('https://users-crud1.herokuapp.com/users/',newUser)
                .then(()=>{
                    getUser()
                    reset()
                })
                .catch((error)=>console.log(error))
                swal({
                    title:'User create',
                    icon:'success',
                    timer:'2000',
                    buttons:'Accept'
                })
        }
               
    }

    const cancelUser=()=>{
        reset() 
        deselectUser()
    }

    const reset=()=>{
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
        setBirthday('')
    }

    return (
     

        <form className='UserForm' onSubmit={submit}>
            <div className="cardUserForm">
                <h1>{userSelected!=null?'Edit User':'New User'}</h1>
                <div className="userFormInf">
                    <label htmlFor="firstName"><i className="fa-solid fa-user"></i></label>
                    <input type="text" placeholder='First Name' id='firstName'
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    <input type="text" placeholder='Last Name' 
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div>
                <div className="userFormInf">
                    <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>                   
                    <input className='inputInf' type="email" placeholder='Email' id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />                
                </div>
                <div className="userFormInf">
                    <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>                   
                    <input className='inputInf' type="password" placeholder='Password' id='password'
                        onChange={(e)=>setPassword(e.target.value)}
                        value={contrasena}
                    />
                </div>
                <div className="userFormInf">
                    <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>                   
                    <input className='inputInf' type="date" id='birthday'
                        onChange={(e)=>setBirthday(e.target.value)}
                        value={cumple}
                    />
                </div>
                <div className='userFormInf'>
                    <button className='btn'>{userSelected!=null?"Update":"Create"}</button>
                    {userSelected!=null&&<button className='btn' type='button' onClick={()=>cancelUser()}>Cancel</button>}
                </div>
            </div>
        </form>
        
    );
    
};

export default UserForm;