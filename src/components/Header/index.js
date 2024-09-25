import {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { IoIosContact   } from "react-icons/io";

import './index.css'

const Header = () => {
    const history = useHistory();

    
    const onClickProfile = () => {
        history.replace("/profile")
    }

    const onClickLogout = () => {
        history.replace("/login")
    }

    return (
        <nav className='header-container'>
            
            <button type='button' className='profile-icon-btn' onClick={onClickProfile}><IoIosContact   className='profile-icon'/></button>
            <button type='button' className='logout-btn' onClick={onClickLogout}>Logout</button>
        </nav>
    )
}

export default Header