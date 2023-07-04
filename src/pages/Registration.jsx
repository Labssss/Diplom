import React, {useContext, useRef, useState} from 'react';
import {CustomContext} from "../Context";
import InputMask from 'react-input-mask';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

export function Registration () {


    const {setUser, grantRole, setIsLogged} = useContext(CustomContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const registerUser = async (data) => {
        await fetch(`https://${process.env.REACT_APP_DOMAIN}:3001/auth/registration/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(async (response) => {
            if (response.status < 200 || response.status >= 300) {
                const {message} = await response.json()
                setError(message)
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data)
            setIsLogged(true)
            grantRole(data)
            navigate('/')
        });

    };

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        watch,
        reset
    } = useForm({
            mode: 'onBlur'
        }
    );
    const password = useRef({});
    password.current = watch("password", "");




    return (
            <section className="h-screen w-2/3 mx-auto">
                <div className="px-6 h-full text-gray-800">
                    <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                    >
                    <div
                        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                    >
                        <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="w-full"
                        alt="Sample image"
                        />
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form onSubmit={handleSubmit(registerUser)}>
                        <div className="mb-6">
                            <input
                            type="email"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Email address"
                            {...register('email')}
                            required
                            />
                        </div>

                        <div className="mb-6">
                            <InputMask
                            mask={`+\\7\\(999)999-99-99`}
                            type='tel'
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Phone number"
                            {...register('phone')}
                            minLength="16"
                            required
                            />
                        </div>
    
                        <div className="mb-6">
                            <input
                            type="password"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Password"
                            {...register('password')}
                            minLength="4"
                            maxLength="20"
                            required
                            />
                        </div>

                        <div>
                            <input
                            type="password"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Confirm password"
                            {...register('confirmPwd', {
                                validate: value =>
                                    value === password.current || "The password do not match"
                            })}
                            minLength="4"
                            maxLength="20"
                            required
                            />
                        </div>
                        
                        <p className='text-start text-red-500 py-2'>{(errors?.confirmPwd && errors?.confirmPwd?.message) || error }</p>
    
                        <div className="text-center lg:text-left">
                            <button
                            type="submit"
                            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                            Регистрация
                            </button>
                            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                            Уже есть аккаунт?
                            <Link className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out' to='/login'> Войти</Link>
                            </p>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </section>
    );
};
