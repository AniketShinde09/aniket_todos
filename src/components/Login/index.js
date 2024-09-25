import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [noUserMsg, setNoUserMsgStatus] = useState(false)
    const [invalidUser, setInvalidUserStatus] = useState(false)
    const history = useHistory();
    

    const onEnterUsername = event => {
        setUsername(event.target.value)
    }

    const onEnterPassword = event => {
        setPassword(event.target.value)
    }

    console.log(userName)

    const onClickLogin = event => {
        event.preventDefault()

        const findUser = localStorage.getItem('userData')
        console.log(findUser)
        const data = JSON.parse(findUser)
        const checkUser = data.find(each => 
            each.username === userName
        )

        console.log(checkUser)

        if(checkUser === undefined){
            setNoUserMsgStatus(true)
        }
        else if((checkUser.username !== userName) || (checkUser.password !== password)){
            setInvalidUserStatus(true)
            setUsername('')
            setPassword('')
        }
        else{
            Cookies.set('username', userName, {expires: 30, path: "/"})
            history.replace("/")
        }
    }

    return (
        <div className="login-section-container">
            <div className="login-card">
                <h1 className="todos-main-heading"> TODOS</h1>
                <form className="login-form-container" onSubmit={onClickLogin}>
                    <label htmlFor="username" className="label">Username</label>
                    <input type="text" id="username" className="input-box" onChange={onEnterUsername} placeholder="Enter your username" required/>
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" id="password" className="input-box" onChange={onEnterPassword} placeholder="Enter your password" required/>
                    <button type="submit" className="login-btn" >Login</button>
                </form>
                {noUserMsg && <p className="error-msg">User Doesn't exist</p>}
                {invalidUser && <p className="error-msg">Username and Password Invalid</p>}
                <p className="create-account-text">Don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login