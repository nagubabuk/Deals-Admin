import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Edit, Calendar, Tag, ShoppingCart, DollarSign, Percent } from 'lucide-react';

interface Deal {
    _id: string;
    dealName: string;
    description: string;
    category: string;
    subCategory: string;
    dealType: string;
    validFrom: string;
    validTo: string;
    quantity: number;
    availableQuantity: number;
    discountPercentage: number;
    dealPrice: number;
    status: string;
    images: [{ imageUrl: string, isPrimary: boolean, mediaType: string }];
    video?: string;
}

const DealView: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log("location state",location.state)
    const { deal } = location.state as { deal: Deal };
    const [canEdit, setCanEdit] = useState(true); // This should be set based on user claims

    if (!deal) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center py-10 text-red-600">Deal information not available</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">{deal.dealName}</h1>
                    {canEdit && (
                        <button
                            onClick={() => navigate(`/deals/edit/${deal._id}`, { state: { deal } })}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Edit className="h-5 w-5 mr-2" />
                            Edit Deal
                        </button>
                    )}
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <Tag className="h-5 w-5 mr-2" />
                                Category
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{deal.category} / {deal.subCategory}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <Calendar className="h-5 w-5 mr-2" />
                                Valid Period
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {new Date(deal.validFrom).toLocaleDateString()} - {new Date(deal.validTo).toLocaleDateString()}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Quantity
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {deal.availableQuantity} / {deal.quantity} available
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <DollarSign className="h-5 w-5 mr-2" />
                                Deal Price
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${deal.dealPrice.toFixed(2)}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <Percent className="h-5 w-5 mr-2" />
                                Discount
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{deal.discountPercentage}%</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{deal.description}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${deal.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {deal.status}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Deal Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {deal.images.map((image, index) => (
                        // <span >
                        //     <img key={index} src={image.imageUrl} alt={`Deal image ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                        // </span>
                        <span key={index}>
                            {image.mediaType === 'image' ? (
                                <img
                                    src={image.imageUrl}
                                    alt={`Deal image ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            ) : image.mediaType === 'video' ? (
                                <video
                                    controls
                                    className="w-full h-48 object-cover rounded-lg"
                                >
                                        <source src={image.imageUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <p>Unsupported media type</p>
                            )}
                        </span>
                    ))}
                </div>
            </div>
            {deal.video && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Deal Video</h2>
                    <video controls className="w-full max-w-2xl mx-auto rounded-lg shadow-lg">
                        <source src={deal.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
};

export default DealView;