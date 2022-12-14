import React, {
  useState,
  useEffect
} from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/contractabi";

export const TransactionContext = React.createContext({});

const { ethereum }: any = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log(provider, signer,transactionContract);

  return transactionContract;
};

export const TransactionProvider = ({ children }: any): JSX.Element => {
  const [transaction,setTransaction]=useState([])
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('TransactionCount'));
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<any>("");
  const [formData, setFormData] = useState({
    addressto: "",
    amount: "",
    message: "",
    keyword: "",
  });
  const handleChange = (e: any, name: any) => {
    setFormData((previousState) => ({
      ...previousState,
      [name]: e.target.value,
    }));
  };

  const checkifwalletisconneted = async () => {
    try {
      if (!ethereum) {
        return console.log("please connect to the metaMask");
      } else {
        console.log(await ethereum.request({ method: "eth_accounts" }));

        const account = await ethereum.request({ method: "eth_accounts" });
        console.log("acc", account);

        if (account.length >= 0) {
          setCurrentAccount(account[0]);
          // getAllTransaction()
        } else {
          console.log("no accounts found");
        }
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return console.log("please connect to metamask");
      } else {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(account);
        setCurrentAccount(account[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        return console.log("please connect to metamask");
      } else {
        const { addressto, amount, keyword, message } = formData;
        console.log(addressto, amount, keyword, message);
        
        const parsedamount = ethers.utils.parseEther(amount);
         ethereum.request(
          {
            method: "eth_sendTransaction",
            params: [{
              From: currentAccount,
              To: addressto,
              gas: "0x5208",
              value: parsedamount._hex,
            }],
          },
        );
        const transactionContract = createEthereumContract();
        console.log(addressto);
        
        const transactionHash = await transactionContract.transfer(
          addressto,
          parsedamount,
          // message,
          // keyword
        );

        setIsLoading(true);
        console.log(`isLoading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log("Success", transactionHash.hash);
        setIsLoading(false);

        // const transactionCount =
        //   await transactionContract.getTransactionCount();
        // setTransactionCount(transactionCount.toNumber());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionExist = async () => {
    try {
      if (ethereum) {
        const transactionContract = createEthereumContract();
        const currentTransactionCount =
          await transactionContract.getTransactionCount();
        window.localStorage.setItem(
          "TransactionCount",
          currentTransactionCount
        );
      } else {
        console.log("please connect to eatherum");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const getAllTransaction=async()=>{
  //   try {
  //     if(ethereum){
  //       const transactionContract=createEthereumContract()
  //       const availableTransaction=await transactionContract.getAllTransactions()

  //      const structeredTransaction= availableTransaction.map((transaction:any)=>({
  //         addressto:transaction.receiver,
  //         addressfrom:transaction.sender,
  //         amount:parseInt(transaction.amount._hex)/(10**18),
  //         keyword:transaction.keyword,
  //         message:transaction.message,
  //         timestamp:new Date(transaction.timestamp.toNumber()*1000).toLocaleString()

  //       }))
  //       console.log("structered",structeredTransaction);
        
  //     }
  //   } catch (error) {
  //     console.log(error);
      
      
  //   }

  // }

  useEffect(() => {
    checkifwalletisconneted();
    checkIfTransactionExist();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        formData,
        sendTransaction,
        handleChange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
