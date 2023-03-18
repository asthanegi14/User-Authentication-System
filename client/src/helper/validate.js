import toast from 'react-hot-toast';
import { authenticate } from './helper';

/**validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
    if(values.username){
        //checking user's existance
        const {status} = await authenticate(values.username);

        if(status!==200){
            errors.exist = toast.error('User does not exist');
        }
    }
    return errors;
}


/**validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({},values);

    return errors;
}





/**validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({},values);

    if(values.password !== values.conf_pass){
        errors.exist = toast.error("Password does't match...!");
    }

    return errors; 
}


/**validate register form */
export async function registerValidate(values){
    const errors = usernameVerify({},values);
    passwordVerify(errors, values);
    emailVerify(errors,values);

    return errors;
}




/**profile validation */
export async function profileValidate(values){
    
    const errors = emailVerify({},values);
    return errors;
}


/**validate password */
function passwordVerify(errors = {},values){
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if(!values.password){
        errors.password = toast.error("Password Required...!");
    }
    else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password!");
    }
    else if(values.password.length<6){
        errors.password = toast.error("Password must contain more than 6 characters...");
    }
    else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must contain one special character...");
    }

    return errors;
}


/**validate username */
function usernameVerify(error = {},values){
    if(!values.username){
        error.username = toast.error('Username required!!!');
    }
    else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username!!!')
    }

    return error;
}


/**validate email */
function emailVerify(error = {},values){
    if(!values.email){
        error.email = toast.error("Email Required...");
    }
    // else if(values.email.includes(" ")){
    //     error.email = toast.error("Wrong Email...");
    // }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid Email address...");
    }

    return error;
}
