import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/profile1.jpg';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {passwordValidate} from '../helper/validate';


const Recovery = () => {

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

  return (
    <div className="container mx-auto">
      <Toaster position="top-center items-center h-screen"></Toaster>
      
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Sending OTP to recover your password.
            </span>
          </div>

          <form className="pt-20" onSubmit={formik.handleSubmit}>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter your 6 digit OTP sent to your email.
                </span>
                <input className={styles.textbox} type="text" placeholder="OTP"/>
              </div>

              <button className={styles.btn} type="submit">Confirm</button>
            </div>
            </form>
            <div className="text-center py-4">
              {/* using Link instead of a tag so that it will redirect to register page without reloading  */}
              <span className="text-gray-500" >Did't receive OTP? <button  className="text-red-500" >Resend OPT</button> </span>
            </div>
        </div>
      </div>
    </div>
  )
}
export  default Recovery;