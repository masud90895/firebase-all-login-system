import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export const UserContext = createContext('')
const Main = () => {
    const [user,setUser] =useState('')
    return (
        <UserContext.Provider value={[user,setUser]}>

            <Header></Header>
            <Outlet></Outlet>
        </UserContext.Provider>
        
    );
};

export default Main;