// import React, { ReactNode } from 'react';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// import { Outlet } from 'react-router-dom';
// interface LayoutProps {
//     children: ReactNode;
// }
// const Layout: React.FC = () => {
//     return (
//         <div className="flex h-screen bg-gray-100">
//             <Sidebar />
//             <div className="flex flex-col flex-1 overflow-hidden">
//                 <Navbar />
//                 <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Layout;

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar toggleMobileMenu={toggleMobileMenu} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;