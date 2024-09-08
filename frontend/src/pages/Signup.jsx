import React, { useState } from 'react';
import RadioButton from '../components/RadioButton';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowLongRight } from 'react-icons/hi2';
import { FaUserClock, FaUserPlus } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { SIGN_UP } from '../graphql/mutations/user.mutation';
import toast from "react-hot-toast";
import { useMutation } from '@apollo/client';

function Signup() {
     const [signUpData, setSignUpData] = useState({
          name: "",
          username: "",
          email: "",
          password: "",
          gender: "",
     });

     const [signup, { loading, error }] = useMutation(SIGN_UP, {
          refetchQueries: ["GetAuthenticatedUser"],
     });

     const navigate = useNavigate(); // Initialize useNavigate

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               await signup({
                    variables: {
                         input: signUpData,
                    },
               });
               toast.success("Signup successful");
               navigate('/home'); // Navigate to /home after successful signup
          } catch (error) {
               console.error("Error:", error);
               toast.error(error.message);
          }
     };

     const handleChange = (e) => {
          const { name, value, type } = e.target;

          if (type === "radio") {
               setSignUpData((prevData) => ({
                    ...prevData,
                    gender: value,
               }));
          } else {
               setSignUpData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          }
     };

     return (
          <div className='p-8 max-w-md w-full mx-auto bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400 rounded-3xl shadow-lg '>
               <div className='p-3 max-w-80 w-full mx-auto gap-5 flex justify-center  bg-gradient-to-br from-purple-400 via-purple-700 to-purple-400 rounded-2xl'>
                    <FaUserPlus className='text-cyan-500 text-3xl' />
                    <HiArrowLongRight className='flex items-center text-white text-3xl' />
                    <FaUserClock className='text-white text-3xl' />
                    <HiArrowLongRight className='flex items-center text-white text-3xl' />
                    <MdPayment className='flex items-center text-white text-3xl' />
               </div>
               <div className='p-4 max-w-md w-full mx-auto'>
                    <h1 className='text-4xl text-center font-semibold my-8 text-slate-100'>Sign Up</h1>
                    <form className='flex flex-col gap-6 text-slate-200' onSubmit={handleSubmit}>
                         <input
                              className='p-3 rounded-lg bg-white text-black'
                              type='text'
                              placeholder='Full Name'
                              id='name'
                              name='name'
                              value={signUpData.name}
                              onChange={handleChange}
                         />
                         <input
                              className='p-3 rounded-lg bg-white text-black'
                              type='text'
                              placeholder='Username'
                              id='username'
                              name='username'
                              value={signUpData.username}
                              onChange={handleChange}
                         />
                         <input
                              className='p-3 rounded-lg bg-white text-black'
                              type='email'
                              placeholder='Email'
                              id='email'
                              name='email'
                              value={signUpData.email}
                              onChange={handleChange}
                         />
                         <input
                              className='p-3 rounded-lg bg-white text-black'
                              type='password'
                              placeholder='Password'
                              id='password'
                              name='password'
                              value={signUpData.password}
                              onChange={handleChange}
                         />
                         <div className='flex gap-10 '>
                              <RadioButton
                                   id='male'
                                   label='Male'
                                   name='gender'
                                   value='male'
                                   checked={signUpData.gender === "male"}
                                   onChange={handleChange}
                              />
                              <RadioButton
                                   id='female'
                                   label='Female'
                                   name='gender'
                                   value='female'
                                   checked={signUpData.gender === "female"}
                                   onChange={handleChange}
                              />
                         </div>
                         <div>
                              <button
                                   type='submit'
                                   className='w-full bg-slate-100 text-white p-3 rounded-lg:bg-black focus:ring-2 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-900  rounded-2xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                   disabled={loading}
                              >
                                   {loading ? "Loading..." : "Sign Up"}
                              </button>
                              {error && (
                                   <p className='text-red-500 text-sm mt-2'>{error.message}</p>
                              )}
                         </div>
                    </form>
                    <div className='mt-6 text-sm text-slate-100 text-left'>
                         <p>
                              Already have an account?{" "}
                              <Link to='/login' className='text-white hover:underline p-4'>
                                   Login
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}

export default Signup;
