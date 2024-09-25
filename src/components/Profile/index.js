import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Cookie from 'js-cookie';
import Header from '../Header';
import './index.css';

const Profile = () => {
    const userName = Cookie.get('username');
    const [userData, setUserData] = useState(null);
    const history = useHistory();

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('********'); 
    const [emailInput, setEmailInput] = useState('');

    useEffect(() => {
        const data = localStorage.getItem('userData');
        if (data) {
            const parsedData = JSON.parse(data);
            const filterUserData = parsedData.filter(each => each.username === userName);
            if (filterUserData.length > 0) {
                setUserData(filterUserData[0]);
                setUsernameInput(filterUserData[0].username);
                setEmailInput(filterUserData[0].email);
            }
        }
    }, [userName]);

    const handleSave = (field) => {
        if (userData) {
            const updatedUserData = { ...userData };

            if (field === 'username') {
                updatedUserData.username = usernameInput;
                setIsEditingUsername(false);
            } else if (field === 'password') {
                updatedUserData.password = passwordInput;
                setIsEditingPassword(false);
            } else if (field === 'email') {
                updatedUserData.email = emailInput;
                setIsEditingEmail(false);
            }

            setUserData(updatedUserData);

            const storedData = JSON.parse(localStorage.getItem('userData')) || [];
            const updatedStoredData = storedData.map(user =>
                user.username === userData.username ? updatedUserData : user
            );

            localStorage.setItem('userData', JSON.stringify(updatedStoredData));
            Cookie.remove('username');
            history.push('/login');
        }
    };

    const onClickHome = () => {
        history.replace("/")
    }

    

    return (
        <>
            <Header />
            <div className="profile-container">
                <h1 className="profile-heading">Profile</h1>
                <div>

                    <div className="each-detail-container">
                        {isEditingUsername ? (
                            <>
                                <input
                                    type="text"
                                    value={usernameInput}
                                    onChange={(e) => setUsernameInput(e.target.value)}
                                    className="user-details"
                                />
                                <button type="button" className="save-btn" onClick={() => handleSave('username')}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="user-details-highlghts">
                                    Username: <span className="user-details">{usernameInput}</span>
                                </p>
                                <button type="button" className="update-btn" onClick={() => setIsEditingUsername(true)}>
                                    Update
                                </button>
                            </>
                        )}
                    </div>


                    <div className="each-detail-container">
                        {isEditingPassword ? (
                            <>
                                <input
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    className="user-details"
                                />
                                <button type="button" className="save-btn" onClick={() => handleSave('password')}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="user-details-highlghts">
                                    Password: <span className="user-details">********</span>
                                </p>
                                <button type="button" className="update-btn" onClick={() => setIsEditingPassword(true)}>
                                    Update
                                </button>
                            </>
                        )}
                    </div>


                    <div className="each-detail-container">
                        {isEditingEmail ? (
                            <>
                                <input
                                    type="email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    className="user-details"
                                />
                                <button type="button" className="save-btn" onClick={() => handleSave('email')}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="user-details-highlghts">
                                    Email: <span className="user-details">{emailInput}</span>
                                </p>
                                <button type="button" className="update-btn" onClick={() => setIsEditingEmail(true)}>
                                    Update
                                </button>
                            </>
                        )}
                    </div>

                    <button  type='button' className='home-btn' onClick={onClickHome}> Home </button>
                </div>
            </div>
        </>
    );
};

export default Profile;
