"use client"
import { useState, useEffect, useRef } from 'react'
import EthToXMR from './components/ethToXmr'
import Modal from "./components/modal";
import CompleteModal from './components/completeModal';
import { useAccount, useBalance, } from "wagmi";
import {  writeContract, waitForTransaction } from "@wagmi/core";
import Navbar from "./components/navbar"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ABI, ADDRESS} from "../app/contractInfo/swapfee"
import { parseEther } from 'viem';
import "../app/components/modal.css"

//add how it works page

export type IState = {
  amountToSend: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  cancelModal: () => void;
  xmrReceived: string;
  setXmrReceived: React.Dispatch<React.SetStateAction<string>>;
  ethToXmrExhangeID: string;
  ethReceiveAddress: string;
  xmrToEthExchangeID: string;
  xmrReceiveAddress: string;
  ethAddress: string;
  ethToXmrStatus: string;
  ethReceived: string;
  xmrAddress: string;
  xmrToEthStatus: string;
  completeModal: boolean;
  setCompleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  rate: boolean;
  setRate: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  amountRef: React.RefObject<HTMLInputElement>;
  amountInput: boolean;
  setAmountInput: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Home() {  
  const xmrRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null)
   const {address, isConnected} = useAccount()
   const {data} = useBalance({
     address: address,
   });
   const [ethAddress, setEthAddress] = useState<string>("");
   const [xmrAddress, setXmrAddress] = useState<string>("")
   const [amountToSend, setAmountToSend] = useState<string>("")
   const [ethReceiveAddress,setEthReceiveAddress] = useState<string>("")
   const [xmrReceiveAddress, setXmrReceiveAddress] = useState<string>("");
   const [ethReceived, setEthReceived] = useState<string>("")
   const [xmrReceived, setXmrReceived] = useState<string>("")
   const [ethToXmrExhangeID, setEthToXmrExchangeID] = useState<string>("");
   const [xmrToEthExchangeID, setXmrToEthExchangeID] = useState<string>("");
   const [ethToXmrStatus, setEthToXmrStatus] = useState<string>("waiting")
   const [xmrToEthStatus, setXmrToEthStatus] = useState<string>("waiting")
   const [submitted, setSubmitted] = useState<boolean>(false)
   const [transactionsCompleted, setTransactionsCompleted] = useState<boolean>(false)
   const [completeModal, setCompleteModal] = useState<boolean>(false)
   const [rate, setRate] = useState<boolean>(true);
   const [counter, setCounter] = useState<number>(0)
   const [loading, setLoading] = useState<boolean>(false);
   const [xmrInput, setXmrInput] = useState<boolean>(false)
   const [amountInput, setAmountInput] = useState<boolean>(false)
   
  const ethToXmrExchange = async() => {
    if(ethToXmrExhangeID === "") {
    const token_one = "eth"
    const token_two = "xmr"
    const amount_to_send = amountToSend
    const address = xmrAddress
    const refund_address = ethAddress
    const fixed = rate
    const response = await fetch("/createExchange", {
      method: "POST",
      body: JSON.stringify({token_one, token_two, amount_to_send, address, refund_address, fixed})
    });
    const data = await response.json()

    if (!data.exchange_id) {
      setLoading(false)
      toast.error(
        `${data.error}`,
        {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
      return
    }  
    setEthToXmrExchangeID(data.exchange_id)
    setEthReceiveAddress(data.receive_address)
    setXmrReceived(data.amount_to_receive);
    setSubmitted(true);
    } else {
      const id = ethToXmrExhangeID
      const response = await fetch("/getExchange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id})
    });
    const data = await response.json()
    const status = data.status
    setEthToXmrStatus(status)
    } 
  }

  const xmrToEthExchange = async () => {
    if (xmrToEthExchangeID === "") {
      const token_one = "xmr";
      const token_two = "eth";
      const amount_to_send = xmrReceived;
      const address = ethAddress;
      const refund_address = xmrAddress;
      const fixed = rate;
      const response = await fetch("/createExchange", {
        method: "POST",
        body: JSON.stringify({
          token_one,
          token_two,
          amount_to_send,
          address,
          refund_address,
          fixed
        }),
      });
      const data = await response.json();
      console.log("createExchange", data);

      if (!data.exchange_id) {
        setLoading(false)
        toast.error(`${data.error}`, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return
      }
      setXmrToEthExchangeID(data.exchange_id);
      setXmrReceiveAddress(data.receive_address);
      setEthReceived(data.amount_to_receive);
    } else {
      const id = xmrToEthExchangeID
      const response = await fetch("/getExchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      const status = data.status;
      setXmrToEthStatus(status);
      if(status === "finished") {
        setTransactionsCompleted(true)
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToSend(e.target.value)
  };

  const cancelModal = () => {
     setEthAddress(address as string)
     setEthToXmrExchangeID("")
     setEthReceiveAddress("")
     setXmrAddress("")
     setXmrReceived("")
     setAmountToSend("")
     setSubmitted(false)
     setCompleteModal(false)
  }

   const handleSubmit = async() => {
    setEthAddress(address as string)
    const ethBalance = data?.formatted as string
    const correctLength = (xmrAddress.length === (95 || 106))
    const firstCharacter = xmrAddress.charAt(0) === "8" || xmrAddress.charAt(0) === "4"
    const secondCharacter = !isNaN(Number(xmrAddress.charAt(1))) || xmrAddress.charAt(1) === "A" || xmrAddress.charAt(1) === "B"
    if(!isConnected) {
      setLoading(false);
      toast.error(`Connect Your ETH Wallet`, {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
      if (!correctLength || !firstCharacter || !secondCharacter) {
        setLoading(false)
        setXmrInput(true)
        toast.error(`This Is Not A Valid XMR Address`, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        xmrRef?.current?.focus()
        return;
      } else {
        setXmrInput(false)
      }
      if(parseInt(ethBalance) < parseInt(amountToSend)) {
        setLoading(false)
        toast.error(`Insufficient ETH Balance`, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAmountInput(true)
        amountRef?.current?.focus()
        return
      } else {
        setAmountInput(false)
      }
      if(xmrReceived !== "" && xmrReceived !== undefined && amountToSend !== "" && amountToSend !== undefined) {
          try {
            const { hash } = await writeContract({
              account: address,
              address: ADDRESS,
              abi: ABI,
              functionName: "payFee",
              value: parseEther(amountToSend),
            });
            await waitForTransaction({ hash });
          } catch (error) {
            console.log(error);
            toast.error(`${error}`, {
              position: "top-left",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          }
      }
      await ethToXmrExchange()
   }

  useEffect(() => {
     if (submitted && ethToXmrStatus !== "finished") {
         setTimeout(async() => {
          setCounter(counter + 1);
          await ethToXmrExchange()
         }, 2000);
     }
     if(ethToXmrStatus === "finished" && xmrToEthStatus !== "finished" && !transactionsCompleted) {
       setTimeout(async() => {
         setCounter(counter + 1);
         await xmrToEthExchange();
       }, 2000);
     }
     if (amountToSend === "") {
       setXmrReceived("");
     }
  })

  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col w-[75%] justify-center items-center bg-container text-white md:w-[30rem] h-[10rem] mt-2 rounded-lg mb-3">
          <h1 className="pl-2 pr-1 text-sm mb-2 italic">
            Your Connected ETH Address Will Be Used For Transfers
          </h1>
          <h1 className="pl-2 text-sm mb-2 sm:mb-6 font-semibold">
            Paste Your Monero Address To Receive/Send Monero
          </h1>
          <input
            value={xmrAddress}
            ref={xmrRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setXmrAddress(e.target.value)
            }
            className={`bg-input text-black text-sm font-semibold outline-none px-3 rounded-md ${
              xmrInput && "outline-red-600"
            }`}
            type="text"
          />
        </div>
        <EthToXMR
          amountToSend={amountToSend}
          handleChange={handleChange}
          setXmrReceived={setXmrReceived}
          xmrReceived={xmrReceived}
          handleSubmit={handleSubmit}
          rate={rate}
          setRate={setRate}
          loading={loading}
          setLoading={setLoading}
          amountRef={amountRef}
          amountInput={amountInput}
          setAmountInput={setAmountInput}
        />
        {submitted && !transactionsCompleted && (
          <Modal
            ethToXmrExhangeID={ethToXmrExhangeID}
            amountToSend={amountToSend}
            ethReceiveAddress={ethReceiveAddress}
            ethAddress={ethAddress}
            ethToXmrStatus={ethToXmrStatus}
            xmrReceived={xmrReceived}
            xmrToEthExchangeID={xmrToEthExchangeID}
            ethReceived={ethReceived}
            xmrReceiveAddress={xmrReceiveAddress}
            xmrAddress={xmrAddress}
            xmrToEthStatus={xmrToEthStatus}
            cancelModal={cancelModal}
            rate={rate}
          />
        )}
        {!completeModal && transactionsCompleted && (
          <CompleteModal cancelModal={cancelModal} />
        )}
      </main>
    </>
  );
}