import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Header from './Components/Header'
import Home from './Components/Home';
import Login from './Components/Login';
import Main from './Components/Main';
import Register from './Components/Register';



const router =createBrowserRouter([
	{
		path: '/',
       element:<Main></Main>,
	   children: [
		{
            path: '/',
			element:<Register></Register>,
		},
		{
            path: '/register',
			element:<Register></Register>,
		},
		{
            path: '/login',
			element: <Login></Login>
		},
		{
            path: '/home',
			element: <Home></Home>
		},
	   ]
	}
])

function App() {

  return (
    <div className="App">
		<RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
