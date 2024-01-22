import '../assets/styles/login.scss';
import dacoImage from '../assets/images/Daco.png';
import harryPotter from '../assets/images/harryPotter.png'
import React, { useState } from 'react'
import ParticleCustom from '../components/particles/particleCustom';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux'
import { getUserData } from '../store/movieList/movie.action';


export function Login() {
    const dispatch = useDispatch();
    const { userData } = useSelector( store => ({
        userData: store.dataReducer.userData
    }) )

    const { register,
            handleSubmit,
            formState: { errors },
            reset,      
    } = useForm();
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState(false);

    const onSubmit = (data) => {
        const combinedData = {...data};
        const loginData = {...userData}
        dispatch(getUserData(combinedData))
        if (data.Username === "Admin1" && data.Password === "Admin1") {
            reset();
            setLoginError(false);
            navigate('/home');
        } else if (data.Username === loginData.name && data.Password === loginData.password) {
            navigate('/home');
            reset();
        } else {
            setLoginError(true);
        }
    }

  return (
    <>
        <ParticleCustom/>
        <div className="wrapper">
            <div className="image_box">
                <div className="image_smoke">
                    <img src={dacoImage} alt=''/>
                </div>
                <div className="image_potter">
                    <img draggable="false" src={harryPotter} alt=''/>
                </div>
            </div>
            <div className="box">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="form__title">Sign in</h2>
                    <div className="form__box">
                        <input
                            className={`form__input ${errors.Username || (loginError && 'error') ? "error" : ""}`}
                            type="text" 
                            title='Username'
                            {...register("Username", {
                                required: true,
                                validate: (value) => !!value.trim(),
                            })}
                        />
                        <span className="form__span">Username</span>
                        <i className="form__line"></i>
                    </div>
                    <div className="form__box">
                        <input  
                            className={`form__input ${errors.Password || (loginError && 'error') ? "error" : ""}`}
                            type="password" 
                            title='Password'
                            {...register("Password", {
                                required: true,
                                validate: (value) => !!value.trim(),
                            })}
                        />
                        <span className="form__span">Password</span>
                        <i className="form__line"></i>
                    </div>
                    <div className="form__links">
                        <a className="form__link" href="#">Forgot Password</a>
                        <Link to={'/register'} className="form__link">Sign Up</Link>
                    </div>
                    <button className="form__submit">Login</button>
                </form>
            </div>
        </div>
    </> 
  )
}
