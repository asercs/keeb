import {Link, useParams} from 'react-router-dom';
import React, {useState} from 'react';
import Select from 'react-select';
import {useMarketplace} from '../api';

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  images: string[];
  product_type: string;
  order: number;
  options: { [key: string]: string }[];
};

const Marketplace = () => {

  const { productName } = useParams<{ productName?: string }>();
  // const { data: items, isLoading, isError } = sortFromUrl? useSort(sortFromUrl): productName ? useSearch(productName) : useItems();
  const { data: items, isLoading, isError } = useMarketplace();




  if (isLoading) {
    return (
      <div className="minHeight flex justify-center items-center">
        <div className="flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 xl:px-0 py-4">
      <div className="text-white">
        <h1 className="font-extrabold text-4xl text-center mb-10">Shop</h1>
        <div className="text-center font-medium text-white">
            <a href="" className="text-amber-400 text-xl">To list your products on Keyboardist Marketplace, please click here to fill out the form.</a>
            <p className="mt-8">Keyboardist Marketplace makes the transactions easier for both buyers and sellers. KeebsForAll releases the funds to the sellers after we verify the condition and description of the product upon its arrival to the Keyboardist warehouse. Sellers will sell their products faster and will have to do minimal work on their end. All seller fees are listed on the listing submission form. If the buyer receives the item not as described, they are required to contact us within 48 hours of receipt. Please keep in mind that items will take 2-3 weeks to ship, as we have to communicate with the sellers, wait to receive the items, process them, then ship them to you.  Due to the nature of these products, we do not offer returns or refunds for items. Starting January 1st, 2023, there will be no cancellations on Marketplace Products. For more information, please join our Discord server.
            </p>
            <p className="my-4">Again, as a buyer you have 48 hours upon delivery to notify us of damage or defective items.  We will not consider return or refund requests after 48 hours of delivery.
            </p>
            <p className="my-4">The 5% fee automatically added to your cart is required, if this is removed you will be sent an invoice.  If the invoice is not paid within 3 days, your order will be canceled and subject to a 9% fee.  By purchasing any item, you agree to these terms.
            </p>
            <p className="my-4">Join our Discord server for additional FAQ. By using our marketplace services, you agree that you have read through the information provided in our Discord server.
            </p>

            </div>
        <div className="flex gap-4 text-lg font-bold justify-between">
          {/*<div id="sort">*/}
          {/*  <select className="px-4 py-2 w-full bg-gray-600 rounded-md border-transparent focus:border-gray-500 focus:ring-0 text-md w-40 appearance-none"*/}
          {/*          onChange={handleSortChange} value={sortType}>*/}
          {/*    <option value="">Sort</option>*/}
          {/*    <option value="price_asc">Price asc</option>*/}
          {/*    <option value="price_desc">Price desc</option>*/}
          {/*  </select>*/}
          {/*</div>*/}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-10 pb-96">
        <Link to="/product">
          <div className="bg-gray-600/40 rounded-md p-5 text-white flex flex-col justify-center items-center">
            <div className="mb-4">
              <img
                src="https://cdn.shopify.com/s/files/1/1473/3902/products/0_96b338f0-446d-43ed-83a0-7a26c5d3dead_900x.jpg?v=1665646319"
                alt="arrival"
                className="h-64 object-contain"
              />
            </div>
            <div>
              <h1 className="font-extrabold mb-2">Luna 80</h1>
              <h2 className="font-bold">499 $</h2>
            </div>
          </div>
        </Link>
        {items &&
          items.map((product: Product) => (
            <Link to={`/product/${product.order}`} key={product.order}>
              <div className="bg-gray-600/40 rounded-md p-5 text-white flex flex-col justify-center items-center">
                <div className="mb-4">
                  <img src={product.images[0]} alt="arrival" className="h-64 object-contain" />
                </div>
                <div>
                  <h1 className="font-extrabold mb-2">{product.name}</h1>
                  <h2 className="font-bold">{product?.options[0]['price']} $</h2>
                </div>
              </div>
            </Link>
          ))}

      </div>
    </div>
  );
};

export { Marketplace };
