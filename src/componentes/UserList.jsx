import React from 'react';
import swal from 'sweetalert'
import axios from 'axios';

const UserList = ({ users, getUser, selectUser}) => {

    const selectUserDelect=(user)=>{
        swal({
            title:'You want to delete the user',
            text:`${user.first_name} ${user.last_name}`,
            icon:'warning',
            buttons:['Cancel', 'Accept']
        }).then(res=>{
            if(res){
                axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
                    .then(()=>getUser());
                swal({
                    text:'Usuario Eliminado',
                    icon:'success',
                    timer:'1000'
                })
            }
        })
    }

    return (
        <div className="contenedorUserList">
            <div className='userList'>
                {users.map(user => (
                    <ul key={user.id} className="cardUser">
                        <div className='cardUserInf'>
                            <div className='cardInf'>
                                <li>{user.first_name}</li>
                                <li>{user.last_name}</li>
                            </div>
                            <li><span>{user.email}</span></li>
                            <div className='cardInf'>
                                <i className="fa-solid fa-cake-candles"></i>
                                <li>{user.birthday}</li>
                            </div>
                        </div>
                        <div className="cardUserBtn">
                            {/* <i className="fa-solid fa-trash-can" onClick={()=>deleteUser(user.id)}></i> */}
                            <i className="fa-solid fa-trash-can" onClick={()=>selectUserDelect(user)}></i>
                            <i className="fa-solid fa-pencil" onClick={()=>selectUser(user)}></i>
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    );

};

export default UserList;