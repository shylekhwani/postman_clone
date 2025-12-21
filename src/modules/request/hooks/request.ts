/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRequestToCollection,
  deleteRequest,
  editRequest,
  getAllRequestFromCollection,
  Request,
  run,
  saveRequest,
} from "../action";
import { useRequestPlaygroundStore } from "../store/useRequestStore";

export function useAddRequestToCollection(collectionId: string) {
  const queryClient = useQueryClient();
  const { updateTabFromSavedRequest, activeTabId } =
    useRequestPlaygroundStore();
  return useMutation({
    mutationFn: async (value: Request) =>
      addRequestToCollection(collectionId, value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests", collectionId] });
      // @ts-expect-error
      updateTabFromSavedRequest(activeTabId, data);
    },
  });
}

export function useDeleteRequest(requestId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => deleteRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}

export function useEditRequest(requestId: string, name: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => editRequest(requestId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}

export function useGetAllRequestFromCollection(collectionId: string) {
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: async () => getAllRequestFromCollection(collectionId),
  });
}

export function useSaveRequest(id: string) {
  const { updateTabFromSavedRequest, activeTabId } =
    useRequestPlaygroundStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) => saveRequest(id, value),
    onSuccess: (data) => {
      console.log("Saved request data:", data);
      queryClient.invalidateQueries({ queryKey: ["requests"] });

      // @ts-ignore
      updateTabFromSavedRequest(activeTabId, data);
    },
  });
}

export function useRunRequest(requestId: string) {
  const { setResponseViewerData } = useRequestPlaygroundStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await run(requestId),
    onSuccess: (data) => {
      // console.log("Run request data:", data);
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      // @ts-expect-error
      setResponseViewerData(data);
    },
  });
}
