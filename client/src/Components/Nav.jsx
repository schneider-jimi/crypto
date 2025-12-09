import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WalletModal from "./WalletModal";

export default function Nav({ open }) {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  let json;

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const handleWalletConnect = (address) => {
    if (address) {
      setWalletAddress(address);
    }
    setShowWalletModal(false);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletType');
  };

  const handleDashboard = async () => {
    console.log(localStorage.authToken);
    const response = await fetch("https://cryptofolio-backstack-aiwo.onrender.com/dashboard/dashboard", {
      method: "POST",
      body: JSON.stringify({ Token: localStorage.authToken }),
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },

      header: "Access-Control-Allow-Origin: *",
    });
    json = await response.json();
    console.log("response we get");
    console.log(json);
    navigate("/dashboard", { state: { id: json.id } });
  };

  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    console.log("loggedout");
  };

  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <>
      <div className="fixed w-screen z-30">
        <div>
          <ul className="flex justify-between bg-[#131722] h-[70px] text-white w-[100%] p-5">
            <div>
              <li className="text-[15px] sm:text-[18px] md:text-2xl font-bold  text-white  ">
                <Link to="/">CryptoFolio</Link>
              </li>
            </div>
            <div className="text-[20px] font-bold  text-white ">
              {!localStorage.getItem("authToken") && !walletAddress ? (
                <div className="flex items-center">
                  <button
                    onClick={() => setShowWalletModal(true)}
                    className="bg-white text-black px-4 py-2 rounded-lg text-[13px] sm:text-[15px] md:text-[16px] font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    </svg>
                    Connect
                  </button>
                </div>
              ) : walletAddress ? (
                <div className="flex items-center gap-3 text-[15px] sm:text-[16px] md:text-[17px]">
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-[13px] sm:text-[14px]">
                    {formatAddress(walletAddress)}
                  </span>
                  <button 
                    onClick={disconnectWallet}
                    className="hover:text-red-400 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className=" flex text-[15px] sm:text-[18px] md:text-xl">
                  <li className="mx-2">
                    <button onClick={handleDashboard}>Dashboard</button>
                  </li>
                  <li className="mx-2">
                    <button onClick={handlelogout}>SignOut</button>
                  </li>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
      
      <WalletModal 
        isOpen={showWalletModal} 
        onClose={handleWalletConnect}
      />
    </>
  );
}
