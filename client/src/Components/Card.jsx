import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Card() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=true";
  const [info, setinfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setinfo(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const SkeletonCard = () => (
    <div className="rounded-md shadow-md p-5 shadow-[#00000066] m-3 w-[180px] border-t-2 border-[#0000001c] bg-gradient-to-br from-[#252837] to-[#1a1d2e]">
      <div className="mx-auto w-[100px] h-[100px] bg-gray-700/50 rounded-full animate-pulse"></div>
      <div className="p-1 text-center font-medium space-y-3 mt-3">
        <div className="h-4 bg-gray-700/50 rounded w-3/4 mx-auto animate-pulse"></div>
        <div className="h-4 bg-gray-700/50 rounded w-1/2 mx-auto animate-pulse" style={{ animationDelay: '150ms' }}></div>
        <div className="h-4 bg-gray-700/50 rounded w-2/3 mx-auto animate-pulse" style={{ animationDelay: '300ms' }}></div>
        <div className="h-4 bg-gray-700/50 rounded w-2/3 mx-auto animate-pulse" style={{ animationDelay: '450ms' }}></div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#1d2230] mx-auto text-white p-7 pb-20 min-h-[600px]">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="font-bold text-[20px] text-center mx-auto sm:text-left xl:text-[29px] w-[80%] text-white p-4">
          Explore top Crypto's Like Bitcoin Ethereum and Dogecoin
          <p className="text-[#c0c0c0] pt-5 hidden sm:inline-flex font-normal text-[15px] mx-auto sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-[15px]">
            buying and selling cryptocurrencies on a cryptocurrency exchange or
            trading platform in order to make a profit from the price
            fluctuations of cryptocurrencies.
          </p>
          <p className="text-[#d2d1d1] pt-5 hidden sm:inline-flex font-normal text-[15px] mx-auto sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-[15px]">
            It's important to keep in mind that crypto trading requires
            discipline and a long-term strategy, as well as the ability to
            manage risk effectively. It's also recommended to start with a small
            investment and gradually increase your exposure as you gain
            experience and knowledge.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto relative">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="inline-block">
                    <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-400 mt-4 font-medium">Loading cryptocurrencies...</p>
                </div>
              </div>
            </>
          ) : info.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No cryptocurrencies found</p>
            </div>
          ) : (
            info.map((value, key) => {
              if (key < 6) {
                return (
                  <div
                    key={key}
                    className="opacity-0 animate-fadeIn"
                    style={{
                      animationDelay: `${key * 100}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <Link
                      to={{
                        pathname: "/coin",
                        hash: `${value.name}`,
                      }}
                      state={{ value }}
                    >
                      <div className="rounded-md shadow-md p-5 shadow-[#00000066] m-3 w-[180px] border-t-2 border-[#0000001c] hover:scale-105 hover:shadow-xl transition-all duration-300 hover:border-blue-500/50 cursor-pointer">
                        <div className="mx-auto w-[100px] h-[100px]">
                          <img
                            src={value.image}
                            alt={value.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="p-1 text-center font-medium">
                          <h3 className="truncate">Name- {value.name}</h3>
                          <p>Value- ₹{value.current_price.toLocaleString()}</p>
                          <h3 className="text-green-400">
                            Up- ₹{value.high_24h.toLocaleString()}
                          </h3>
                          <h3 className="text-red-400">
                            Down- ₹{value.low_24h.toLocaleString()}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
              return null;
            })
          )}
        </div>
      </div>
    </div>
  );
}
