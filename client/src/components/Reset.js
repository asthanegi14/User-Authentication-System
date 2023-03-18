import React, { useEffect } from 'react';
import styles from '../styles/Username.module.css';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {resetPasswordValidation} from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

const Reset = () =>{

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')

  useEffect(() => {
    console.log(apiData)
  })
  const formik = useFormik({
    initialValues: {
      password: 'admin@123',
      conf_pass: 'admin@123'
    },

    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values);

      let resetPromise = resetPassword({ username, password: values.password })

      // console.log(resetPromise);
      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully</b>,
        error: <b>Could not Reset</b>
      });

      resetPromise.then(function(){ navigate('/password') })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold' >Loading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'> {serverError.message} </h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div className="container mx-auto">
      <Toaster reverseOrder={false} position="top-center items-center h-screen"></Toaster>
      
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{width: "50%"}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Ek password yaad ni rakh sakta ye cutiya
            </span>
          </div>

          <form className="py-10" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">

              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder="New password"/>

              <input {...formik.getFieldProps('conf_pass')} className={styles.textbox} type="text" placeholder="Confirm password"/>

              <button className={styles.btn} type="submit">Reset</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}


export default Reset;