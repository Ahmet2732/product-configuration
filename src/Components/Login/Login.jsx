import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Style from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'; 
import { UserContext } from '../../Context/userContext';

export default function Login() {
  let {setUserToken} =useContext(UserContext)
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false)

    async function LoginSubmit(values) {
        setLoading(true); // Set loading to true when starting the request
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
            console.log(data);  // Log the response to inspect the structure
            // Check if the response indicates success
            if (data.message === "success") {
                // Assuming the correct key for the token is "token" (you should check this)
                localStorage.setItem("userToken", data.token);
                setUserToken(data.token);
                navigate("/Home"); // Navigate to the home page on success
            } else {
                setError(data.message); // Set error message if not successful
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } 
    }
    

    // Validation schema using Yup
    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password too short').required('Password is required'),
    });

    // useFormik hook for managing the form
    const formik = useFormik({
        initialValues: {
            email: '',     
            password: '',
       
        },
        validationSchema: SignupSchema,
        onSubmit: LoginSubmit
    });

    return (
        <div className="container mt-5">
            <h1 className="text-center">login</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-5">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>
            
            

            <div className="form-group mb-5">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                </div>

       

                <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
                    {isLoading ? (
                        <Audio
                            height="20"
                            width="20"
                            radius="9"
                            color="white"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        />
                    ) : (
                        'Submit'
                    )}
                </button>
            </form>
        </div>
    );
};
