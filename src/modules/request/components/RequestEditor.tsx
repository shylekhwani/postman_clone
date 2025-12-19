"use client";

import { useGetAllRequestFromCollection } from "../hooks/request";
import { useRequestPlaygroundStore } from "../store/useRequestStore";
import RequestBar from "./RequestBar";
import RequestEditorArea from "./RequestEditorArea";
import ResponseViewer from "./ResponseViewer";
import StoredResponseViewer from "./StoredResponseViewer";

export default function RequestEditor() {
  const { tabs, activeTabId, updateTab, responseViewerData } =
    useRequestPlaygroundStore();

  const activeTab = tabs.find((t) => t.id === activeTabId);
  console.log("Rendering RequestEditor with activeTab:", activeTab);

  const { data: requestData } = useGetAllRequestFromCollection(
    activeTab?.collectionId || ""
  );
  console.log("Fetched request data:", requestData);

  const responseToShow = requestData?.find(
    (r) => r.id === activeTab?.requestId
  );
  console.log("Response to show:", responseToShow);

  const liveResponseForTab =
    responseViewerData?.requestRun?.requestId === activeTab?.requestId
      ? responseViewerData
      : null;

  if (!activeTab) return null;

  return (
    <div className="flex flex-col items-center justify-start py-4 px-4">
      <RequestBar tab={activeTab} updateTab={updateTab} />

      <div className="flex flex-1 flex-col w-full justify-start mt-4 items-center ">
        <RequestEditorArea tab={activeTab} updateTab={updateTab} />
      </div>

      {liveResponseForTab ? (
        <ResponseViewer responseData={liveResponseForTab} />
      ) : responseToShow?.response ? (
        // ✅ Switching tabs → show stored response
        <StoredResponseViewer response={responseToShow.response} />
      ) : (
        <div className="text-gray-400">No response available</div>
      )}
    </div>
  );
}
