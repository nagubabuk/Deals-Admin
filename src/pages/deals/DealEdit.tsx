import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { X, Upload, Tag, Percent, DollarSign, Calendar, FileText, ShoppingCart } from 'lucide-react';
import { dealsApi } from '../../services/dealsApi';

interface DealFormValues {
    category: string;
    subCategory: string;
    dealName: string;
    dealType: 'hot deal' | 'flash deal' | 'regular deal';
    validFrom: Date | null;
    validTo: Date | null;
    quantity: number;
    description: string;
    discountPercentage: number;
    dealPrice: number;
}

const fetchCategories = async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return ['Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors'];
};

const fetchSubCategories = async (category: string): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const subCategories: { [key: string]: string[] } = {
        'Electronics': ['Smartphones', 'Laptops', 'Accessories'],
        'Clothing': ['Men\'s Wear', 'Women\'s Wear', 'Kids\' Wear'],
        'Home & Garden': ['Furniture', 'Decor', 'Kitchen'],
        'Sports & Outdoors': ['Fitness', 'Camping', 'Team Sports'],
    };
    return subCategories[category] || [];
};
const DealEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [images, setImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<any>([]);
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [video, setVideo] = useState<File | null>(null);
    const [existingVideo, setExistingVideo] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [subCategories, setSubCategories] = useState<string[]>([]);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    const validationSchema = Yup.object({
        category: Yup.string().required('Category is required'),
        subCategory: Yup.string().required('Sub-category is required'),
        dealName: Yup.string().required('Deal name is required'),
        dealType: Yup.string().oneOf(['hot deal', 'flash deal', 'regular deal'], 'Invalid deal type').required('Deal type is required'),
        validFrom: Yup.date().required('Start date is required'),
        validTo: Yup.date().min(Yup.ref('validFrom'), 'End date must be after start date').required('End date is required'),
        quantity: Yup.number().positive('Quantity must be a positive number').required('Quantity is required'),
        description: Yup.string().max(50, 'Description must be 50 characters or less').required('Description is required'),
        discountPercentage: Yup.number().min(0).max(100, 'Discount percentage must be between 0 and 100').required('Discount percentage is required'),
        dealPrice: Yup.number().positive('Deal price must be a positive number').required('Deal price is required'),
    });

    const formik = useFormik<DealFormValues>({
        initialValues: {
            category: '',
            subCategory: '',
            dealName: '',
            dealType: 'regular deal',
            validFrom: null,
            validTo: null,
            quantity: 0,
            description: '',
            discountPercentage: 0,
            dealPrice: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();

            Object.keys(values).forEach(key => {
                if (values[key as keyof DealFormValues] !== null) {
                    formData.append(key, values[key as keyof DealFormValues]?.toString() || '');
                }
            });

            images.forEach((image) => {
                formData.append('files', image);
            });

            if (video) {
                formData.append('files', video);
            }
            formData.append('deletedImages', JSON.stringify(deletedImages));
            try {
                const response = await dealsApi.updateDeal(id!, formData);
                console.log('Deal updated successfully:', response.data);
                navigate(`/deals/deals-list`);
            } catch (error) {
                console.error('Error updating deal:', error);
                setError('Failed to update deal. Please try again.');
            }
        },
    });

    useEffect(() => {
        if (formik.values.category) {
            fetchSubCategories(formik.values.category).then(setSubCategories);
        } else {
            setSubCategories([]);
        }
    }, [formik.values.category]);
    useEffect(() => {
        const fetchDeal = async () => {
            try {
                const response = await dealsApi.getDeal(id!);
                const deal = response.data.data;
                formik.setValues({
                    category: deal.category,
                    subCategory: deal.subCategory,
                    dealName: deal.dealName,
                    dealType: deal.dealType,
                    validFrom: new Date(deal.validFrom),
                    validTo: new Date(deal.validTo),
                    quantity: deal.quantity,
                    description: deal.description,
                    discountPercentage: deal.discountPercentage,
                    dealPrice: deal.dealPrice,
                });
                setExistingImages(deal.images);
                setExistingVideo(deal.video || null);
                setLoading(false);
            } catch (err) {
                setError('Failed to load deal details');
                setLoading(false);
            }
        };

        fetchDeal();
    }, [id]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).filter(file => {
                const isValidType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
                const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
                return isValidType && isValidSize;
            });
            setImages(prev => [...prev, ...newImages].slice(0, 5));
        }
    };

    
    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVideo(file);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (publicId:string,index:number) => {
        setExistingImages((prev: any[]) => prev.filter((_, i) => i !== index));
        setDeletedImages([...deletedImages, publicId]);
    }

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Deal</h1>
            <form onSubmit={formik.handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tag className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                id="category"
                                {...formik.getFieldProps('category')}
                                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out hover:bg-white"

                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        {formik.touched.category && formik.errors.category && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.category}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">Sub-category</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tag className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                id="subCategory"
                                {...formik.getFieldProps('subCategory')}
                                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out hover:bg-white"
                                disabled={!formik.values.category}
                            >
                                <option value="">Select a sub-category</option>
                                {subCategories.map((subCategory) => (
                                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                                ))}
                            </select>
                        </div>
                        {formik.touched.subCategory && formik.errors.subCategory && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.subCategory}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="dealName" className="block text-sm font-medium text-gray-700">Deal Name</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="dealName"
                                {...formik.getFieldProps('dealName')}
                                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out hover:bg-white"
                                placeholder="Enter deal name"
                            />
                        </div>
                        {formik.touched.dealName && formik.errors.dealName && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.dealName}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="dealType" className="block text-sm font-medium text-gray-700">Deal Type</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tag className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                id="dealType"
                                {...formik.getFieldProps('dealType')}
                                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out hover:bg-white"
                            >
                                <option value="hot deal">Hot Deal</option>
                                <option value="flash deal">Flash Deal</option>
                                <option value="regular deal">Regular Deal</option>
                            </select>
                        </div>
                        {formik.touched.dealType && formik.errors.dealType && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.dealType}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700">Valid From</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <DatePicker
                                id="validFrom"
                                selected={formik.values.validFrom}
                                onChange={(date) => formik.setFieldValue('validFrom', date)}
                                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out hover:bg-white"
                                placeholderText="Select start date"
                            />
                        </div>
                        {formik.touched.validFrom && formik.errors.validFrom && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.validFrom}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="validTo" className="block text-sm font-medium text-gray-700">Valid To</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <DatePicker
                                id="validTo"
                                selected={formik.values.validTo}
                                onChange={(date) => formik.setFieldValue('validTo', date)}
                                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out hover:bg-white"
                                placeholderText="Select end date"
                            />
                        </div>
                        {formik.touched.validTo && formik.errors.validTo && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.validTo}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ShoppingCart className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                id="quantity"
                                {...formik.getFieldProps('quantity')}
                                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out hover:bg-white"
                                placeholder="Enter quantity"
                            />
                        </div>
                        {formik.touched.quantity && formik.errors.quantity && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.quantity}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <div className="mt-1">
                            <textarea
                                id="description"
                                {...formik.getFieldProps('description')}
                                rows={3}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Enter description"
                            />
                        </div>
                        {formik.touched.description && formik.errors.description && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.description}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Percent className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                id="discountPercentage"
                                {...formik.getFieldProps('discountPercentage')}
                                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out hover:bg-white"
                                placeholder="Enter discount percentage"
                            />
                        </div>
                        {formik.touched.discountPercentage && formik.errors.discountPercentage && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.discountPercentage}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="dealPrice" className="block text-sm font-medium text-gray-700">Deal Price</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                id="dealPrice"
                                {...formik.getFieldProps('dealPrice')}
                                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out hover:bg-white"
                                placeholder="Enter deal price"
                            />
                        </div>
                        {formik.touched.dealPrice && formik.errors.dealPrice && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.dealPrice}</p>
                        )}
                    </div>
                </div>


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Existing Images</label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {existingImages.map((image:any, index:any) => (
                            <div key={index} className="relative">
                                <img src={image.imageUrl} alt={`Existing ${index + 1}`} className="h-24 w-24 rounded-md object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(image.publicId,index)}
                                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">New Images</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload images</span>
                                    <input id="images" name="images" type="file" className="sr-only" onChange={handleImageUpload} multiple accept="image/jpeg,image/png,image/jpg" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB (max 5 images)</p>
                        </div>
                    </div>
                </div>

                {images.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">New Uploaded Images</h3>
                        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className="h-24 w-24 rounded-md object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Deal Video</label>
                    {existingVideo && (
                        <div className="mt-2">
                            <video controls className="w-full max-w-md mx-auto rounded-lg shadow-lg">
                                <source src={existingVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="video" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload a new video</span>
                                    <input id="video" name="video" type="file" className="sr-only" onChange={handleVideoUpload} accept="video/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">MP4, WebM, Ogg up to 50MB</p>
                        </div>
                    </div>
                </div>

                {video && (
                    <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">New Uploaded Video</h3>
                        <video controls className="mt-2 max-w-full h-auto rounded-lg shadow-lg">
                            <source src={URL.createObjectURL(video)} type={video.type} />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/deals/${id}`)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        Update Deal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DealEdit;