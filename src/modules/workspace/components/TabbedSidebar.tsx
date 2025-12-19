import { Archive, Clock, Code, Share2, Loader } from "lucide-react";
import React, { useState } from "react";
import CreateCollection from "../../collections/components/CreateCollection";
import { useCollections } from "@/modules/collections/hooks/collectionHooks";
import RenderTabContent from "./RenderTabContent";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentWorkspace: any;
}

const sidebarItems = [
  { icon: Archive, label: "Collections" },
  { icon: Clock, label: "History" },
  { icon: Share2, label: "Share" },
  { icon: Code, label: "Code" },
];

const TabbedSidebar = ({ currentWorkspace }: Props) => {
  const [activeTab, setActiveTab] = useState("Collections");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: collections, isLoading } = useCollections(currentWorkspace?.id);

  if (isLoading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-6 h-6 text-indigo-400 animate-spin" />
      </div>
    );

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar */}
      <div className="w-12 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 space-y-4">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(item.label)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
              activeTab === item.label
                ? "bg-indigo-600 text-white"
                : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            <item.icon className="w-4 h-4" />
          </div>
        ))}
      </div>

      <div className="flex-1 bg-zinc-900 overflow-y-auto">
        <RenderTabContent
          activeTab={activeTab}
          currentWorkspace={currentWorkspace}
          collections={collections || []}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      <CreateCollection
        workspaceId={currentWorkspace?.id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default TabbedSidebar;
