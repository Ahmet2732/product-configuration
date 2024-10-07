import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'; 

export default function SignupForm() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    async function registerSubmit(values) {
        setLoading(true); // Set loading to true when starting the request
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
            console.log(data);
            // Check if the response indicates success
            if (data.message === "success") {
                navigate("/login"); // Navigate to the login page on success
            } else {
                setError(data.message); // Set error message if not successful
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    }

    // Validation schema using Yup
    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        password: Yup.string().min(6, 'Password too short').required('Password is required'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Re-entering password is required'),
    });

    // useFormik hook for managing the form
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: ''
        },
        validationSchema: SignupSchema,
        onSubmit: registerSubmit
    });

    return (
        <div className="container mt-5">
            <h1 className="text-center">Signup</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-5">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name} 
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="invalid-feedback">{formik.errors.name}</div>
                    )}
                </div>

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
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone} 
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback">{formik.errors.phone}</div>
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

                <div className="form-group mb-5">
                    <label htmlFor="rePassword">Re-enter Password</label>
                    <input
                        id="rePassword"
                        name="rePassword"
                        type="password"
                        className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rePassword}
                    />
                   {formik.touched.rePassword && formik.errors.rePassword ? (
        <div className="invalid-feedback">{formik.errors.rePassword}</div>
    ) : null}
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
