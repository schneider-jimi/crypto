import React from "react";
import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    <div className="bg-[#171b26] min-h-screen text-white pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Brain Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Understanding Web3</h1>

        {/* Introduction */}
        <p className="text-gray-300 text-lg mb-8">
          The internet has been evolving ever since it was created, and it has been through many eras.
        </p>

        {/* Web Evolution List */}
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
            </div>
            <div>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Web1</span> started during the 1990s, and it was a period marked by people connecting to the internet and reading what was there, but not publishing or contributing themselves.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
            </div>
            <div>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Web2</span> came into being during the early 2000s with the rise of social media, faster internet speeds, and mobile devices. Web2 was a period marked by user generated content, targeted advertising, and corporate owned data.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
            </div>
            <div>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Web3</span> is a new era of the internet that is currently emerging thanks to the power of blockchain technology. Web3 is marked by user-owned data, open-source software, decentralized platforms, property rights, collective action, digital money (cryptocurrencies), and interoperability.
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-300 text-lg mb-12">
          Web3 is attempting to solve many of the problems that arose during Web1 and Web2, and it will hopefully be yet another step in the direction of a digital world that works better for more people.
        </p>

        {/* Comparison Table */}
        <div className="bg-[#1d2230] rounded-xl overflow-hidden shadow-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-[#252837]">
                <th className="text-left p-4 font-semibold text-lg border-r border-gray-700">Web2</th>
                <th className="text-left p-4 font-semibold text-lg">Web3</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="p-4 text-gray-300 border-r border-gray-700">
                  Individual accounts for each website
                </td>
                <td className="p-4 text-gray-300">
                  Sign in everywhere with 1 wallet/identity
                </td>
              </tr>
              <tr className="border-t border-gray-700 bg-[#252837]/30">
                <td className="p-4 text-gray-300 border-r border-gray-700">
                  Accounts have usernames and passwords set by the user
                </td>
                <td className="p-4 text-gray-300">
                  Wallets have public addresses and private keys that are deterministic and not set by the user
                </td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-4 text-gray-300 border-r border-gray-700">
                  User data is held and controlled by the website owner
                </td>
                <td className="p-4 text-gray-300">
                  More user data is controlled by the user themself
                </td>
              </tr>
              <tr className="border-t border-gray-700 bg-[#252837]/30">
                <td className="p-4 text-gray-300 border-r border-gray-700">
                  No digital ownership or property rights
                </td>
                <td className="p-4 text-gray-300">
                  Digital ownership and property rights
                </td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-4 text-gray-300 border-r border-gray-700">
                  Not interoperable
                </td>
                <td className="p-4 text-gray-300">
                  Highly interoperable
                </td>
              </tr>
              <tr className="border-t border-gray-700 bg-[#252837]/30">
                <td className="p-4 text-gray-300 border-r border-gray-700">
                  Walled gardens, hard to change platforms
                </td>
                <td className="p-4 text-gray-300">
                  Open gardens, change platforms whenever you like
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Resources Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/30">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-6">
            Connect your wallet to start exploring the world of decentralized finance and cryptocurrency trading.
          </p>
          <Link 
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Connect Wallet
          </Link>
        </div>
      </div>
    </div>
  );
}
