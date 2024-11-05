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

interface ProtectedRouteProps {
    children: React.ReactElement; // Expecting child components to render within ProtectedRoute
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
