/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { Code, FileText } from "lucide-react";

interface Props {
  response: any; // stored JSON
}

export default function StoredResponseViewer({ response }: Props) {
  const [activeTab, setActiveTab] = useState<"json" | "raw">("json");

  let formattedJson = "";
  try {
    formattedJson =
      typeof response === "string"
        ? response
        : JSON.stringify(response, null, 2);
  } catch {
    formattedJson = String(response);
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 mt-6 w-full">
      <CardHeader>
        <CardTitle className="text-gray-200">
          Stored Response (Last Saved)
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (value === "json" || value === "raw") {
              setActiveTab(value);
            }
          }}
        >
          <TabsList className="bg-transparent px-6">
            <TabsTrigger value="json">
              <Code className="w-4 h-4 mr-2" />
              JSON
            </TabsTrigger>
            <TabsTrigger value="raw">
              <FileText className="w-4 h-4 mr-2" />
              Raw
            </TabsTrigger>
          </TabsList>

          <TabsContent value="json">
            <Editor
              height="300px"
              defaultLanguage="json"
              value={formattedJson}
              theme="vs-dark"
              options={{ readOnly: true, minimap: { enabled: false } }}
            />
          </TabsContent>

          <TabsContent value="raw">
            <Editor
              height="300px"
              defaultLanguage="text"
              value={String(response)}
              theme="vs-dark"
              options={{ readOnly: true, minimap: { enabled: false } }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
