"use client";

import Modal from "@/components/ui/modal";

import { toast } from "sonner";
import { useDeleteWorkspace } from "../hooks/workspace";
import { useGetWorkspaceMemebers } from "@/modules/invites/hooks/invite";
import { currentUser } from "@/modules/authentication/actions";
import { useEffect, useMemo, useState } from "react";

const DeleteWorkspaceModal = ({
  isModalOpen,
  setIsModalOpen,
  workspaceId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  workspaceId: string;
}) => {
  const [userId, setUserId] = useState<string | undefined>("");

  const { data: workspaceMembers } = useGetWorkspaceMemebers(workspaceId);

  useEffect(() => {
    const fetchUser = async function () {
      const user = await currentUser();

      setUserId(user?.id);
    };
    fetchUser();
  }, []);

  const currentUserRole = useMemo(() => {
    let UserRole;
    workspaceMembers?.map((mbr) => {
      if (mbr.userId === userId) {
        UserRole = mbr.role;
      }
    });
    return UserRole;
  }, [workspaceMembers, userId]);

  const { mutateAsync, isPending } = useDeleteWorkspace(workspaceId);

  const handleDelete = async () => {
    try {
      if (currentUserRole !== "ADMIN") {
        toast.error("Only ADMINS are allowed to delete workspace");
        setIsModalOpen(false);
        return null;
      }
      await mutateAsync();
      toast.success("Workspace deleted successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete workspace");
      console.error("Failed to delete workspace:", err);
    }
  };

  return (
    <Modal
      title="Delete Workspace"
      description="Are you sure you want to delete this workspace? This action cannot be undone."
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleDelete}
      submitText={isPending ? "Deleting..." : "Delete"}
      submitVariant="destructive"
    >
      <p className="text-sm text-zinc-500">
        Once deleted, all collections and data in this workspace will be
        permanently removed.
      </p>
    </Modal>
  );
};

export default DeleteWorkspaceModal;
