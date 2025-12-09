import React from "react";
<<<<<<< HEAD
import { useEffect } from "react";
=======
>>>>>>> 5c82861 (crypto/update)
import CoinBuy from "../Transactions/CoinBuy";

export default function ProtectedBuyTransaction({ open }) {
  console.log(open);

<<<<<<< HEAD
  // useEffect(() => {
    // const login = localStorage.getItem("authToken");
    // console.log(login);
    // if (!login) {
    //   open[1](true);
      
    // }
  // });
=======
>>>>>>> 5c82861 (crypto/update)
  return (
    <div className="pt-[100px] md:pt-[200px] pb-10 md:pb-[107px] text-black bg-[#171b26] h-[100%]">
      <CoinBuy />
    </div>
  );
}
