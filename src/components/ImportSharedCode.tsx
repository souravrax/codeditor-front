import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import importHandler from "@/lib/importHandler";

import { useCodeEditor } from "@/app/store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface BodyProps {
  id: string;
  setShow: (show: boolean) => void;
  toast: any;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  importHandler: (
    id: string,
    setIsLoading: (isLoading: boolean) => void,
    setCode: (code: string) => void,
    setInput: (input: string) => void,
    setLanguage: (language: string) => void,
    setShow: (show: boolean) => void,
    toast: any
  ) => void;
  setId: (id: string) => void;
}

const Body: React.FC<BodyProps> = ({
  id,
  setShow,
  toast,
  isLoading,
  setIsLoading,
  importHandler,
  setId,
}) => {
  const setCode = useCodeEditor((s) => s.setCode);
  const setInput = useCodeEditor((s) => s.setInput);
  const setLanguage = useCodeEditor((s) => s.setLanguage);
  const setOutput = useCodeEditor((s) => s.setOutput);

  return (
    <>
      <div className={cn("flex gap-2")}>
        <Input
          placeholder="ID of the shared code"
          value={id}
          onChange={(e) => setId((e.target as HTMLInputElement).value)}
          autoFocus
        />
        <Button
          variant="default"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            importHandler(
              id,
              setIsLoading,
              setCode,
              setInput,
              setLanguage,
              setShow,
              toast
            );
            setOutput("");
          }}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <i className="fas fa-file-import mr-2"></i>Import
        </Button>
      </div>
      <p className={cn("mt-10 w-full font-normal")}>
        <i
          className={
            `fas fa-info-circle ` +
            cn({
              "mr-2": true,
            })
          }
        ></i>
        Enter the share ID to fetch the code
      </p>
    </>
  );
};

interface ImportSharedCodeProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ImportSharedCode: React.FC<ImportSharedCodeProps> = ({
  show,
  setShow,
}) => {
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog
      onOpenChange={() => {
        setShow(false);
      }}
      open={show}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Shared Code</DialogTitle>
          <DialogDescription>
            Enter the share ID to fetch the code.
          </DialogDescription>
        </DialogHeader>
        <Body
          toast={toast}
          id={id}
          importHandler={importHandler}
          isLoading={isLoading}
          setId={setId}
          setIsLoading={setIsLoading}
          setShow={setShow}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setShow(false)}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportSharedCode;
