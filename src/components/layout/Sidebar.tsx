import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { RootState } from '../../store';

const Sidebar: React.FC = () => {
    // const user = useSelector((state: RootState) => state.auth.user);

    const menuItems = [
        { name: 'Sales Dashboard', path: '/dashboard/sales', icon: '📊' },
        { name: 'Customers', path: '/dashboard/customers', icon: '👥' },
        { name: 'Products', path: '/dashboard/products', icon: '🛍️' },
        { name: 'Deals', path: '/deals', icon: '💰' },
        { name: 'Orders', path: '/orders', icon: '📦' },
        { name: 'Approvals', path: '/approvals', icon: '✅' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
    ];

    return (
        <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            <div className="flex items-center space-x-2 px-4">
                <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
                <span className="text-2xl font-extrabold">Admin Panel</span>
            </div>
            <nav>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                    >
                        {item.icon} {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;