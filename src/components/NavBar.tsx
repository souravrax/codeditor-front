"use strict";
import { useState, lazy, Suspense } from "react";

// Baseui
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Button, SIZE, SHAPE } from "baseui/button";
import { Combobox } from "baseui/combobox";
import { Heading, HeadingLevel } from "baseui/heading";
import { useSnackbar, DURATION } from "baseui/snackbar";
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";

import Logo from "../assets/logo.png";
const Settings = lazy(() => import("./Settings"));
const Share = lazy(() => import("./Share"));
const InfoModel = lazy(() => import("./Info"));


import { useCodeEditor } from "@/app/store";

import axios from "axios";

import {
  languageOptions as options,
  languageSet,
} from "../assets/languageOptions";

// Pure functions
import downloadFileUtil from "../controllers/downloadAsFile";
import { BACKEND_URL } from "../constants";

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
  const { enqueue } = useSnackbar();

  const handleRun = () => {
    setIsExecuting(true);
    if (!languageSet.find(language)) {
      setIsExecuting(false);
      enqueue(
        {
          startEnhancer: (() => (
            <i className="fas fa-exclamation-triangle"></i>
          )) as any,
          message: "Language is not valid, please select one from the dropdown",
        },
        DURATION.short
      );
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
    <div>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem
            $style={{
              color: "#fff",
              fontFamily: "Poppins",
            }}
          >
            <HeadingLevel>
              <Heading
                overrides={{
                  Block: {
                    style: ({ $theme }: { $theme: any }) => ({
                      fontSize: "20px",
                      lineHeight: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontFamily: `"Comfortaa", cursive`,
                    }),
                  },
                }}
              >
                <img
                  style={{
                    height: "33px",
                    marginRight: "5px",
                  }}
                  src={Logo}
                  alt="logo"
                />
                codeditor
              </Heading>
            </HeadingLevel>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Combobox
              value={language}
              onChange={(lang) => {
                setLanguage(lang as string);
                console.log(lang);
              }}
              size={SIZE.compact}
              options={options}
              error={language.length == 0}
              mapOptionToString={(option) => option.label}
            />
          </StyledNavigationItem>
          <StyledNavigationItem>
            <StatefulPopover
              content={() => (
                <p
                  style={{
                    padding: "15px",
                  }}
                >
                  Download your code
                </p>
              )}
              showArrow
              accessibilityType={"tooltip"}
              triggerType={TRIGGER_TYPE.hover}
            >
              <Button
                size={SIZE.compact}
                shape={SHAPE.circle}
                onClick={() => downloadFileUtil(code, language, enqueue)}
              >
                <i className="fas fa-file-download"></i>
              </Button>
            </StatefulPopover>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center}>
          <StyledNavigationItem>
            <Button
              size={SIZE.compact}
              startEnhancer={(() => <i className="fas fa-play"></i>) as any}
              isLoading={isExecuting}
              onClick={handleRun}
              overrides={{
                BaseButton: {
                  style: ({
                    $theme,
                    $isLoading,
                  }: {
                    $theme: any;
                    $isLoading: boolean;
                  }) => {
                    return {
                      backgroundColor: `${
                        $isLoading
                          ? $theme.colors.positive200
                          : $theme.colors.positive300
                      }`,
                      borderTopLeftRadius: `${$theme.borders.radius200} !important`,
                      borderTopRightRadius: `${$theme.borders.radius200} !important`,
                      borderBottomLeftRadius: `${$theme.borders.radius200} !important`,
                      borderBottomRightRadius: `${$theme.borders.radius200} !important`,
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      boxShadow: `${$theme.lighting.shadow400}`,
                    };
                  },
                },
              }}
            >
              {" "}
              Run{" "}
            </Button>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList
          $align={ALIGN.right}
          $style={{ marginRight: "10px" }}
        >
          {/* <StyledNavigationItem>
                        <Input
                            value={cla}
                            onChange={(e) => setCLA(e.target.value)}
                            placeholder="Command Line Args"
                            disabled
                            size={SIZE.compact}
                            startEnhancer={() => <i className="fas fa-terminal"></i>}
                            clearOnEscape
                        />
                    </StyledNavigationItem> */}
          <StyledNavigationItem>
            <Button
              startEnhancer={
                (() => <i className="fas fa-share-alt"></i>) as any
              }
              size={SIZE.compact}
              onClick={() => setShowShareModel(true)}
              shape={SHAPE.pill}
            >
              Share
            </Button>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Button
              size={SIZE.compact}
              onClick={() => setShowSettings(true)}
              shape={SHAPE.circle}
            >
              <i className="fas fa-cog"></i>
            </Button>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Button
              size={SIZE.compact}
              shape={SHAPE.circle}
              onClick={() => setShowInfoModel(true)}
            >
              <i className="fas fa-info"></i>
            </Button>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
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
    </div>
  );
};

export default NavBar;
