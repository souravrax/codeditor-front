"use strict";
import { useState, lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toaster, toast } from "sonner";
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
const InfoModel = lazy(() => import("./Info"));
import ImportSharedCode from "./ImportSharedCode";
import { useCodeEditor } from "@/app/store";
import axios from "axios";
import {
  languageOptions as options,
  languageSet,
} from "../assets/languageOptions";
import downloadFileUtil from "../lib/downloadAsFile";
import { BACKEND_URL } from "../lib/constants";

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
  const setCLA = useCodeEditor((state) => state.setCommandLineArguments);

  const [showSettings, setShowSettings] = useState(false);
  const [showShareModel, setShowShareModel] = useState(false);
  const [showImportCodeModel, setShowImportCodeModel] = useState(false);
  const [showInfoModel, setShowInfoModel] = useState(false);

  const handleRun = () => {
    setIsExecuting(true);
    if (!languageSet.find(language)) {
      setIsExecuting(false);
      toast.error("Invalid Language", {
        description: "Please select a valid language from the dropdown.",
      });
      return;
    }
    const payload = {
      code: code,
      cArgs: cla,
      language: language,
      input: input,
    };
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
    <div className="flex w-full justify-between items-center px-4 py-2 bg-[#1b1c1e] text-white">
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
          <SelectTrigger className="w-[180px] ml-4 bg-[#282c34] text-white">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-[#282c34] text-white">
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <i className="fas fa-file-download"></i>
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
              <i className="fas fa-spinner fa-spin mr-2"></i> Running...
            </>
          ) : (
            <>
              <i className="fas fa-play mr-2"></i> Run
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center mr-2">
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={() => setShowShareModel(true)}
        >
          <i className="fas fa-share-alt"></i>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={() => setShowImportCodeModel(true)}
        >
          <i className="fas fa-file-import"></i>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={() => setShowSettings(true)}
        >
          <i className="fas fa-cog"></i>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={() => setShowInfoModel(true)}
        >
          <i className="fas fa-info"></i>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Settings
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Share show={showShareModel} setShow={setShowShareModel} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <InfoModel isOpen={showInfoModel} setIsOpen={setShowInfoModel} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ImportSharedCode
          show={showImportCodeModel}
          setShow={setShowImportCodeModel}
        />
      </Suspense>
      <Toaster />
    </div>
  );
};

export default NavBar;
