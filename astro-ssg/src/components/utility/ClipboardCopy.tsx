import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ClipboardCopyProps {
  targetRef: React.RefObject<HTMLElement>;
  className?: string;
}

function ClipboardCopy({ targetRef, className }: ClipboardCopyProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!targetRef.current) return;

    const textToCopy = targetRef.current.textContent ?? "";

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error("Failed to copy text to clipboard: ", error);
    }
  };

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className={cn("", className)}
      onClick={handleCopy}
    >
      {copied ? (
        <ClipboardCheckIcon className="size-4" />
      ) : (
        <ClipboardIcon className="size-4" />
      )}
    </Button>
  );
}

export default ClipboardCopy;
