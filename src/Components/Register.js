import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import app from "../firebase.init";
import Swal from "sweetalert2";
import { UserContext } from "./Main";

const auth = getAuth(app);
const Register = () => {
  const [user,setUser] = useContext(UserContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    if (!/.{8}/) {
      setError("please provide 6 digits number");
      return;
    }
    setPassword(e.target.value);
  };

  const addFirebase = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setError("");
        changeName();
        emailVarification();
        console.log(user);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Register Successfully.Check Email",
          showConfirmButton: false,
          timer: 1500,
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };

  const changeName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        setError("");
        // ...
      })
      .catch((error) => {
        // An error occurred
        setError(error.message);
        // ...
      });
  };

  const emailVarification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  // google sing in
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Register Successfully.Check Email",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("error: ", error);
        setError(error.message);
      });
  };

  // github sing in
  const handlegithubSingIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Register Successfully.Check Email",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("error: ", error);
        setError(error.message);
      });
  };
// facebook sing in 
const handleFacebookSingIn=()=>{
  signInWithPopup(auth, facebookProvider)
    .then(result => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Register Successfully.Check Email',
        showConfirmButton: false,
        timer: 1500
        })
    })
    .catch(error => {
      console.error('error: ', error);
      setError(error.message)
    })
}
useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      setUser(user)
    } else {
      // User is signed out
      // ...
    }
  });
},[])




  return (
    <div className="w-full mx-auto mt-5 max-w-md p-8 space-y-3 rounded-xl  bg-gray-900  text-gray-100">
      <h1 className="text-2xl text-red-600 ">{error}</h1>
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <form
        noValidate=""
        action=""
        className="space-y-6 ng-untouched ng-pristine ng-valid"
      >
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block  text-gray-400">
            Name
          </label>
          <input
            onBlur={handleName}
            type="text"
            name="name"
            id="name"
            placeholder="name"
            className="w-full bg-yellow-200 px-4 py-3 rounded-md  border-gray-700    text-black focus: border-violet-400"
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block  text-gray-400">
            Email
          </label>
          <input
            onBlur={handleEmail}
            type="text"
            name="email"
            id="email"
            placeholder="email"
            className="w-full px-4 py-3 rounded-md  border-gray-700  bg-yellow-200  text-black focus: border-violet-400"
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block  text-gray-400">
            Password
          </label>
          <input
            onBlur={handlePassword}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md  border-gray-700  bg-yellow-200  text-black focus: border-violet-400"
            required
          />
        </div>
        <button
          onClick={addFirebase}
          className="block w-full p-3 text-center rounded-sm  text-gray-900  bg-violet-400"
        >
          Register
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16  bg-gray-700"></div>
        <p className="px-3 text-sm  text-gray-400">
          Register with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16  bg-gray-700"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleGoogleSingIn}
          aria-label="Log in with Google"
          className="p-3 rounded-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
        <button
        onClick={handleFacebookSingIn}
        aria-label="Log in with Twitter" className="p-3 rounded-sm">
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            className="w-7 h-7 fill-current"
          >
            {" "}
            <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z" />
          </svg>
        </button>
        <button
          onClick={handlegithubSingIn}
          aria-label="Log in with GitHub"
          className="p-3 rounded-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
          </svg>
        </button>
      </div>
      <p className="text-xs text-center sm:px-6  text-gray-400">
        you already have an account?
        <Link className="underline  text-gray-100" to="/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;