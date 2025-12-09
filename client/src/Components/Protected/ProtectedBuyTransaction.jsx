import React from "react";
import CoinBuy from "../Transactions/CoinBuy";

export default function ProtectedBuyTransaction({ open }) {
  console.log(open);

  return (
    <div className="pt-[100px] md:pt-[200px] pb-10 md:pb-[107px] text-black bg-[#171b26] h-[100%]">
      <CoinBuy />
    </div>
  );
}
