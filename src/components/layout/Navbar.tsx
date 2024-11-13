import React, { useState } from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';

interface NavbarProps {
    toggleMobileMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMobileMenu }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={toggleMobileMenu}
                        >
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {/* Add any additional navbar items here */}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <Bell className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="ml-3 relative">
                            <div>
                                <button onClick={() => setIsProfileOpen(!isProfileOpen)}
                                 className="flex items-center max-w-xs bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    <User className="h-8 w-8 rounded-full" />
                                </button>
                            </div>
                            {/* Add user dropdown menu here if needed */}
                            {isProfileOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                    <div className="py-1 rounded-md bg-white shadow-xs">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                        <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;