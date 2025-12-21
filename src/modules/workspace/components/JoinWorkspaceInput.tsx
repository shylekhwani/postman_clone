/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

export default function JoinWorkspaceInput({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [invite, setInvite] = useState("");
  const [loading, setLoading] = useState(false);

  const extractToken = (value: string) => {
    try {
      // supports full URL or raw token
      const url = new URL(value);
      return url.pathname.split("/").pop();
    } catch {
      return value;
    }
  };

  const handleJoin = async () => {
    if (!invite.trim()) return;

    setLoading(true);
    try {
      const token = extractToken(invite);

      const res = await fetch("/api/workspace/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        throw new Error("Invalid invite");
      }

      toast.success("Workspace joined");
      setInvite("");
      onSuccess?.();
    } catch (err) {
      toast.error("Failed to join workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 space-y-2">
      <p className="text-xs text-muted-foreground">Join via invite link</p>

      <div className="flex gap-2">
        <Input
          placeholder="Paste invite link or token"
          value={invite}
          onChange={(e) => setInvite(e.target.value)}
          className="h-8"
        />
        <Button size="sm" onClick={handleJoin} disabled={loading}>
          Join
        </Button>
      </div>
    </div>
  );
}
