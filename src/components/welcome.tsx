import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import Loader from "./loader";
import { TransactionContext } from "../context/transactioncontext";

const Input = ({
  placeholder,
  name,
  type,
  value,
  handleChange,
}: any): JSX.Element => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e: ChangeEvent) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
};

const Welcome = () => {
  const {
    currentAccount,
    connectWallet,
    formData,
    sendTransaction,
    handleChange,
  }: any = useContext<any>(TransactionContext);
  // console.log(currentAccount);

  const submitHandler = (e: any) => {
    const { addressto, amount, keyword, message } = formData;
    e.preventDefault();
    if (!addressto || !amount || !keyword || !message) {
      return;
    } else {
      sendTransaction();
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send crypto <br /> across the world
          </h1>
          <p className=" text-left mt-5 text text-white md:w-9/12 w-11/12 text-base">
            Explore the crypto world ,buy and sell cryptocurrencies easily on
            krypto
          </p>
          <React.Fragment>
            {!currentAccount && (
              <button
                type="button"
                onClick={connectWallet}
                className="flex w-full flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              >
                <AiFillPlayCircle className="text-white mr-2" />
                <p className="text-white text-base font-semibold">
                  Connet Wallet
                </p>
              </button>
            )}
          </React.Fragment>
        </div>
      </div>

      <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <Input
          className="w-full p-2 rounded-lg border-none text-white text-sm mb-2 bg-transparent blur-glassmorphisum"
          placeholder={"Address To"}
          type={"text"}
          name={"addressto"}
          handleChange={handleChange}
        />
        <Input
          className="w-full p-2 rounded-lg border-none text-white text-sm mb-2 bg-transparent blur-glassmorphisum"
          placeholder={"Amount (ETH)"}
          type="number"
          name={"amount"}
          handleChange={handleChange}
        />
        <Input
          className="w-full p-2 rounded-lg border-none text-white text-sm mb-2 bg-transparent blur-glassmorphisum"
          placeholder={"Keyword (GIF)"}
          type={"text"}
          name={"keyword"}
          handleChange={handleChange}
        />
        <Input
          className="w-full p-2 rounded-lg border-none text-white text-sm mb-2 bg-transparent blur-glassmorphisum"
          placeholder={"Message"}
          type={"text"}
          name={"message"}
          handleChange={handleChange}
        />
        <div className="h-[1px] w-full bg-gray-400 my-2" />
        {false ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div>
            <button
              type="button"
              className={
                "w-full text-white mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              }
              onClick={submitHandler}
            >
              Send Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
