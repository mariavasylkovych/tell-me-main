import React from 'react';

import '../scss/components/user-page.scss'

import { Link } from 'react-router-dom';

const UserPage = () => {
  let dataAboutUser = JSON.parse(localStorage.user)

    return (
        <div className='user-page'>
            <div className='user-information'>
                <h2>About <span>{dataAboutUser.firstname}</span></h2>
                <ul>
                    <li>
                        <p className='p-name-inf'>firstname:</p>
                        <p className='p-value-inf'>{dataAboutUser.firstname}</p>
                    </li>
                    <li>
                        <p className='p-name-inf'>lastname:</p>
                        <p className='p-value-inf'>{dataAboutUser.lastname}</p>
                    </li>
                    <li>
                        <p className='p-name-inf'>age:</p>
                        <p className='p-value-inf'>{dataAboutUser.age}</p>
                    </li>
                    <li>
                        <p className='p-name-inf'>email:</p>
                        <p className='p-value-inf'>{dataAboutUser.email}</p>
                    </li>
                    
                </ul>
            </div>
            <div className='title'>
                <img src={dataAboutUser.avatar} alt="" />
                <Link to='/'><h2> Tell <span>me</span></h2></Link>
            </div>
        </div>
    )
}

export default UserPage;