'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Rate } from 'antd';
import Link from 'next/link';

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
      } catch (err: any) {
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

  if (error)
    return (
      <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        Error: {error}
      </p>
    );

  // Extract the id from params
  const { id } = params;

  // Find the product that matches the id
  const product = data.find((item) => item.id === parseInt(id));

  // Render product details if a matching product is found
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <div className="md:flex bg-gray-700">
        <Link href={'/'}>
        <div className="py-4 max-sm:hidden px-10">
          <svg
            style={{ color: 'white' }}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 50 50"
          >
            <path
              d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"
              fill="#fff"
            ></path>
          </svg>
        </div></Link>
        <h1 className="text-4xl font-bold italic max-sm:text-3xl text-center max-sm:py-4 max-sm:px-2  md:p-5">Products Details</h1>{' '}
      </div>
      <div className="md:flex md:h-[100vh]">
        <div className="md:w-4/5 h-full border-4  bg-white justify-center flex">
          <Image
            loading="lazy"
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
