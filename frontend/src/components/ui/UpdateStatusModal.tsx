import React, { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { HotelStatus } from "../../constants";
import Modal from "./Modal";

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: HotelStatus) => void;

  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;

  value?: HotelStatus;
  loading?: boolean;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Update status",
  description = "Select a new status for this hotel.",
  confirmText = "Update",
  cancelText = "Cancel",
  value,
  loading = false,
}) => {
  const [status, setStatus] = useState<HotelStatus | "">(value ?? "");

  const handleConfirm = () => {
    if (!status) return;
    onConfirm(status as HotelStatus);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmText={confirmText}
      cancelText={cancelText}
      loading={loading}
      disabled={!status}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <RefreshCcw size={22} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="mb-3 text-sm text-gray-600 leading-relaxed">
            {description}
          </p>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as HotelStatus)}
            className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select status</option>

            {Object.values(HotelStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateStatusModal;
