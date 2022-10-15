import React, { useContext, useEffect } from "react";
import Lottie from "lottie-react";
import animationImage from "../images/97639-coding";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase.init";
import { UserContext } from "./Main";

const auth = getAuth(app);
const Home = () => {
    const [user,setUser] = useContext(UserContext)
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
    <section className=" bg-gray-800 h-screen text-gray-100">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leading-none sm:text-6xl flex flex-col md:grid">
            Ac mattis
            <span className=" text-violet-400">senectus</span>erat pharetra
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Dictum aliquam porta in condimentum ac integer
            <br className="hidden md:inline lg:hidden" />
            turpis pulvinar, est scelerisque ligula sem
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold rounded  bg-violet-400  text-gray-900"
            >
              Suspendisse
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold border rounded  border-gray-100"
            >
              Malesuada
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          {/* <img
            src={animationImage}
            alt=""
            className="object-contain"
          /> */}
          <Lottie animationData={animationImage} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Home;
