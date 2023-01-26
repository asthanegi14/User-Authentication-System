import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/profile1.jpg';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {profileValidate} from '../helper/validate';


const Profile = () => {

  const formik = useFormik({
    initialValues: {
      firstname:'',
      lastname:'',
      email:'',
      mobile:'',
      address:''
    },
    validate: profileValidate,
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
        <div className={styles.glass} style={{ width: "45%", paddingTop: '3em'}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Kya re bhikhmangeya
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>

            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={avatar} className={styles.profile_img} alt = "profile picture"/>
              </label>
            </div>

            <div className="textbox flex flex-col items-center gap-6">

              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstname')} className={styles.textbox} type="text" placeholder="Firstname*"/>
                <input {...formik.getFieldProps('lastname')} className={styles.textbox} type="text" placeholder="Lastname*"/>
              </div>

              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} className={styles.textbox} type="text" placeholder="Mobile No.*"/>
                <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder="Email*"/>
              </div>

                <input {...formik.getFieldProps('address')} className={styles.textbox} type="text" placeholder="Address*"/>
                <button className={styles.btn} type="submit">Update</button>

            </div>

            <div className="text-center py-4">
              {/* using Link instead of a tag so that it will redirect to register page without reloading  */}
              <span className="text-gray-500" >Are you done? <Link to="/" className="text-red-500" >Logout</Link> </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export  default Profile;