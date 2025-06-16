"use strict";
import { useState, lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "@/assets/logo.png";
const Settings = lazy(() => import("./Settings"));
const Share = lazy(() => import("./Share"));
const Info = lazy(() => import("./Info"));
import { useCodeEditor } from "@/store/store";
import axios from "axios";
import {
  languageOptions as options,
  languageSet,
} from "../assets/languageOptions";
import downloadFileUtil from "../lib/downloadAsFile";
import { BACKEND_URL } from "../lib/constants";
import {
  DownloadIcon,
  InfoIcon,
  Loader2,
  PlayIcon,
  SettingsIcon,
  Share2Icon,
  ShareIcon,
  UploadIcon,
} from "lucide-react";

const URL = `${BACKEND_URL}/execute`;

const NavBar: React.FC = () => {
  const code = useCodeEditor((state) => state.code);
  const isExecuting = useCodeEditor((state) => state.isExecuting);
  const language = useCodeEditor((state) => state.language);
  const input = useCodeEditor((state) => state.input);
  const cla = useCodeEditor((state) => state.commandLineArguments);

  const setIsExecuting = useCodeEditor((state) => state.setIsExecuting);
  const setLanguage = useCodeEditor((state) => state.setLanguage);
  const setOutput = useCodeEditor((state) => state.setOutput);

  const handleRun = () => {
    setIsExecuting(true);
    const payload = {
      code: code,
      cArgs: cla,
      language: language,
      input: input,
    };

    console.table(payload);
    if (!languageSet.find(language)) {
      setIsExecuting(false);
      toast.error("Invalid Language", {
        description: "Please select a valid language from the dropdown.",
      });
      return;
    }

    console.table(payload);
    axios
      .post(URL, payload)
      .then((response) => {
        setIsExecuting(false);
        console.log("Response: ", response);
        setOutput(response.data.output);
      })
      .catch((error) => {
        setIsExecuting(false);
        console.log(error);
      });
  };

  return (
    <div className="flex w-full justify-between items-center px-8 py-2 bg-background text-foreground">
      <div className="flex items-center">
        <h1 className="flex items-center text-xl font-comfortaa">
          <img
            style={{
              height: "33px",
              marginRight: "5px",
            }}
            src={Logo}
            alt="logo"
          />
          codeditor
        </h1>
        <Select
          value={language}
          onValueChange={(lang) => {
            setLanguage(lang);
            console.log(lang);
          }}
        >
          <SelectTrigger className="w-[180px] ml-4 bg-background text-foreground">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-background text-foreground">
            {options.map((option) => (
              <SelectItem key={option.id} value={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <DownloadIcon size={24} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#282c34] text-white">
            <Button onClick={() => downloadFileUtil(code, language)}>
              Download your code
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center">
        <Button
          onClick={handleRun}
          disabled={isExecuting}
          className={cn(
            "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg",
            isExecuting && "opacity-50 cursor-not-allowed"
          )}
        >
          {isExecuting ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Running...
            </>
          ) : (
            <>
              <PlayIcon size={16} /> Run
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center">
        <Suspense>
          <Share />
        </Suspense>
        <Suspense>
          <Settings />
        </Suspense>
        <Suspense>
          <Info />
        </Suspense>
      </div>
    </div>
  );
};

export default NavBar;
