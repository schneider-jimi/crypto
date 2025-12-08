import React from "react";
import { useNavigate } from "react-router-dom";

export default function WalletModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const wallets = [
    {
      name: "MetaMask",
      icon: "🦊",
      color: "bg-orange-500",
      type: "metamask"
    },
    {
      name: "Coinbase Wallet",
      icon: "🔵",
      color: "bg-blue-600",
      type: "coinbase"
    },
    {
      name: "Trust Wallet",
      icon: "🛡️",
      color: "bg-blue-500",
      type: "trust"
    },
    {
      name: "WalletConnect",
      icon: "🔗",
      color: "bg-blue-400",
      type: "walletconnect"
    }
  ];

  const connectWallet = async (walletType) => {
    try {
      if (walletType === "metamask") {
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          });
          localStorage.setItem('walletAddress', accounts[0]);
          localStorage.setItem('walletType', 'MetaMask');
          onClose(accounts[0]);
        } else {
          alert('Please install MetaMask!');
          window.open('https://metamask.io/download/', '_blank');
        }
      } else {
        alert(`${walletType} integration coming soon!`);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1d2e] rounded-2xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          {/* Left Side - Wallet Options */}
          <div className="bg-[#252837] p-8 border-r border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">Connect a Wallet</h2>
              <button
                onClick={() => onClose(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-4">Recommended</p>
              <div className="space-y-3">
                {wallets.map((wallet, index) => (
                  <button
                    key={index}
                    onClick={() => connectWallet(wallet.type)}
                    className="w-full flex items-center gap-4 p-4 bg-[#1a1d2e] hover:bg-[#2a2d3e] rounded-xl transition-all duration-200 group"
                  >
                    <div className={`${wallet.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      {wallet.icon}
                    </div>
                    <span className="text-white font-semibold text-lg">{wallet.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Information */}
          <div className="bg-[#1a1d2e] p-8 flex flex-col justify-center">
            <h3 className="text-white text-2xl font-bold mb-8">What is a Wallet?</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-2">A Home for your Digital Assets</h4>
                  <p className="text-gray-400 text-sm">
                    Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-2">A New Way to Log In</h4>
                  <p className="text-gray-400 text-sm">
                    Instead of creating new accounts and passwords on every website, just connect your wallet.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button 
                onClick={() => window.open('https://metamask.io/download/', '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Get a Wallet
              </button>
              <button 
                onClick={() => {
                  onClose(null);
                  navigate('/learn-more');
                }}
                className="w-full text-blue-400 hover:text-blue-300 font-semibold py-2 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
