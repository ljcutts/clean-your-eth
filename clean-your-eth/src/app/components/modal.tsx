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
      <div className="modal overflow-y-scroll text-white md:break-all grid fixed place-items-center z-50 w-[100%] h-[100%] top-0 bottom-[15rem] left-0">
        <div className="bg-container flex flex-col justify-between p-5 w-[55%] h-auto rounded-[8px]">
          <h1 className="text-center mb-2">
            <span className="text-sm md:text-base font-bold">Exchange ID:</span>{" "}
            {ethToXmrExhangeID}
          </h1>
          <div className="flex flex-col md:flex-row  mb-2 items-center relative md:right-4">
            <span className="mx-4 font-bold mb-2 md:mb-0">
              Amount Of ETH To Send:
            </span>
            <img
              className="md:mr-3 mb-2 md:mb-0"
              src="./eth.png"
              alt=""
              width={20}
            />
            <span>{amountToSend} ETH</span>
          </div>
          <div className="flex flex-col md:flex-row mb-2 items-center">
            <span className="font-bold mr-2">Deposit Address:</span>{" "}
            <h1 className="ml-4 mr-3 break-all md:break-normal mb-2 md:mb-0">
              {ethReceiveAddress}
            </h1>
            <div
              onClick={() => {
                navigator.clipboard.writeText(ethReceiveAddress);
                toast.success(
                  `ETH Deposit Address Successfully Copied To Clipboard`,
                  {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              }}
              className="cursor-pointer mb-2 md:mb-0 relative bottom-[5px] hover:opacity-50"
            >
              <FaRegCopy size={25} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-2 relative md:right-6">
            <span className="mx-4 mb-1">
              <span className="font-bold md:ml-2">You Should Get:</span>{" "}
              {rate ? "" : <span>≈</span>}
            </span>
            <img className="mr-3" src="./monero.png" alt="" width={40} />
            <span>{xmrReceived} XMR</span>
          </div>
          <div className="flex mb-2 flex-col items-center md:flex-row">
            <span className="font-bold mr-2">Refund Address:</span>
            <h1 className="md:ml-4 mb-4 md:mb-0 break-all">{ethAddress}</h1>
          </div>
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
        {ethToXmrStatus === "finished" && <div className="my-4"><BsArrowDownCircle /></div>}
        {ethToXmrStatus === "finished" && (
          <div className="bg-container flex flex-col justify-between p-5 w-[65%] h-auto rounded-[8px]">
            <h1 className="mb-5 text-center">
              <span className="text-sm md:text-base font-bold">
                Exchange ID:
              </span>
              {xmrToEthExchangeID}
            </h1>
            <div className="flex flex-col md:flex-row items-center relative md:right-3">
              <span className="mx-4 font-bold mb-2">
                Amount Of Monero To Send:
              </span>
              <img className="mr-3 mb-2" src="./monero.png" alt="" width={40} />
              <span className="mb-2">{xmrReceived} XMR</span>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-2">
              <span className="font-bold mr-2 mb-1">Deposit Address:</span>{" "}
              <h1 className="ml-4 mr-3 mb-2 break-all">
                {xmrReceiveAddress}
              </h1>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(xmrReceiveAddress);
                  toast.success(
                    `XMR Deposit Address Successfully Copied To Clipboard`,
                    {
                      position: "bottom-center",
                      autoClose: 1000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                }}
                className="cursor-pointer relative bottom-[5px] hover:opacity-50"
              >
                <FaRegCopy size={25} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-1 items-center relative md:right-2">
              <span className="mx-4 mb-2 font-bold md:ml-2">
                You Should Get: {rate ? "" : <span>≈</span>}
              </span>
              <img
                className="mr-3 mb-2 md:mb-0"
                src="./eth.png"
                alt=""
                width={20}
              />
              <span className="mb-1">{ethReceived} ETH</span>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-2 relative md:right-4">
              <h1 className="break-normal ml-4 mb-4">
                <span className="font-bold">Refund Address:</span>{" "}
                {xmrAddress.slice(0, 15)}...
                {xmrAddress.slice(-4)}
              </h1>
            </div>
            <h1 className="mb-5 font-bold text-center">
              Swap Status:{" "}
              <span className="capitalize font-normal">{xmrToEthStatus}</span>
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