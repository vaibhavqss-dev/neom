import { useState } from "react";
import { useModal } from "../../context/ModelContext";
import ConfirmReSchedule from "../navbar/models/confirmReschedulePopup/confirmReSchedule";
import AddReview from "../addReview/addReview";

const GlobalModal = () => {
  const { isOpen, modalType, data, closeModal } = useModal();
  const [inputValue, setInputValue] = useState(data?.defaultValue || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={closeModal}
        >
          ✖
        </button>

        {modalType === "confirm" && (
          <ConfirmReSchedule
            eventId={data?.eventId}
            name={data?.title}
            open={true}
            onClose={closeModal}
            onConfirms={data?.onConfirm}
          />
        )}

        {modalType === "custom" && (
          <div>
            <h2>{data?.title || "Custom Modal"}</h2>
            <input
              type="text"
              className="border p-2 w-full mt-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={() => {
                data?.onSubmit(inputValue);
                closeModal();
              }}
            >
              Submit
            </button>
          </div>
        )}

        {modalType === "addreview" && (
          <AddReview onSubmit={data?.onSubmit} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default GlobalModal;
