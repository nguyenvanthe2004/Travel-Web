import type React from "react";
import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText={confirmText}
      cancelText={cancelText}
      loading={loading}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle size={22} />
        </div>

        {/* Content */}
        <div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>

          <p className="mt-2 text-xs text-red-500">
            This action is permanent.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
