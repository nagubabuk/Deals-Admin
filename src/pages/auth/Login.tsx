import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
});

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                await login(values.email, values.password);
                navigate('/dashboard');
            } catch (error) {
                console.error('Login failed:', error);
                // You might want to show an error message to the user here
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                                        } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Email address"
                                    {...formik.getFieldProps('email')}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                                        } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                />
                            </div>
                        </div>
                    </div>

                    {formik.touched.email && formik.errors.email && (
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {formik.errors.email}
                        </p>
                    )}
                    {formik.touched.password && formik.errors.password && (
                        <p className="mt-2 text-sm text-red-600" id="password-error">
                            {formik.errors.password}
                        </p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            {isLoading ? (
                                <Loader className="animate-spin h-5 w-5 mr-3" />
                            ) : (
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                            )}
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;