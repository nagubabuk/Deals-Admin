// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Table, TableColumn } from '../../components/Table';
// import { ChevronRight } from 'lucide-react';

// interface Deal {
//   id: string;
//   status: 'active' | 'inactive';
//   name: string;
//   createDate: string;
//   price: number;
//   discountedPrice: number;
//   orderedQty: number;
//   orderStatus: 'waiting for approval' | 'cancel' | 'shipment done' | 'processing';
// }

// const dummyDeals: Deal[] = [
//   {
//     id: '1',
//     status: 'active',
//     name: 'Summer Sale T-Shirt',
//     createDate: '2023-06-01',
//     price: 29.99,
//     discountedPrice: 19.99,
//     orderedQty: 100,
//     orderStatus: 'waiting for approval',
//   },
//   {
//     id: '2',
//     status: 'inactive',
//     name: 'Winter Jacket',
//     createDate: '2023-05-15',
//     price: 89.99,
//     discountedPrice: 69.99,
//     orderedQty: 50,
//     orderStatus: 'shipment done',
//   },
//   {
//     id: '3',
//     status: 'active',
//     name: 'Running Shoes',
//     createDate: '2023-06-10',
//     price: 79.99,
//     discountedPrice: 59.99,
//     orderedQty: 75,
//     orderStatus: 'processing',
//   },
//   {
//     id: '4',
//     status: 'active',
//     name: 'Yoga Mat',
//     createDate: '2023-06-05',
//     price: 39.99,
//     discountedPrice: 29.99,
//     orderedQty: 200,
//     orderStatus: 'cancel',
//   },
// ];

// const DealList: React.FC = () => {
//   const [deals, setDeals] = useState<Deal[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulating API call with dummy data
//     const fetchDeals = async () => {
//       try {
//         // Simulate network delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setDeals(dummyDeals);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch deals');
//         setLoading(false);
//       }
//     };

//     fetchDeals();
//   }, []);

//   const columns: TableColumn<Deal>[] = [
//     {
//       header: 'Status',
//       accessor: 'status',
//       className: 'w-24',
//     },
//     { header: 'Deal Name', accessor: 'name' },
//     { header: 'Create Date', accessor: 'createDate' },
//     {
//       header: 'Price',
//       accessor: (deal: Deal) => (
//         <span className="line-through text-gray-500">${deal.price.toFixed(2)}</span>
//       )
//     },
//     {
//       header: 'Discounted Price',
//       accessor: (deal: Deal) => <span className="font-bold">${deal.discountedPrice.toFixed(2)}</span>,
//     },
//     { header: 'Ordered Qty', accessor: 'orderedQty' },
//     { header: 'Order Status', accessor: 'orderStatus' },
//   ];

//   const handleRowClick = (deal: Deal) => {
//     navigate(`/deals/${deal.id}/view`);
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Deals</h1>
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <Table
//           data={deals}
//           columns={columns}
//           onRowClick={handleRowClick}
//           showActionIcon={true}
//         />
//       </div>
//     </div>
//   );
// };

// export default DealList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableColumn } from '../../components/Table';
import { PlusCircle } from 'lucide-react';
import { dealsApi } from '../../services/dealsApi';

interface Deal {
  _id: string;
  status?: 'active' | 'inactive';
  dealName: string;
  createDate: string;
  dealPrice: number;
  discountPercentage: number;
  // orderedQty: number;
  orderStatus?: 'waiting for approval' | 'cancel' | 'shipment done' | 'processing';
  primaryImage?: string;
  description:string;
  quantity:number;
  dealType:string;
  images:[{imageUrl:string, isPrimary:boolean,mediaType:string}]
}



// const dummyDeals: Deal[] = [
//   {
//     id: '1',
//     status: 'active',
//     name: 'Summer Sale T-Shirt',
//     createDate: '2023-06-01',
//     price: 29.99,
//     discountedPrice: 19.99,
//     orderedQty: 100,
//     orderStatus: 'waiting for approval',
//   },
//   {
//     id: '2',
//     status: 'inactive',
//     name: 'Winter Jacket',
//     createDate: '2023-05-15',
//     price: 89.99,
//     discountedPrice: 69.99,
//     orderedQty: 50,
//     orderStatus: 'shipment done',
//   },
//   {
//     id: '3',
//     status: 'active',
//     name: 'Running Shoes',
//     createDate: '2023-06-10',
//     price: 79.99,
//     discountedPrice: 59.99,
//     orderedQty: 75,
//     orderStatus: 'processing',
//   },
//   {
//     id: '4',
//     status: 'active',
//     name: 'Yoga Mat',
//     createDate: '2023-06-05',
//     price: 39.99,
//     discountedPrice: 29.99,
//     orderedQty: 200,
//     orderStatus: 'cancel',
//   },
// ];


const DealList: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call with dummy data
    const fetchDeals = async () => {
      try {
        let response =await dealsApi.getAllDeals();
        if (response.data.success) {
          setDeals(response.data.data);
          console.log("deals is", response.data.data)
        } else {
          throw new Error("Failed to fetch deals");
        }
        setDeals(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch deals');
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const columns: TableColumn<Deal>[] = [
    {
      header: 'Image',
      accessor: (deal: Deal) => (
        <img src={deal.images[0].imageUrl} alt={deal.dealName} className="w-16 h-16 object-cover rounded-md" />
      ),
      className: 'w-24',
    },
    // { header: 'Status', accessor: 'status', className: 'w-24' },
    { header: 'Deal Name', accessor: 'dealName' },
    { header: 'Create Date', accessor: 'createDate' },
    {
      header: 'Price',
      accessor: (deal: Deal) => (
        <span className="line-through text-gray-500">${deal.dealPrice}</span>
      )
    },
    {
      header: 'Discounted Percentage',
      accessor: (deal: Deal) => <span className="font-bold">${deal.discountPercentage}</span>,
    },
    { header: 'Ordered Qty', accessor: 'quantity' },
    { header: 'Deal Type', accessor: 'dealType' },
  ];

  const handleRowClick = (deal: Deal) => {
    navigate(`/deals/view/${deal._id}`, { state: { deal }});
  };

  const handleCreateDeal = () => {
    navigate('/deals/create');
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Deals</h1>
        <button
          onClick={handleCreateDeal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Create Deal
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table
          data={deals}
          columns={columns}
          onRowClick={handleRowClick}
          showActionIcon={true}
        />
      </div>
    </div>
  );
};

export default DealList;