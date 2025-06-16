"use strict";;
import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { languageOptions as options } from "../assets/languageOptions";
import downloadFileUtil from "../lib/downloadAsFile";
import { BACKEND_URL } from "../lib/constants";
import { DownloadIcon, Loader2, PlayIcon } from "lucide-react";
import { Badge } from "./ui/badge";

const URL = `${BACKEND_URL}/execute`;

const NavBar: React.FC = () => {
  const code = useCodeEditor((state) => state.code);
  const isExecuting = useCodeEditor((state) => state.isExecuting);
  const language = useCodeEditor((state) => state.language);

  const setLanguage = useCodeEditor((state) => state.setLanguage);
  const execute = useCodeEditor((state) => state.execute);

  return (
    <div className="flex w-full justify-between items-center text-foreground">
      <div className="flex items-center p-4 bg-background/50 backdrop-blur-lg border rounded-2xl">
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

      <div className="flex items-center gap-2">
        <Button
          onClick={execute}
          disabled={isExecuting}
          className={cn(isExecuting && "opacity-50 cursor-not-allowed")}
          variant="default"
        >
          {isExecuting ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Running...
            </>
          ) : (
            <>
              <PlayIcon size={16} /> Run{" "}
              <Badge variant="secondary">ctrl + Enter</Badge>
            </>
          )}
        </Button>
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
