import React from "react";

const userInfo = [
    {
      id: 1,
      username: 'ravi',
      email: 'ravi@gmail.com',
      password: 'ravi@123',
    },
    {
      id: 2,
      username: 'srikanth',
      email: 'srikanth@gmail.com',
      password: 'srikanth@123',
    },
]

const context = React.createContext({
    userData: userInfo,
    updateUserData: () => {},
})

export default context