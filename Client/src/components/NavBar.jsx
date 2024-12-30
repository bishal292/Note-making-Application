import React, { useContext, useState } from 'react'
import { ApiClient } from '../lib/ApiClient'
import { LOGOUT_ROUTE } from '../lib/constant'
import { UserDataContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {

    const {setUser} = useContext(UserDataContext);
    const navigate = useNavigate();

    const handleLogout = async ()=> {
        try{
            const response = await ApiClient.get(LOGOUT_ROUTE);
            console.log(response);
            if(response.status === 200){
                setUser({});
                
                navigate("/auth/login");
            }

        }catch(error){
            console.error(`Error Logging out : ${error}`);
        }
    }

  return (
    <>
    <nav className="flex items-center justify-between p-5">
        <Link to={"/"} className="text-2xl font-semibold text-gray-800">
            NOTE-M-App
        </Link>
        <div>
            <button onClick={handleLogout} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">
                Logout
            </button>
        </div>
    </nav>
    </>
  )
}

export default Navbar
