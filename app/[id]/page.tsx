'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Rate } from 'antd';

interface Params {
  id: string;
}

interface DetailsProps {
  params: Params;
}
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export default function Details({ params }: DetailsProps) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        Loading...
      </p>
    );

  if (error) return <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">Error: {error}</p>;

  // Extract the id from params
  const { id } = params;

  // Find the product that matches the id
  const product = data.find((item) => item.id === parseInt(id));

  // Render product details if a matching product is found
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <h1 className="text-4xl font-bold italic bg-gray-700 p-5">Products Details</h1>
      <div className="md:flex md:h-[100vh]">
        <div className="md:w-4/5 h-full border-4  bg-white justify-center flex">
          <Image loading='lazy'
            className="py-10 h-full w-full object-contain"
            width={150}
            height={150}
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="w-full px-1 md:px-20  pt-[15%]  text-center justify-center">
          <p className="md:text-xl">
            Rating:
            <Rate defaultValue={product.rating.rate} allowHalf disabled />{' '}
            {product.rating.count} reviews
          </p>
          <h1 className="text-3xl py-3 font-black">{product.category}</h1>
          <h1 className="text-4xl ">{product.title}</h1>

          <p className="py-3">{product.description}</p>
          <p>Price: ${product.price}</p>
          <div className="md:flex py-9 md:py-20 justify-center  md:space-x-20">
            <button className="max-sm:my-5 py-2 w-48 h-16 hover:font-black hover:bg-gray-700 transition-all ease-out hover:scale-105 border-4">
              Add to cart
            </button>
            <button className="py-2 w-48 h-16 border-4 hover:font-black hover:scale-105 transition-all ease-out hover:bg-gray-700">
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
