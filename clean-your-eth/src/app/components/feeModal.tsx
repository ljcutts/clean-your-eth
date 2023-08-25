import { IState as Props } from "../page";

interface IProps {
  feeTransactionCompleted: Props["feeTransactionCompleted"]
  setFeeModal: Props["setFeeModal"]
}

const FeeModal: React.FC<IProps> = ({ feeTransactionCompleted, setFeeModal }): JSX.Element => {
  return (
    <div className="modal text-white grid fixed place-items-center z-50 w-[100%] h-[100%] top-0 bottom-[15rem] left-0">
      <div className="bg-container flex flex-col justify-center items-center p-5 w-[65%] h-[20rem] rounded-[8px]">
        {feeTransactionCompleted ? (
          <h1 className="pb-10 font-bold">Fee Transaction Completed</h1>
        ) : (
          <h1 className="pb-10 font-bold">
            Waiting For Fee Transaction To Complete...
          </h1>
        )}
        {feeTransactionCompleted ? (
          <button
            onClick={() => setFeeModal(false)}
            className="bg-green-400 font-semibold hover:text-green-400 hover:bg-white hover:ease-in hover:duration-300 rounded-lg p-2"
          >
            Confirm
          </button>
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
    </div>
  );
};

export default FeeModal