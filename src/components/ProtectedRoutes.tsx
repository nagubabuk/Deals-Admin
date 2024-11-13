// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface ProtectedRouteProps {
//     component: React.ComponentType<any>;
//     path: string;
// }
// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
//     const { user } = useAuth();

//     return user ? (
//         <Route {...rest} element={<Component />} />
//     ) : (
//         <Navigate to="/login" replace state={{ from: rest.path }} />
//     );
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setUser } from '../store/slices/authSlice';

interface ProtectedRouteProps {
    children: React.ReactElement; // Expecting child components to render within ProtectedRoute
}

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
    const dispatch = useDispatch<AppDispatch>();

    const storedUser = localStorage.getItem('user');
    console.log("Prodte storedUser",storedUser)
    if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
    }
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return isAuthenticated ? element : <Navigate to="/login" />;
};
export default ProtectedRoute;
