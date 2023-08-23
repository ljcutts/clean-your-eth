import {useEffect} from "react"
import { IState as Props } from "../page";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  amountToSend: Props["amountToSend"];
  handleChange: Props["handleChange"];
  setXmrReceived: Props["setXmrReceived"]
  xmrReceived: Props["xmrReceived"]
  handleSubmit: Props["handleSubmit"]
  rate: Props["rate"]
  setRate: Props["setRate"]
  loading: Props["loading"]
  setLoading: Props["setLoading"]
  amountRef: Props["amountRef"]
  amountInput: Props["amountInput"]
  setAmountInput: Props["setAmountInput"]
}

const EthToXMR: React.FC<IProps> = ({amountToSend, handleChange, xmrReceived, setXmrReceived, handleSubmit, rate, setRate, loading, setLoading, amountRef, amountInput, setAmountInput}): JSX.Element => {
   const getEstimate = async () => {
    setLoading(true)
    const fixed = rate
    const amount = amountToSend === "" ? "0" : amountToSend
     const response =  await fetch("/getEstimate", {
       method: "POST",
       body: JSON.stringify({ fixed, amount }),
     });
     const data = await response.json()
     if (data.error && data.error !== "amount must be a positive number") {
       setXmrReceived("");
        toast.error(`${data.error}`, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: "error1"
        });
        if(String(data.error).includes("Amount does not fall within the range")) {
          setAmountInput(true)
        }
        setLoading(false)
       return;
     } else {
       setXmrReceived(data.amount);
       setAmountInput(false)
     }
     setLoading(false)
   };

    useEffect(() => {
      if(amountToSend !== "") {
        getEstimate(); 
      }   
    }, [amountToSend, rate]);

    return (
      <>
        <div className="bg-container w-[75%] flex flex-col justify-center p-5 sm:w-[50rem] h-[20rem] rounded-lg">
          <div className="flex mx-auto mb-3">
            <div className="flex flex-col sm:flex-row w-auto rounded-md border-black border-solid sm:border-[5px] font-semibold p-4 sm:w-[30rem] h-[5rem] text-white bg-insideContainer mx-auto justify-center items-center">
              <h1 className="mr-3">How Much To Send</h1>
              <input
                ref={amountRef}
                value={amountToSend}
                onChange={handleChange}
                className={`rounded-md text-black text-right pr-3 outline-none ${
                  amountInput && "outline-red-600"
                }`}
                type="number"
              />
            </div>
            <div className="hidden sm:flex justify-center items-center ml-1 w-[7.5rem] rounded-r-lg bg-crypto h-[5rem]">
              <img src="./eth.png" alt="" width={40} height={40} />
            </div>
          </div>
          <div
            onClick={() => setRate(!rate)}
            className="flex items-center mx-auto lock"
          >
            {!rate ? <HiLockOpen size={40} /> : <HiLockClosed size={40} />}
            {!rate ? (
              <span className="text-white ml-1">Floating Rate</span>
            ) : (
              <span className="text-white ml-1">Fixed Rate</span>
            )}
          </div>
          <div className="flex mx-auto mt-3">
            <div className="flex flex-col sm:flex-row w-auto text-white border-black border-solid sm:border-[5px] font-semibold rounded-md p-4 sm:w-[30rem] h-[5rem] bg-insideContainer justify-center items-center">
              <h1 className="mr-3">How Much To Receive</h1>
              {loading ? (
                <div className="flex items-center flex-row-reverse bg-white rounded-md h-[60%] w-[198px] sm:w-[43%]">
                  <div className="lds-ring2 relative top-1">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : (
                <div className="flex pr-2 items-center text-black flex-row-reverse bg-white rounded-md h-[50%] w-[198px] sm:w-[43%]">
                  {xmrReceived}
                </div>
              )}
            </div>
            <div className="hidden sm:flex justify-center items-center ml-1 w-[7.5rem] rounded-r-lg bg-crypto h-[5rem]">
              <img src="./monero.png" alt="" width={50} height={50} />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mx-auto rounded-md hover:text-black hover:bg-white hover:ease-in hover:duration-500 p-3 bg-crypto font-bold text-white w-[10rem] relative top-3"
          >
            Exchange
          </button>
        </div>
      </>
    );
};

export default EthToXMR