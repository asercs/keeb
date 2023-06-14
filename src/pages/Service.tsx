import {useItem, useMaster} from "../api";
import React from "react";

const Service = () => {
  const { data, isLoading, error } = useMaster();
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

  console.log(data)
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 xl:px-0 py-4 minHeight text-white">
      <div className="p-4 text-center">
        <h1 className="text-3xl font-extrabold mb-8">Service</h1>
        <p className="text-xl">
          Something wrong with your keyboard or you need some assistance with building your
          keyboard? Our specialist will help you with any problem you might have.
        </p>
      </div>
      <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {data?.map((item) => (
            <div className="card col-span-1 bg-gray-600 rounded-xl hover:opacity-80 hover:scale-105 transition-all hover:duration-300 hover:ease-out ease-in hover:transition-all">
              <img
                  className="w-full h-72 object-cover object-center object-top rounded-t-xl"
                  src={item.photo}
                  alt="avatar"
              />
              <div className="flex items-center px-6 py-3 bg-gray-900">
                <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 512 512">
                  <path d="M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6 65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3 149.3-153.3s149.3 68.5 149.3 153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448 136.2 362 48 256 48z" />
                </svg>
                <h1 className="mx-3 text-white font-semibold text-lg">{item.role}</h1>
              </div>
              <div className="py-4 px-6">
                <h1 className="text-2xl font-semibold text-white">{item.full_name}</h1>
                <p className="py-2 text-lg text-white">{item.content}</p>
                <div className="flex items-center mt-4 text-gray-700">
                  <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 512 512">
                    <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
                  </svg>
                  <h1 className="px-2 text-sm text-white">{item.address}</h1>
                </div>
                <div className="flex items-center mt-4 text-white">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
                  </svg>
                  <h1 className="px-2 text-sm">{item.phone}</h1>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export { Service };
