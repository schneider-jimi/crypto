import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CoinBuy() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [data, setdata] = useState();
  const [currprise, setcurrprise] = useState();
  const [id, setid] = useState();
  const [allTransaction, setallTransaction] = useState([]);
  const [currBalance, setcurrBalance] = useState();
  const [Quantity, setQuantity] = useState("");
  const [Amount, setAmount] = useState("");
  const [Quantity_for_amount, setQuantity_for_amount] = useState("");
  const [Amount_for_amount, setAmount_for_amount] = useState("");
  const [activeTab, setActiveTab] = useState("quantity");
  const [isProcessing, setIsProcessing] = useState(false);

  const login = localStorage.getItem("authToken");

  useEffect(() => {
    setdata(state.data);
  }, []);

  const getid = async () => {
    const response = await fetch(
      "https://cryptofolio-backstack-aiwo.onrender.com/dashboard/dashboard",
      {
        method: "POST",
        body: JSON.stringify({ Token: localStorage.authToken }),
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        header: "Access-Control-Allow-Origin: *",
      }
    );
    let json = await response.json();
    setid(json.id);
  };

  useEffect(() => {
    setcurrprise(
      ((`${state.data.current_price}` / 100) * 70).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      })
    );
  }, []);

  useEffect(() => {
    if (login) {
      getallTransaction();
      getid();
    }
  }, []);

  const getallTransaction = async () => {
    await axios({
      method: "POST",
      url: "https://cryptofolio-backstack-aiwo.onrender.com/wallet/getwalletTransaction",
      data: {
        login: login,
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      setallTransaction(res.data);
    });
  };

  const getamount = async () => {
    await axios({
      method: "POST",
      url: "https://cryptofolio-backstack-aiwo.onrender.com/wallet/getwalletAmount",
      data: {
        login: login,
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      setcurrBalance(res.data[0].Amount);
    });
  };

  const getusertransaction_byQuantity = async () => {
    if (Number(Quantity) <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    setIsProcessing(true);
    await getamount();

    let object = {
      img: state.data.image,
      CoinId: state.data.id,
      CoinName: state.data.name,
      Quantity: Quantity,
      Amount: (`${state.data.current_price}` / 100) * 70 * Quantity,
      Date: new Date(),
      Prise: (`${state.data.current_price}` / 100) * 70,
      type: "Buy",
    };

    allTransaction.push(object);

    const response = await axios({
      method: "POST",
      url: "https://cryptofolio-backstack-aiwo.onrender.com/transactions/transactions",
      data: {
        Quantity: Quantity,
        Amount: (`${state.data.current_price}` / 100) * 70 * Quantity,
        login: login,
        CoinName: data.name,
        Transaction: allTransaction,
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      setIsProcessing(false);
      if (res.data === "NO") {
        alert("Not enough balance");
      }
      if (res.data === "YES") {
        window.history.go(-1);
      }
    });
  };

  const getusertransaction_byAmount = async () => {
    if (Number(Amount_for_amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsProcessing(true);
    await getamount();

    let object = {
      img: state.data.image,
      CoinId: state.data.id,
      CoinName: state.data.name,
      Quantity:
        Amount_for_amount / ((`${state.data.current_price}` / 100) * 70),
      Amount: Amount_for_amount,
      Date: new Date(),
      Prise: (`${state.data.current_price}` / 100) * 70,
      type: "Buy",
    };

    allTransaction.push(object);

    const response = await axios({
      method: "POST",
      url: "https://cryptofolio-backstack-aiwo.onrender.com/transactions/transactions",
      data: {
        Quantity:
          Amount_for_amount / ((`${state.data.current_price}` / 100) * 70),
        Amount: Amount_for_amount,
        login: login,
        CoinName: data.name,
        Transaction: allTransaction,
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      setIsProcessing(false);
      if (res.data === "NO") {
        alert("Not enough balance");
      }
      if (res.data === "YES") {
        window.history.go(-1);
      }
    });
  };

  useEffect(() => {
    if (Quantity.length === 0) {
      setAmount("");
    }
  }, [Quantity]);

  const onchangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    setAmount(
      ((`${state.data.current_price}` / 100) * 70 * Quantity).toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }
      )
    );
  }, [Quantity]);

  useEffect(() => {
    if (Amount_for_amount.length === 0) {
      setQuantity_for_amount("");
    }
  }, [Amount_for_amount]);

  const onchangeAmount = (e) => {
    setAmount_for_amount(e.target.value);
  };

  useEffect(() => {
    setQuantity_for_amount(
      Amount_for_amount / ((`${state.data.current_price}` / 100) * 70)
    );
  }, [Amount_for_amount]);

  return (
    <div className="min-h-screen bg-[#171b26] pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <button
            onClick={() => window.history.go(-1)}
            className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Confirm Payment</h1>
          <p className="text-gray-400">Complete your transaction securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coin Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#252837] to-[#1a1d2e] rounded-2xl p-6 border border-gray-700/50 shadow-2xl sticky top-24">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30"></div>
                  <img
                    src={data?.image}
                    alt={data?.name}
                    className="w-24 h-24 relative z-10 mx-auto"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{data?.name}</h2>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">{data?.symbol}</p>
                
                <div className="bg-[#171b26] rounded-xl p-4 border-l-4 border-green-500">
                  <p className="text-gray-400 text-sm mb-1">Current Price</p>
                  <p className="text-2xl font-bold text-green-400">{currprise}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#252837] to-[#1a1d2e] rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-700/50">
                <button
                  onClick={() => setActiveTab("quantity")}
                  className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                    activeTab === "quantity"
                      ? "bg-blue-600 text-white"
                      : "bg-[#1a1d2e] text-gray-400 hover:text-white"
                  }`}
                >
                  Buy by Quantity
                </button>
                <button
                  onClick={() => setActiveTab("amount")}
                  className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                    activeTab === "amount"
                      ? "bg-blue-600 text-white"
                      : "bg-[#1a1d2e] text-gray-400 hover:text-white"
                  }`}
                >
                  Buy by Amount
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {activeTab === "quantity" ? (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={Quantity}
                        onChange={onchangeQuantity}
                        className="w-full bg-[#171b26] text-white border border-gray-700 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        placeholder="Enter quantity"
                      />
                    </div>

                    <div className="bg-[#171b26] rounded-xl p-4 border border-gray-700/50">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total Amount</span>
                        <span className="text-2xl font-bold text-white">{Amount || "₹0.00"}</span>
                      </div>
                    </div>

                    <button
                      onClick={getusertransaction_byQuantity}
                      disabled={isProcessing || !Quantity}
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Confirm Purchase
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={Amount_for_amount}
                        onChange={onchangeAmount}
                        className="w-full bg-[#171b26] text-white border border-gray-700 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        placeholder="Enter amount"
                      />
                    </div>

                    <div className="bg-[#171b26] rounded-xl p-4 border border-gray-700/50">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">You will receive</span>
                        <span className="text-2xl font-bold text-white">
                          {Quantity_for_amount ? Quantity_for_amount.toFixed(6) : "0"} {data?.symbol?.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={getusertransaction_byAmount}
                      disabled={isProcessing || !Amount_for_amount}
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Confirm Purchase
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
