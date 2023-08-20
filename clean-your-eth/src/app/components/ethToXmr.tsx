import {useEffect} from "react"
import { IState as Props } from "../page";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";
import "./modal.css"
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
      <main className="">
        <div className="bg-white flex flex-col justify-center p-5 w-[50rem] h-[20rem] rounded-lg">
          <div className="flex mx-auto mb-3">
            <div className="flex rounded-md p-4 w-[30rem] h-[5rem] bg-input justify-center items-center">
              <h1 className="mr-3">How Much To Send</h1>
              <input
                ref={amountRef}
                value={amountToSend}
                onChange={handleChange}
                className={`rounded-md text-right pr-3 outline-none ${amountInput && "outline-red-600"}`}
                type="number"
              />
            </div>
            <div className="flex justify-center items-center ml-1 w-[7.5rem] rounded-r-lg bg-crypto h-[5rem]">
              <img src="./eth.png" alt="" width={40} height={40} />
            </div>
          </div>
          <div
            onClick={() => setRate(!rate)}
            className="flex items-center mx-auto cursor-pointer"
          >
            {!rate ? <HiLockOpen size={40} /> : <HiLockClosed size={40} />}
            {!rate ? (
              <span className="ml-1">Floating Rate</span>
            ) : (
              <span className="ml-1">Fixed Rate</span>
            )}
          </div>
          <div className="flex mx-auto mt-3">
            <div className="flex rounded-md p-4 w-[30rem] h-[5rem] bg-input justify-center items-center">
              <h1 className="mr-3">How Much To Receive</h1>
              {loading ? (
                <div className="flex items-center flex-row-reverse bg-white rounded-md h-[60%] w-[43%]">
                  <div className="lds-ring2 relative top-1">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : (
                <div className="flex pr-2 items-center flex-row-reverse bg-white rounded-md h-[50%] w-[43%]">
                  {xmrReceived}
                </div>
              )}
            </div>
            <div className="flex justify-center items-center ml-1 w-[7.5rem] rounded-r-lg bg-crypto h-[5rem]">
              <img src="./monero.png" alt="" width={50} height={50} />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mx-auto rounded-md p-3 bg-blue-300 w-[10rem] relative top-3"
          >
            Exchange
          </button>
        </div>
      </main>
    );
};

export default EthToXMR