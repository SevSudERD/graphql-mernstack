import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserClock } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { HiArrowLongRight } from 'react-icons/hi2';
import { MdPayment } from 'react-icons/md';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations/user.mutation';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Login() {
     const [loginData, setLoginData] = useState({
          username: "",
          password: "",
     });

     const [login, { loading }] = useMutation(LOGIN, {
          refetchQueries: ['GetAuthenticatedUser']
     });

     const navigate = useNavigate();

     const handleChange = (e) => {
          const { name, value } = e.target;
          setLoginData(prevState => ({
               ...prevState,
               [name]: value,
          }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!loginData.username || !loginData.password)
               return toast.error("please fill in all fields");
          console.log(loginData);
          try {
               await login({ variables: { input: loginData } });
               toast.success("login successful");
               navigate('/home');
          } catch (error) {
               console.error("error logging in:", error);
               toast.error(error.message);
          }
     };

     return (
          <div className='p-8 max-w-md w-full mx-auto bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400 rounded-3xl shadow-lg'>
               <div className='p-3 max-w-72 w-full mx-auto gap-4 flex justify-center bg-gradient-to-br  from-purple-400 via-purple-700 to-purple-400 rounded-2xl'>
                    <FaUserPlus className='text-3xl text-white' />
                    <HiArrowLongRight className='flex items-center  text-white text-3xl' />
                    <FaUserClock className='text-cyan-500 text-3xl' />
                    <HiArrowLongRight className='flex items-center  text-white text-3xl' />
                    <MdPayment className='flex items-center  text-white text-3xl' />
               </div>
               <div>
                    <h1 className='text-4xl text-center font-semibold my-8 text-slate-100'>Login</h1>
                    <form className='flex flex-col gap-6 text-slate-200' onSubmit={handleSubmit}>

                         <input
                              className='p-3 rounded-lg bg-white text-black'
                              type='text'
                              placeholder='Username'
                              id='username'
                              name='username'
                              value={loginData.username}
                              onChange={handleChange}
                         />
                         <input
                              className='p-3 rounded-lg bg-white text-black'
                              type='password'
                              placeholder='Password'
                              id='password'
                              name='password'
                              value={loginData.password}
                              onChange={handleChange}
                         />

                         <div>
                              <button
                                   type='submit'
                                   className='w-full bg-slate-100 text-white p-3 rounded-lg:bg-black focus:ring-2 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-900  rounded-2xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                   disabled={loading}
                              >
                                   {loading ? "Loading..." : "Login"}
                              </button>
                         </div>
                    </form>
                    <div className='mt-6 text-sm text-slate-100 text-left'>
                         <p>
                              Dont't have an account?{" "}
                              <Link to='/' className='text-white hover:underline p-4'>
                                   Sign Up
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}

export default Login;
