import React, { useContext } from 'react';
import { UserContext } from './Main';
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase.init";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const auth = getAuth(app);

const Header = () => {
  const [user,setUser] = useContext(UserContext)
  const navigate = useNavigate();
  const logOut=()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        setUser(null);
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Log out successfully',
          showConfirmButton: false,
          timer: 1500
          })
        navigate("/login");
      }).catch((error) => {
        // An error happened.
      });
}
    return (
        <div className="navbar flex-col-reverse md:flex-row bg-gray-900 text-white"> 
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">All Log in setup</a>
  </div>
  <div className="flex-none">
          <h3 className='mr-3'>{user?.displayName}</h3>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={user?.photoURL}/>
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-900 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        {
          user ? <li><Link onClick={logOut}>Logout</Link></li> : ''
        }
      </ul>
    </div>
  </div>
</div>
    );
};

export default Header;