import {Link} from "react-router-dom";
import {useItems} from "../api";

function Arrival() {
    const { data, isLoading, isError } = useItems();
    const items = data?.slice(-4);
    console.log(items)

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
                <h1 className="font-extrabold text-2xl">New arrival</h1>
                <Link to="shop" className="font-bold flex mt-1">show all
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-4 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                    </svg>

                    </span>
                </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-10">
                {items.map((item: any) => (
                    <Link to={`/product/${item.order}`}>
                        <div className="bg-gray-600/40 rounded-md p-5 text-white flex flex-col justify-center items-center min-h-[330px]">
                            <div className="mb-4">
                                <img
                                    src={item.images[0]}
                                    alt="arrival" className="max-h-64 object-contain"/>
                            </div>
                            <div>
                                <h1 className="font-extrabold mb-2">{item.name}</h1>
                                <h2 className="font-bold text-center">{item?.options["0"]['price']} $</h2>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}

export default Arrival