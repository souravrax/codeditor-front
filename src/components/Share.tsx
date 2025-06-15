import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast, Toaster } from "sonner";

import exportHandler from "@/lib/exportHandler";
import { languageSet } from "@/assets/languageOptions";
import { useCodeEditor } from "@/app/store";

const Share: React.FC<{ show: boolean; setShow: (show: boolean) => void }> = ({
  show,
  setShow,
}) => {
  const code = useCodeEditor((state) => state.code);
  const language = useCodeEditor((state) => state.language);
  const input = useCodeEditor((state) => state.input);

  const linkRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState("");
  const [copied, setCopied] = useState(false);

  const [expire, setExpire] = useState("1"); // Changed to string for shadcn/ui select

  const shareHandler = () => {
    if (code.length === 0) {
      toast.error("Code should not be blank", {
        icon: <i className="fas fa-exclamation-triangle"></i>,
      });
      return;
    } else if (!languageSet.find(language)) {
      toast.error("Choose a valid language", {
        icon: <i className="fas fa-exclamation-triangle"></i>,
      });
      return;
    }
    setClicked(true);
    setIsLoading(true);
    setCopied(false);
    exportHandler(
      code,
      language,
      input,
      { value: expire },
      setIsLoading,
      setId
    ); // Pass expire as object
  };

  const options = [
    { label: "5 minutes", value: "1" },
    { label: "30 minutes", value: "2" },
    { label: "2 hours", value: "3" },
    { label: "12 hours", value: "4" },
    { label: "1 day", value: "5" },
    { label: "5 days", value: "6" },
  ];
  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        setShow(open);
        if (!open) setClicked(false);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Code</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expire" className="text-right">
              Expire After
            </Label>
            <Select onValueChange={setExpire} value={expire}>
              <SelectTrigger id="expire" className="col-span-3">
                <SelectValue placeholder="Select expiry time" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={shareHandler}
            disabled={isLoading}
            className="w-full"
          >
            <i className="fas fa-share mr-2"></i>
            Share
          </Button>
          {/* Copying the ID */}
          <div className="flex items-center space-x-2">
            {clicked ? (
              isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <>
                  <Input
                    ref={linkRef}
                    placeholder="Link"
                    value={id}
                    readOnly
                    className="flex-grow"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      linkRef.current && linkRef.current.select();
                      document.execCommand("copy");
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    }}
                  >
                    <i className="fas fa-copy mr-2"></i>
                    Copy
                  </Button>
                </>
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                <i className="fas fa-info-circle mr-2"></i>
                Click Share to get the share ID
              </p>
            )}
          </div>
          {copied && (
            <p className="text-sm text-green-500">
              Copied to your clipboard 🎉, share this key with others 😀
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default Share;
