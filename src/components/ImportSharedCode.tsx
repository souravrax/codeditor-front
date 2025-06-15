import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE,
} from "baseui/modal";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { Button, SIZE, SHAPE, KIND as ButtonKind } from "baseui/button";
import { useSnackbar } from "baseui/snackbar";

import importHandler from "../controllers/importHandler";

import { useCodeEditor } from "@/app/store";

interface BodyProps {
  id: string;
  setShow: (show: boolean) => void;
  enqueue: any; // TODO: Define a more specific type for enqueue
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  importHandler: (
    id: string,
    setIsLoading: (isLoading: boolean) => void,
    setCode: (code: string) => void,
    setInput: (input: string) => void,
    setLanguage: (language: string) => void,
    setShow: (show: boolean) => void,
    enqueue: any
  ) => void; // TODO: Define a more specific type for importHandler
  setId: (id: string) => void;
}

const Body: React.FC<BodyProps> = ({
  id,
  setShow,
  enqueue,
  isLoading,
  setIsLoading,
  importHandler,
  setId,
}) => {
  const setCode = useCodeEditor((s) => s.setCode);
  const setInput = useCodeEditor((s) => s.setInput);
  const setLanguage = useCodeEditor((s) => s.setLanguage);
  const setOutput = useCodeEditor((s) => s.setOutput);

  const [css] = useStyletron();
  return (
    <>
      <div className={css({ display: "flex" })}>
        <Input
          placeholder="ID of the shared code"
          value={id}
          onChange={(e) => setId((e.target as HTMLInputElement).value)}
          autoFocus
        />
        <Button
          startEnhancer={(() => <i className="fas fa-file-import"></i>) as any} // TODO: Fix type
          kind={ButtonKind.primary}
          isLoading={isLoading}
          onClick={() => {
            // console.log("called");
            setIsLoading(true);
            importHandler(
              id,
              setIsLoading,
              setCode,
              setInput,
              setLanguage,
              setShow,
              enqueue
            );
            setOutput("");
          }}
        >
          Import
        </Button>
      </div>
      <p
        className={css({
          marginTop: "10px",
          width: "100%",
          fontFamily: `system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif`,
          fontWeight: 400,
        })}
      >
        <i
          className={
            `fas fa-info-circle ` +
            css({
              marginRight: "5px",
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
  const { enqueue } = useSnackbar();

  return (
    <Modal
      onClose={() => {
        setShow(false);
      }}
      closeable
      animate
      autoFocus
      isOpen={show}
      unstable_ModalBackdropScroll={true}
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>
        <h3>Import Shared Code</h3>
      </ModalHeader>
      <ModalBody>
        <Body
          enqueue={enqueue}
          id={id}
          importHandler={importHandler}
          isLoading={isLoading}
          setId={setId}
          setIsLoading={setIsLoading}
          setShow={setShow}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton
          onClick={() => {
            setShow(false);
          }}
          kind={ButtonKind.tertiary}
        >
          Close
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default ImportSharedCode;
