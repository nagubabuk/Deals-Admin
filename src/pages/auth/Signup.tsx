// // import React, { useState } from 'react';
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';
// // import { useAuth } from '../../context/AuthContext';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { User, Mail, Lock, Loader } from 'lucide-react';

// // interface SignupFormValues {
// //     name: string;
// //     email: string;
// //     password: string;
// //     confirmPassword: string;
// // }

// // const validationSchema = Yup.object({
// //     name: Yup.string().required('Required'),
// //     email: Yup.string().email('Invalid email address').required('Required'),
// //     password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
// //     confirmPassword: Yup.string()
// //         .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
// //         .required('Required'),
// // });

// // const Signup: React.FC = () => {
// //     const { signup } = useAuth();
// //     const navigate = useNavigate();
// //     const [isLoading, setIsLoading] = useState(false);

// //     const formik = useFormik({
// //         initialValues: {
// //             name: '',
// //             email: '',
// //             password: '',
// //             confirmPassword: '',
// //         },
// //         validationSchema: validationSchema,
// //         onSubmit: async (values) => {
// //             setIsLoading(true);
// //             try {
// //                 await signup(values.name, values.email, values.password);
// //                 navigate('/dashboard');
// //             } catch (error) {
// //                 console.error('Signup failed:', error);
// //                 // You might want to show an error message to the user here
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         },
// //     });

// //     return (
// //         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
// //             <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
// //                 <div>
// //                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
// //                 </div>
// //                 <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
// //                     <div className="rounded-md shadow-sm -space-y-px">
// //                         <div>
// //                             <label htmlFor="name" className="sr-only">Name</label>
// //                             <div className="relative">
// //                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                                     <User className="h-5 w-5 text-gray-400" />
// //                                 </div>
// //                                 <input
// //                                     id="name"
// //                                     type="text"
// //                                     autoComplete="name"
// //                                     required
// //                                     className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
// //                                         } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
// //                                     placeholder="Full name"
// //                                     {...formik.getFieldProps('name')}
// //                                 />
// //                             </div>
// //                         </div>
// //                         <div>
// //                             <label htmlFor="email" className="sr-only">Email address</label>
// //                             <div className="relative">
// //                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                                     <Mail className="h-5 w-5 text-gray-400" />
// //                                 </div>
// //                                 <input
// //                                     id="email"
// //                                     type="email"
// //                                     autoComplete="email"
// //                                     required
// //                                     className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
// //                                         } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
// //                                     placeholder="Email address"
// //                                     {...formik.getFieldProps('email')}
// //                                 />
// //                             </div>
// //                         </div>
// //                         <div>
// //                             <label htmlFor="password" className="sr-only">Password</label>
// //                             <div className="relative">
// //                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                                     <Lock className="h-5 w-5 text-gray-400" />
// //                                 </div>
// //                                 <input
// //                                     id="password"
// //                                     name="password"
// //                                     type="password"
// //                                     autoComplete="new-password"
// //                                     required
// //                                     className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
// //                                         } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
// //                                     placeholder="Password"
// //                                     {...formik.getFieldProps('password')}
// //                                 />
// //                             </div>
// //                         </div>
// //                         <div>
// //                             <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
// //                             <div className="relative">
// //                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                                     <Lock className="h-5 w-5 text-gray-400" />
// //                                 </div>
// //                                 <input
// //                                     id="confirmPassword"
// //                                     name="confirmPassword"
// //                                     type="password"
// //                                     autoComplete="new-password"
// //                                     required
// //                                     className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
// //                                         } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
// //                                     placeholder="Confirm password"
// //                                     {...formik.getFieldProps('confirmPassword')}
// //                                 />
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {Object.keys(formik.errors).map((key) => (
// //                         formik.touched[key] && formik.errors[key] ? (
// //                             <p key={key} className="mt-2 text-sm text-red-600" id={`${key}-error`}>
// //                                 {formik.errors[key]}
// //                             </p>
// //                         ) : null
// //                     ))}

// //                     <div>
// //                         <button
// //                             type="submit"
// //                             disabled={isLoading}
// //                             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
// //                         >
// //                             {isLoading ? (
// //                                 <Loader className="animate-spin h-5 w-5 mr-3" />
// //                             ) : (
// //                                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
// //                                     <User className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
// //                                 </span>
// //                             )}
// //                             {isLoading ? 'Signing up...' : 'Sign up'}
// //                         </button>
// //                     </div>
// //                 </form>
// //                 <div className="text-center">
// //                     <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
// //                         Already have an account? Sign in
// //                     </Link>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Signup;

// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';
// import { User, Mail, Lock, Loader } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store';
// import { signup } from '../../store/slices/authSlice';

// interface SignupFormValues {
//     name: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
// }

// const validationSchema = Yup.object({
//     name: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid email address').required('Required'),
//     password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
//     confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
//         .required('Required'),
// });

// const Signup: React.FC = () => {
//     // const { signup } = useAuth();
//     // const [isLoading, setIsLoading] = useState(false);
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const { loading, error } = useSelector((state: RootState) => state.auth);

//     const formik = useFormik<SignupFormValues>({
//         initialValues: {
//             name: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             // setIsLoading(true);
//             try {
//                 await dispatch(signup(values.name, values.email, values.password));
//                 navigate('/dashboard');
//             } catch (error) {
//                 console.error('Signup failed:', error);
//             } finally {
//                 // setIsLoading(false);
//             }
//         },
//     });

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
//                 <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
//                     <div className="rounded-md shadow-sm -space-y-px">
//                         <div>
//                             <label htmlFor="name" className="sr-only">Name</label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <User className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="name"
//                                     type="text"
//                                     autoComplete="name"
//                                     required
//                                     className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                                     placeholder="Full name"
//                                     {...formik.getFieldProps('name')}
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="email" className="sr-only">Email address</label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Mail className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="email"
//                                     type="email"
//                                     autoComplete="email"
//                                     required
//                                     className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                                     placeholder="Email address"
//                                     {...formik.getFieldProps('email')}
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="sr-only">Password</label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Lock className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="password"
//                                     type="password"
//                                     autoComplete="new-password"
//                                     required
//                                     className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                                     placeholder="Password"
//                                     {...formik.getFieldProps('password')}
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Lock className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="confirmPassword"
//                                     type="password"
//                                     autoComplete="new-password"
//                                     required
//                                     className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
//                                     placeholder="Confirm password"
//                                     {...formik.getFieldProps('confirmPassword')}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {Object.keys(formik.errors).map((key) => (
//                         formik.touched[key as keyof SignupFormValues] && formik.errors[key as keyof SignupFormValues] ? (
//                             <p key={key} className="mt-2 text-sm text-red-600">
//                                 {formik.errors[key as keyof SignupFormValues]}
//                             </p>
//                         ) : null
//                     ))}

//                     <div>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
//                         >
//                             {loading ? (
//                                 <Loader className="animate-spin h-5 w-5 mr-3" />
//                             ) : (
//                                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                                     <User className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
//                                 </span>
//                             )}
//                             {loading ? 'Signing up...' : 'Sign up'}
//                         </button>
//                     </div>
//                 </form>
//                 <div className="text-center">
//                     <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
//                         Already have an account? Sign in
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signup } from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store';
import { User, Mail, Lock, UserCheck } from 'lucide-react';

 interface SignupFormValues {
     username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role:string
}

const Signup: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const formik = useFormik<SignupFormValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
                .required('Required'),
            role: Yup.string().oneOf(['admin', 'merchant'], 'Invalid role').required('Required'),
        }),
        onSubmit: async (values) => {
            await dispatch(signup(values.username, values.email, values.password, values.role as 'admin' | 'merchant'));
            navigate('/login');
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    {...formik.getFieldProps('username')}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    {...formik.getFieldProps('email')}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                    {...formik.getFieldProps('confirmPassword')}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="role" className="sr-only">
                                Role
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserCheck className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    id="role"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    {...formik.getFieldProps('role')}
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="merchant">Merchant</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {Object.keys(formik.errors).map((key) => (
                                            formik.touched[key as keyof SignupFormValues] && formik.errors[key as keyof SignupFormValues] ? (
                                                <p key={key} className="mt-2 text-sm text-red-600">
                                                    {formik.errors[key as keyof SignupFormValues]}
                                                </p>
                                            ) : null
                                        ))}
                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Signing up...' : 'Sign up'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;