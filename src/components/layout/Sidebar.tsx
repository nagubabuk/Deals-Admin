// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { useSelector } from 'react-redux';
// // // import { RootState } from '../../store';

// // const Sidebar: React.FC = () => {
// //     // const user = useSelector((state: RootState) => state.auth.user);

// //     const menuItems = [
// //         { name: 'Sales Dashboard', path: '/dashboard/sales', icon: '📊' },
// //         { name: 'Customers', path: '/dashboard/customers', icon: '👥' },
// //         { name: 'Products', path: '/dashboard/products', icon: '🛍️' },
// //         { name: 'Deals', path: '/deals', icon: '💰' },
// //         { name: 'Orders', path: '/orders', icon: '📦' },
// //         { name: 'Approvals', path: '/approvals', icon: '✅' },
// //         { name: 'Settings', path: '/settings', icon: '⚙️' },
// //     ];

// //     return (
// //         <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
// //             <div className="flex items-center space-x-2 px-4">
// //                 <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
// //                 <span className="text-2xl font-extrabold">Admin Panel</span>
// //             </div>
// //             <nav>
// //                 {menuItems.map((item) => (
// //                     <Link
// //                         key={item.path}
// //                         to={item.path}
// //                         className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
// //                     >
// //                         {item.icon} {item.name}
// //                     </Link>
// //                 ))}
// //             </nav>
// //         </div>
// //     );
// // };

// // export default Sidebar;

// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { ChevronDown, ChevronRight } from 'lucide-react';
// import Logo from '../Logo';

// interface MenuItem {
//     name: string;
//     icon: React.ElementType;
//     path?: string;
//     subItems?: MenuItem[];
// }

// const menuItems: MenuItem[] = [
//     {
//         name: 'Dashboard',
//         icon: ChevronRight,
//         path: '/dashboard',
//     },
//     {
//         name: 'Sales',
//         icon: ChevronRight,
//         subItems: [
//             { name: 'Overview', icon: ChevronRight, path: '/sales/overview' },
//             { name: 'Transactions', icon: ChevronRight, path: '/sales/transactions' },
//         ],
//     },
//     {
//         name: 'Deals',
//         icon: ChevronRight,
//         subItems: [
//             { name: 'Overview', icon: ChevronRight, path: '/deals/deals-overview' },
//             { name: 'Deals', icon: ChevronRight, path: '/deals/deals-list' },
//         ],
//     },
//     {
//         name: 'Customers',
//         icon: ChevronRight,
//         subItems: [
//             { name: 'List', icon: ChevronRight, path: '/customers/list' },
//             { name: 'Analytics', icon: ChevronRight, path: '/customers/analytics' },
//         ],
//     },
//     {
//         name: 'Settings',
//         icon: ChevronRight,
//         path: '/settings',
//     },
  
// ];

// const Sidebar: React.FC = () => {
//     const [openMenus, setOpenMenus] = useState<string[]>([]);
//     const location = useLocation();

//     const toggleMenu = (menuName: string) => {
//         setOpenMenus((prevOpenMenus) =>
//             prevOpenMenus.includes(menuName)
//                 ? prevOpenMenus.filter((item) => item !== menuName)
//                 : [...prevOpenMenus, menuName]
//         );
//     };

//     const renderMenuItem = (item: MenuItem) => {
//         const isOpen = openMenus.includes(item.name);
//         const isActive = item.path === location.pathname;

//         return (
//             <div key={item.name}>
//                 <div
//                     className={`flex items-center justify-between p-2 cursor-pointer ${isActive ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
//                         }`}
//                     onClick={() => item.subItems && toggleMenu(item.name)}
//                 >
//                     {item.path ? (
//                         <Link to={item.path} className="flex items-center w-full">
//                             {/* <item.icon className="mr-2" size={18} /> */}
//                             <span>{item.name}</span>
//                         </Link>
//                     ) : (
//                         <>
//                             <span className="flex items-center">
//                                 {/* <item.icon className="mr-2" size={18} /> */}
//                                 <span>{item.name}</span>
//                             </span>
//                             {item.subItems && (
//                                 <ChevronDown
//                                     size={18}
//                                     className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
//                                 />
//                             )}
//                         </>
//                     )}
//                 </div>
//                 {item.subItems && isOpen && (
//                     <div className="ml-4">
//                         {item.subItems.map((subItem) => renderMenuItem(subItem))}
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className="w-64 h-full bg-white border-r border-gray-200">
//                 <div className="flex">
//                     <div className="flex-shrink-0 flex items-center h-10 w-10">
//                 <div className="flex items-center justify-center">
//                     <Logo />
//                 </div>
//                 </div>
//                 </div>
//             <nav className="mt-4">
//                 {menuItems.map((item) => renderMenuItem(item))}
//             </nav>
//         </div>
//     );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import Logo from '../Logo';

interface MenuItem {
    name: string;
    icon: React.ElementType;
    path?: string;
    subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
    {
        name: 'Dashboard',
        icon: ChevronRight,
        path: '/dashboard',
    },
    {
        name: 'Sales',
        icon: ChevronRight,
        subItems: [
            { name: 'Overview', icon: ChevronRight, path: '/sales/overview' },
            { name: 'Transactions', icon: ChevronRight, path: '/sales/transactions' },
        ],
    },
    {
        name: 'Deals',
        icon: ChevronRight,
        subItems: [
            { name: 'Overview', icon: ChevronRight, path: '/deals/deals-overview' },
            { name: 'Deals', icon: ChevronRight, path: '/deals/deals-list' },
        ],
    },
    {
        name: 'Customers',
        icon: ChevronRight,
        subItems: [
            { name: 'List', icon: ChevronRight, path: '/customers/list' },
            { name: 'Analytics', icon: ChevronRight, path: '/customers/analytics' },
        ],
    },
    {
        name: 'Settings',
        icon: ChevronRight,
        path: '/settings',
    },
];

const Sidebar: React.FC<{ isMobileMenuOpen: boolean; toggleMobileMenu: () => void }> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const location = useLocation();

    const toggleMenu = (menuName: string) => {
        setOpenMenus((prevOpenMenus) =>
            prevOpenMenus.includes(menuName)
                ? prevOpenMenus.filter((item) => item !== menuName)
                : [...prevOpenMenus, menuName]
        );
    };

    const renderMenuItem = (item: MenuItem) => {
        const isOpen = openMenus.includes(item.name);
        const isActive = item.path === location.pathname;

        return (
            <div key={item.name}>
                <div
                    className={`flex items-center justify-between p-2 cursor-pointer ${isActive ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
                        }`}
                    onClick={() => item.subItems && toggleMenu(item.name)}
                >
                    {item.path ? (
                        <Link to={item.path} className="flex items-center w-full" onClick={() => toggleMobileMenu()}>
                            {/* <item.icon className="mr-2" size={18} /> */}
                            <span>{item.name}</span>
                        </Link>
                    ) : (
                        <>
                            <span className="flex items-center">
                                {/* <item.icon className="mr-2" size={18} /> */}
                                <span>{item.name}</span>
                            </span>
                            {item.subItems && (
                                <ChevronDown
                                    size={18}
                                    className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                />
                            )}
                        </>
                    )}
                </div>
                {item.subItems && isOpen && (
                    <div className="ml-4">
                        {item.subItems.map((subItem) => renderMenuItem(subItem))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
            <div className="flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center">
                    <Logo />
                    <span className="ml-2 text-xl font-semibold">Admin Panel</span>
                </div>
                <button className="md:hidden" onClick={toggleMobileMenu}>
                    <Menu size={24} />
                </button>
            </div>
            <nav className="mt-4 overflow-y-auto h-[calc(100vh-64px)]">
                {menuItems.map((item) => renderMenuItem(item))}
            </nav>
        </div>
    );
};

export default Sidebar;