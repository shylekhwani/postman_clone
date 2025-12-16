/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRequestToCollection,
  getAllRequestFromCollection,
  Request,
  saveRequest,
  run,
} from "../action";
import { useRequestPlaygroundStore } from "../store/useRequestStore";

export function useAddRequestToCollection(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) =>
      addRequestToCollection(collectionId, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests", collectionId] });
    },
  });
}

export function useGetAllRequestFromCollection(collectionId: string) {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: async () => getAllRequestFromCollection(collectionId),
  });
}

export function useSaveRequest(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) => saveRequest(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}

export function useRunRequest(requestId: string) {
  const { setResponseViewerData } = useRequestPlaygroundStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await run(requestId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      setResponseViewerData(data);
    },
  });
}
