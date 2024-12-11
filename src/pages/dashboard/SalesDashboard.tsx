// // import React, { useEffect } from 'react';
// // import { useAppSelector, useAppDispatch } from '../../store/hooks';
// // import { fetchSalesData } from '../../services/api';
// // import { RootState } from '../../store';
// // import Loader from '../../components/Loader';

// // const SalesDashboard: React.FC = () => {
// //     const dispatch = useAppDispatch();
// //     const user = useAppSelector((state: RootState) => state.auth.user);
// //     const { data: salesData, loading, error } = useAppSelector((state: RootState) => state.sales);

// //     useEffect(() => {
// //         dispatch(fetchSalesData());
// //     }, [dispatch]);

// //     if (loading) {
// //         return <Loader size={48} color="indigo" />;
// //     }

// //     if (error) {
// //         return <div className="text-red-500">{error}</div>;
// //     }

// //     return (
// //         <div className="bg-white shadow rounded-lg p-6">
// //             <h2 className="text-2xl font-semibold mb-4">Sales Dashboard</h2>
// //             {user && <p className="mb-4">Welcome, {user.name}!</p>}
// //             <div className="overflow-x-auto">
// //                 <table className="min-w-full divide-y divide-gray-200">
// //                     <thead className="bg-gray-50">
// //                         <tr>
// //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
// //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
// //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                         {salesData.map((sale) => (
// //                             <tr key={sale.id}>
// //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
// //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.product}</td>
// //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.amount.toFixed(2)}</td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SalesDashboard;
// import React, { useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from '../../store/hooks';
// import { fetchSalesData } from '../../services/api';
// import { RootState } from '../../store';
// import Loader from '../../components/Loader';
// import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// const SalesDashboard: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const user = useAppSelector((state: RootState) => state.auth.user);
//     const { data: salesData, loading, error } = useAppSelector((state: RootState) => state.sales);

//     useEffect(() => {
//         dispatch(fetchSalesData());
//     }, [dispatch]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-full">
//                 <Loader size={48} color="primary-500" />
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="text-red-500">{error}</div>;
//     }

//     const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);

//     return (
//         <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-primary-700">Sales Dashboard</h2>
//             {user && <p className="mb-4 text-primary-600">Welcome, {user.username}!</p>}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                     <h3 className="text-lg font-semibold mb-2 text-primary-600">Sales by Product</h3>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <PieChart>
//                             <Pie
//                                 data={salesData}
//                                 cx="50%"
//                                 cy="50%"
//                                 labelLine={false}
//                                 outerRadius={80}
//                                 fill="#8884d8"
//                                 dataKey="amount"
//                                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                             >
//                                 {salesData.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                             <Legend />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                     <h3 className="text-lg font-semibold mb-2 text-primary-600">Daily Sales</h3>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={salesData}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="amount" fill="#8884d8" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>
//             <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2 text-primary-600">Sales Details</h3>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Date</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Product</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {salesData.map((sale) => (
//                                 <tr key={sale.id}>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.product}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.amount.toFixed(2)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                         <tfoot>
//                             <tr>
//                                 <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">Total Sales</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">${totalSales.toFixed(2)}</td>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SalesDashboard;

import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchSalesData } from '../../services/salesApi';
import { RootState } from '../../store';
import Loader from '../../components/Loader';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const SalesDashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.user);
    const { data: salesData, loading, error } = useAppSelector((state: RootState) => state.sales);

    useEffect(() => {
        dispatch(fetchSalesData('week'));
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader size={48} color="primary-500" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }


    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-700">Sales Dashboard</h2>
            {user && <p className="mb-4 text-primary-600">Welcome, {user.username}!</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-200 p-4 rounded-lg shadow-sm h-[60px] flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                        <p className="text-lg font-semibold text-primary-600"> {salesData?.analytics?.totalRevenue}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-primary-500" />
                    </div>
                <div className="bg-gray-200 p-4 rounded-lg shadow-sm h-[60px] flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                        <p className="text-lg font-semibold text-primary-600">{salesData?.analytics?.totalSales}</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-primary-500" />
                </div>
                <div className="bg-gray-200 p-4 rounded-lg shadow-sm h-[60px] flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Customers Onboarded</h3>
                        <p className="text-lg font-semibold text-primary-600">{salesData?.analytics?.customersOnboarded}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary-500" />
                </div>
                <div className="bg-gray-200 p-4 rounded-lg shadow-sm h-[60px] flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Growth Rate</h3>
                        <p className="text-lg font-semibold text-primary-600">{salesData?.analytics?.growthRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary-500" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-primary-600">Sales by Product</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={salesData.salesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="amount"
                                label={({ customerName, percent }) => `${customerName} ${(percent * 100).toFixed(0)}%`}
                            >
                                {salesData?.salesData?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-primary-600">Daily Sales</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData.salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-primary-600">Sales Details</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {salesData?.salesData?.map((sale) => (
                                <tr key={sale._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.customerName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">Total Sales</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">$123</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesDashboard;