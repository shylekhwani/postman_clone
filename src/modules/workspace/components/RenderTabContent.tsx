/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import EmptyCollections from "../../collections/components/EmptyCollection";
import CollectionFolder from "@/modules/collections/components/CollectionFolder";
import { ExternalLink, HelpCircle, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  activeTab: string;
  currentWorkspace: any;
  collections: any[];
  setIsModalOpen: (value: boolean) => void;
}

const RenderTabContent = ({
  activeTab,
  currentWorkspace,
  collections,
  setIsModalOpen,
}: Props) => {
  // console.log("collections in RenderTabContent:", collections);

  if (activeTab === "Collections") {
    return (
      <div className="h-full bg-zinc-950 text-zinc-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-zinc-400">
              {currentWorkspace?.name}
            </span>
            <span className="text-zinc-600">›</span>
            <span className="text-sm font-medium">Collections</span>
          </div>

          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
            <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500"
            />
          </div>
        </div>

        {/* New Button */}
        <div className="p-4 border-b border-zinc-800">
          <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New</span>
          </Button>
        </div>

        {/* Collection List */}
        {collections && collections.length > 0 ? (
          collections.map((collection) => (
            <div
              key={collection.id}
              className="flex flex-col p-3 border-b border-zinc-800"
            >
              <CollectionFolder
                collection={collection}
                currentWorkspace={currentWorkspace}
              />
            </div>
          ))
        ) : (
          <EmptyCollections />
        )}
      </div>
    );
  } else {
    return (
      <div className="p-4 text-zinc-400">Select a tab to view content</div>
    );
  }
};

export default RenderTabContent;
