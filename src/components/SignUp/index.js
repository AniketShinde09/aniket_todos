import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {v4 as uuidv4} from 'uuid'
import {Link} from 'react-router-dom'
import './index.css'

const SignUp = () => {
    const [newUserName, setNewUser] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    const history = useHistory()

    const onEnterUsername = e => {
        setNewUser(e.target.value)
    }

    const onEnterEmail = e => {
        setNewUserEmail(e.target.value)
    }

    const onEnterPassword = e => {
        setNewUserPassword(e.target.value)
    }

    const onSubmitForm = e => {
        e.preventDefault();
    
        const newUser = {
            id: uuidv4(),
            username: newUserName,
            email: newUserEmail,
            password: newUserPassword,
        };
    
        const data = localStorage.getItem('userData');    
        const existingUsers = data ? JSON.parse(data) : [];
        const updatedData = [...existingUsers, newUser];
    
        localStorage.setItem('userData', JSON.stringify(updatedData));
    
        setNewUser('');
        setNewUserEmail('');
        setNewUserPassword('');
    
        history.replace("/login");
    };
    
    useEffect(() => {
        const data = localStorage.getItem('userData');
        console.log("LocalStorage on mount:", data);
    }, []); 
        
    

    return (
        <div className="login-section-container">
            <div className="login-card">
                <h1 className="todos-main-heading">TODOS</h1>
                <form className="login-form-container" onSubmit={onSubmitForm}>
                    <label htmlFor="createUsername" className="label" >Username</label>
                    <input type="text" id="createUsername" className="input-box" onChange={onEnterUsername} value={newUserName} placeholder="Enter your username" required/>
                    <label htmlFor="createEmail" className="label">Email</label>
                    <input type="email" id="createEmail" className="input-box" onChange={onEnterEmail} value={newUserEmail} placeholder="Enter your Email" required/>
                    <label htmlFor="createPassword" className="label">Password</label>
                    <input type="password" id="createPassword" className="input-box" onChange={onEnterPassword} value={newUserPassword} placeholder="Enter your username" required/>
                    <button type="submit" className="login-btn">Sign Up</button>
                </form>
                
                <p className="create-account-text">Already you have an account? <Link to="/login"> Login </Link></p>
            </div>
        </div>
    )
}

export default SignUp

/*
<p className="error-msg">Enter valid password</p>
*/