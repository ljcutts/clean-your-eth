import { IState as Props } from "../page";

interface IProps {
  cancelModal: Props["cancelModal"]
}

const CompleteModal: React.FC<IProps> = ({
  cancelModal,
}): JSX.Element => {
  return (
    <div className="modal grid fixed place-items-center z-50 w-[100%] h-[100%] top-0 bottom-[15rem] left-0">
      <div className="bg-white flex flex-col justify-center items-center p-5 w-[65%] h-[20rem] rounded-[8px]">
        <h1 className="pb-10">Your Transactions Have Been Completed!</h1>
        <button
          onClick={cancelModal}
          className="bg-green-400 rounded-lg p-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CompleteModal;
