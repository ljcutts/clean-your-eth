import "./modal.css"
import { IState as Props } from "../page";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BsArrowDownCircle } from "react-icons/bs";
import {FaRegCopy} from "react-icons/fa6"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

interface IProps {
  ethToXmrExhangeID: Props["ethToXmrExhangeID"];
  amountToSend: Props["amountToSend"];
  ethReceiveAddress: Props["ethReceiveAddress"];
  ethAddress: Props["ethAddress"];
  ethToXmrStatus: Props["ethToXmrStatus"];
  xmrReceived: Props["xmrReceived"];
  xmrToEthExchangeID: Props["xmrToEthExchangeID"];
  ethReceived: Props["ethReceived"];
  xmrReceiveAddress: Props["xmrReceiveAddress"];
  xmrAddress: Props["xmrAddress"];
  xmrToEthStatus: Props["xmrToEthStatus"]
  cancelModal: Props["cancelModal"]
  rate: Props["rate"]
}

const Modal: React.FC<IProps> = ({
  ethToXmrExhangeID,
  amountToSend,
  ethReceiveAddress,
  ethAddress,
  xmrReceived,
  ethToXmrStatus,
  xmrToEthExchangeID,
  xmrReceiveAddress,
  ethReceived,
  xmrAddress,
  xmrToEthStatus,
  cancelModal, 
  rate
}): JSX.Element => {
  return (
    <>
      <div className="modal text-white break-all grid fixed place-items-center z-50 w-[100%] h-[100%] top-0 bottom-[15rem] left-0">
        <div className="bg-container flex flex-col justify-between p-5 w-[65%] h-auto rounded-[8px]">
          <h1 className="text-center mb-2">
            <span className="font-bold">Exchange ID:</span> {ethToXmrExhangeID}
          </h1>
          <div className="flex mb-2 items-center">
            <span className="mx-4 font-bold">Amount Of ETH To Send:</span>
            <img className="mr-3" src="./eth.png" alt="" width={20} />
            <span>{amountToSend} ETH</span>
          </div>
          <div className="flex mb-2 items-center">
            <h1 className="ml-4 mr-3 mb-2">
              <span className="font-bold mr-2">Deposit Address:</span>{" "}
              {ethReceiveAddress}
            </h1>
            <div
              onClick={() => {
                navigator.clipboard.writeText(ethReceiveAddress)
                toast.success(`Deposit Address Successfully Copied To Clipboard`, {
                  position: "bottom-center",
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }}
              className="cursor-pointer relative bottom-[5px] hover:opacity-50"
            >
              <FaRegCopy size={25} />
            </div>
          </div>
          <div className="flex items-center mb-2">
            <span className="mx-4 mb-1">
              <span className="font-bold">You Should Get:</span>{" "}
              {rate ? "" : <span>≈</span>}
            </span>
            <img className="mr-3" src="./monero.png" alt="" width={40} />
            <span>{xmrReceived} XMR</span>
          </div>
          <h1 className="ml-4 mb-4">
            <span className="font-bold mr-2">Refund Address:</span> {ethAddress}
          </h1>
          <h1 className="mb-5 font-bold text-center">
            Swap Status:{" "}
            <span className="capitalize font-normal">{ethToXmrStatus}</span>
          </h1>
          {ethToXmrStatus === "finished" ? (
            <div className="flex justify-center items-center">
              <IoIosCheckmarkCircle size={40} />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {ethToXmrStatus === "waiting" && (
            <div className="flex mt-3 justify-center items-center">
              <button
                onClick={cancelModal}
                className="p-2 bg-red-500 font-semibold rounded-lg hover:text-red-500 hover:bg-white hover:ease-in hover:duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        {ethToXmrStatus === "finished" && <BsArrowDownCircle />}
        {ethToXmrStatus === "finished" && (
          <div className="bg-white p-5 w-[65%] h-auto rounded-[8px]">
            <h1 className="mb-5 text-center">
              Exchange ID: {xmrToEthExchangeID}
            </h1>
            <div className="flex items-center">
              <span className="mx-4">Amount Of Monero To Send:</span>
              <img className="mr-3" src="./monero.png" alt="" width={40} />
              <span>{xmrReceived} XMR</span>
            </div>
            <div className="flex items-center">
              <h1 className="ml-4 mr-3 mb-2">
                Deposit Address: {xmrReceiveAddress}
              </h1>
              <div
                onClick={() => navigator.clipboard.writeText(xmrReceiveAddress)}
                className="cursor-pointer relative bottom-[5px] hover:opacity-50"
              >
                <FaRegCopy size={25} />
              </div>
            </div>
            <div className="flex mb-1 items-center">
              <span className="mx-4 mb-2">
                You Should Get: {rate ? <span>=</span> : <span>≈</span>}
              </span>
              <img className="mr-3" src="./eth.png" alt="" width={20} />
              <span>{ethReceived} ETH</span>
            </div>
            <h1 className="break-normal ml-4 mb-4">
              <span className="font-bold">Refund Address:</span>{" "}
              {xmrAddress.slice(0, 15)}...
              {xmrAddress.slice(-4)}
            </h1>
            <h1 className="mb-5 text-center">
              Swap Status: <span className="capitalize">{xmrToEthStatus}</span>
            </h1>
            {xmrToEthStatus === "finished" ? (
              <div className="flex justify-center items-center">
                <IoIosCheckmarkCircle size={40} />
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Modal