import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GithubCorner from "react-github-corner";
import { cn } from "@/lib/utils";

function Info({ isOpen, setIsOpen }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Codeditor Info</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Codeditor is an IDE for editing, compiling and running source codes
            online made using React UI library and uses Redux for the state
            management and backed by NodeJS/Express server.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Github Repo(frontend):{" "}
            <a
              href={"https://github.com/souravrax/codeditor-front"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              https://github.com/souravrax/codeditor-front
            </a>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Github Repo(backend):{" "}
            <a
              href={"https://github.com/souravrax/codeditor-back"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              https://github.com/souravrax/codeditor-back
            </a>
          </p>
        </div>
        <DialogFooter className="flex justify-between items-center">
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            Made with{" "}
            <span className={cn("text-red-500 font-bold text-lg")}>
              &hearts;
            </span>{" "}
            by{" "}
            <a
              target="_blank"
              href="https://souravrakshit.me/"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Sourav Rakshit
            </a>
          </p>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
        <GithubCorner
          direction="left"
          bannerColor="rgb(39 110 241)"
          size={60}
          target="_blank"
          href="https://github.com/souravrax/codeditor-front"
        />
      </DialogContent>
    </Dialog>
  );
}

export default Info;
