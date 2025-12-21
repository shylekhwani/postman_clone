"use client";

import Modal from "@/components/ui/modal";
import { useEditRequest } from "../hooks/request";
import React, { useState } from "react";
import { toast } from "sonner";

const EditRequestModal = ({
  isModalOpen,
  setIsModalOpen,
  requestId,
  initialName,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  requestId: string;
  initialName: string;
}) => {
  const [name, setName] = useState(initialName);
  const { mutateAsync, isPending } = useEditRequest(requestId, name);
  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await mutateAsync();
      toast.success("Request updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to update request");
      console.error("Failed to update request:", err);
    }
  };

  return (
    <Modal
      title="Edit Request"
      description="Rename your request"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText={isPending ? "Saving..." : "Save Changes"}
      submitVariant="default"
    >
      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Request name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default EditRequestModal;
