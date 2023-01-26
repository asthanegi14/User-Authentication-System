import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/profile1.jpg';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {resetPasswordValidation} from '../helper/validate';


const Reset = () => {

  const formik = useFormik({
    initialValues: {
      password:'',
      conf_pass: ''
    },
    validate: resetPasswordValidation,
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
        <div className={styles.glass} style={{width: "50%"}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Ek password yaad ni rakh sakta ye cutiya
            </span>
          </div>

          <form className="py-10" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
            </div>
            <div className="textbox flex flex-col items-center gap-6">

              <input {...formik.getFieldProps('New password')} className={styles.textbox} type="text" placeholder="New password"/>

              <input {...formik.getFieldProps('Confirm password')} className={styles.textbox} type="text" placeholder="Confirm password"/>

              <button className={styles.btn} type="submit">Reset</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
export  default Reset;