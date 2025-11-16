import React from "react";

export default function ConfirmModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6  shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">Do you want to delete this item?</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Yes
          </button>

          <button
            onClick={() => {
              //   onConfirm(false);
              onClose();
            }}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
