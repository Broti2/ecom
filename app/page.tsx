'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Rate } from 'antd';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = data.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(results);
  }, [searchQuery, data]);

  if (loading)
    return (
      <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div><div className='md:flex'>
      <h1 className='text-4xl font-bold italic p-5'>Products</h1>
      <input 
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border max-sm:px-5 max-sm:mx-5 p-2 mb-5 h-10 my-5 rounded-full text-black"
      /></div>
      <ul className="flex flex-wrap justify-center">
        {filteredData.map((product) => (
          <li
            key={product.id}
            className="w-10/12 lg:w-1/5 md:w-1/4 md:m-3 m-1 overflow-hidden border-4 rounded-xl"
          >
            <Link href={`${product.id}`}>
              <div className="aspect-square w-full h-[250px] object-contain bg-white ">
                <Image
                  className="w-full h-full object-contain"
                  src={product.image}
                  alt={product.title}
                  width={150}
                  height={150}
                  unoptimized
                />
              </div>
              <div className="p-2">
                <p>
                  <Rate defaultValue={product.rating.rate} allowHalf disabled /> {product.rating.count} reviews
                </p>
                <h2>{product.title}</h2>
                <p>${product.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
