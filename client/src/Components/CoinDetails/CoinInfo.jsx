import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WalletModal from "../WalletModal";

export default function CoinInfo({ state, open }) {
  const navigate = useNavigate();
  const data = state.value;
  const [Coindata, setCoindata] = useState({});
  const [currencyRupee, setcurrencyRupee] = useState(true);
  const [clicked, setclicked] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const login = localStorage.getItem("authToken");
  const walletAddress = localStorage.getItem("walletAddress");

  const check = () => {
    if ((login || walletAddress) && clicked) {
      navigate("/transaction", { state: { data } });
    }
  };

  const handleWalletConnect = (address) => {
    setShowWalletModal(false);
    if (address) {
      // After wallet connection, proceed with the transaction
      if (clicked) {
        navigate("/transaction", { state: { data } });
      }
    }
  };

  const handlebuy = () => {
    setclicked(true);
    if (login || walletAddress) {
      navigate("/transaction", { state: { data } });
    } else {
      setShowWalletModal(true);
    }
  };

  const handlesell = () => {
    setclicked(true);
    if (login || walletAddress) {
      navigate("/transactionSell", { state: { data } });
    } else {
      setShowWalletModal(true);
    }
  };

  useEffect(() => {
    if (currencyRupee === true) {
      setCoindata({
        current_price: ((`${data.current_price}` / 100) * 70).toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          }
        ),
        high: ((`${data.high_24h}` / 100) * 70).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
        low: ((`${data.low_24h}` / 100) * 70).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
        priceChange: ((`${data.price_change_24h}` / 100) * 70).toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          }
        ),
        pricePercentageChange: `${data.price_change_percentage_24h}`,
      });
    } else {
      setCoindata({
        current_price: (`${data.current_price}` / 100).toLocaleString("en-US", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "USD",
        }),
        high: (`${data.high_24h}` / 100).toLocaleString("en-US", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "USD",
        }),
        low: (`${data.low_24h}` / 100).toLocaleString("en-US", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "USD",
        }),
        priceChange: (`${data.price_change_24h}` / 100).toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "USD",
          }
        ),
        pricePercentageChange: `${data.price_change_percentage_24h}`,
      });
    }
    check();
  }, [currencyRupee, login, walletAddress]);

  const isPricePositive = data.price_change_24h >= 0;

  return (
    <>
      <div className="max-w-7xl mx-auto mt-10 mb-10 animate-fadeIn">
        <div className="bg-[#1d2230] rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 md:p-8">
          
          {/* Left Side - Coin Info */}
          <div className="bg-gradient-to-br from-[#252837] to-[#1a1d2e] rounded-xl p-6 flex flex-col items-center justify-center space-y-4 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                className="w-28 h-28 relative z-10 transform group-hover:scale-110 transition-transform duration-300" 
                src={data.image} 
                alt={data.name}
              />
            </div>
            <h2 className="text-3xl font-bold text-white">{data.name}</h2>
            <span className="text-gray-400 text-sm uppercase tracking-wider">{data.symbol}</span>
          </div>

          {/* Right Side - Price Details */}
          <div className="bg-gradient-to-br from-[#252837] to-[#1a1d2e] rounded-xl p-6 border border-gray-700/50 space-y-4">
            
            {/* Current Price - Highlighted */}
            <div className="bg-[#171b26] rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium">Current Price</span>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${isPricePositive ? 'text-green-400' : 'text-red-400'}`}>
                    {Coindata.current_price}
                  </div>
                  <div className={`text-sm ${isPricePositive ? 'text-green-400' : 'text-red-400'} flex items-center justify-end gap-1`}>
                    {isPricePositive ? '↑' : '↓'} {Math.abs(parseFloat(Coindata.pricePercentageChange)).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Other Price Info */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between items-center p-3 bg-[#171b26] rounded-lg hover:bg-[#1f2332] transition-colors">
                <span className="text-gray-400 text-sm">High Price (24h)</span>
                <span className="text-white font-semibold">{Coindata.high}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-[#171b26] rounded-lg hover:bg-[#1f2332] transition-colors">
                <span className="text-gray-400 text-sm">Low Price (24h)</span>
                <span className="text-white font-semibold">{Coindata.low}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-[#171b26] rounded-lg hover:bg-[#1f2332] transition-colors">
                <span className="text-gray-400 text-sm">Price Change (24h)</span>
                <span className={`font-semibold ${isPricePositive ? 'text-green-400' : 'text-red-400'}`}>
                  {Coindata.priceChange}
                </span>
              </div>
            </div>

            {/* Currency Toggle */}
            <div className="flex gap-2 pt-2">
              <button
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  currencyRupee 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50 scale-105' 
                    : 'bg-[#171b26] text-gray-400 hover:bg-[#1f2332]'
                }`}
                onClick={() => setcurrencyRupee(true)}
              >
                ₹ RUPEE
              </button>
              <button
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  !currencyRupee 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50 scale-105' 
                    : 'bg-[#171b26] text-gray-400 hover:bg-[#1f2332]'
                }`}
                onClick={() => setcurrencyRupee(false)}
              >
                $ DOLLAR
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-[#252837] p-6 border-t border-gray-700/50">
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <button
              onClick={handlebuy}
              className="flex-1 group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                BUY
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>

            <button
              onClick={handlesell}
              className="flex-1 group relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                SELL
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
        </div>
      </div>
      
      <WalletModal 
        isOpen={showWalletModal} 
        onClose={handleWalletConnect}
      />
    </>
  );
}
