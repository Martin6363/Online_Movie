import React, { useEffect, useState } from 'react'
import '../assets/styles/register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { addUserData } from '../store/movieList/movie.action';

export function Signup() {
    const dispatch = useDispatch();
    const { userData } = useSelector( store => ({
        userData: store.dataReducer.userData
    }) )

    const navigate = useNavigate()
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const { register,
            handleSubmit,
            formState: { errors },
            watch,
            reset,      
    } = useForm();

    const onSubmit = (data) => {
        const updatedUserData = {...userData, ...data};
        dispatch(addUserData(updatedUserData));
        reset();
        Swal.fire({
          title: 'Success!',
          text: 'Can you log in',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/')
          }
        });
    };

    useEffect(() => {
        const password = watch('password');
        const confirmPassword = watch('confirmPassword');
        setPasswordMatchError(password !== confirmPassword);
      }, [watch]);

  return (
    <div className="signup-wrapper">
        <div className="signup_box">
        <h2 className="title">Sign Up</h2>
        <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input_box">
                <input className={errors.name ? "invalid" : "input"}
                    type='text'
                    {...register("name", {
                        required: "Name is required",
                        pattern: {
                        value: /^(?! +$).*$/,
                        message: "Name must not be empty",
                        },
                    })}
                />
                <span className="span">Username</span>
                <small>{errors.name && errors.name.message}</small>
            </div>
            <div className="input_box">
                <input className={errors.surname ? "invalid" : "input"}
                    type='text'
                    {...register("surname", {
                        required: "Surname is required",
                        pattern: {
                        value: /^(?! +$).*$/,
                        message: "Surname must not be empty",
                        },
                    })}
                />
                <span className="span">Surname</span>
                <small>{errors.surname && errors.surname.message}</small>
            </div>
            <div className="input_box">
                <input className={errors.email ? "invalid" : "input"}
                    type='text'
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email format',
                        },
                    })}
                />
                <span className="span">Email</span>
                <small>{errors.email && errors.email.message}</small>
            </div>
            <div className="input_box">
                <input className={errors.password ? "invalid" : "input"}
                    type="password" 
                    {...register("password",{ 
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: "Password must be 8-16 characters long"
                        },
                        maxLength: {
                            value: 16,
                            message: "Password must be 8-16 characters long"
                        },
                    }
                    )}
                />
                <span className="span">Password</span>
                <small>{errors.password && errors.password.message}</small>
            </div>
            <div className="input_box">
                <input
                    className={passwordMatchError ? 'invalid' : errors.confirmPassword ? 'invalid' : 'input'}
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: (value) =>
                        value === watch('password') || 'Passwords do not match',
                    })}
                />
                <span className="span">Confirm password</span>
                <small>{errors.confirmPassword && errors.confirmPassword.message}</small>
            </div>
            <div className="links">
                <Link to={'/'} className="login-link">login account</Link>
            </div>
            <button className="submit">Register</button>
        </form>
    </div>
    </div>
  )
}
