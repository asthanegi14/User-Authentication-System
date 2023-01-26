import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/profile1.jpg';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {passwordValidate} from '../helper/validate';
import useFetch from '../hooks/fetch.hook.js';
import { useAuthStore } from '../store/store.js';

const Password = () => {
  const {username} = useAuthStore(state=>state.auth) 
  const [{isLoading, apiData, serverError}] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues: {
      password:''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values)
    }
  })

  if(isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>

  if(serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>


  return (
    <div className="container mx-auto">
      <Toaster position="top-center items-center h-screen"></Toaster>
      
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello {apiData?.firstName || apiData?.username}</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Exlpore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt = "profile picture"/>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder="Password"/>
              <button className={styles.btn} type="submit">Login</button>
            </div>

            <div className="text-center py-4">
              {/* using Link instead of a tag so that it will redirect to register page without reloading  */}
              <span className="text-gray-500" >Forgot Password? <Link to="/recovery" className="text-red-500" >Recover Password</Link> </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export  default Password;