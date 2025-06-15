import React from "react";
import { useStyletron } from "baseui";
import {
    ModalHeader,
    ModalFooter,
    Modal,
    ModalBody,
    ModalButton,
    SIZE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { Paragraph3 } from "baseui/typography";
import { StyledLink } from "baseui/link";
import GithubCorner from "react-github-corner";

function Info({ isOpen, setIsOpen }) {
    const [css] = useStyletron();
    return (
        <div>
            <Modal
                onClose={() => setIsOpen(false)}
                closeable
                isOpen={isOpen}
                size={SIZE.default}
                unstable_ModalBackdropScroll={true}
                overrides={{
                    Dialog: {
                        style: ({ $theme }) => ({
                            border: `2px solid ${$theme.colors.accent}`,
                        }),
                    },
                }}
            >
                <ModalHeader>
                    <h3>Codeditor Info</h3>
                </ModalHeader>
                <ModalBody>
                    <Paragraph3>
                        Codeditor is an IDE for editing, compiling and running
                        source codes online made using React UI library and uses
                        Redux for the state management and backed by
                        NodeJS/Express server.
                    </Paragraph3>
                    <br />
                    <Paragraph3>
                        Github Repo(frontend):{" "}
                        <StyledLink
                            href={
                                "https://github.com/souravrax/codeditor-front"
                            }
                            target="_blank"
                            animateUnderline
                        >
                            https://github.com/souravrax/codeditor-front
                        </StyledLink>
                    </Paragraph3>
                    <Paragraph3>
                        Github Repo(backend):{" "}
                        <StyledLink
                            href={"https://github.com/souravrax/codeditor-back"}
                            target="_blank"
                            animateUnderline
                        >
                            https://github.com/souravrax/codeditor-back
                        </StyledLink>
                    </Paragraph3>
                </ModalBody>
                <ModalFooter
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Paragraph3
                        $style={{
                            textAlign: "center",
                        }}
                    >
                        Made with{" "}
                        <span
                            className={css({
                                color: "red",
                                fontWeight: "bold",
                                fontSize: "1.6em",
                            })}
                        >
                            &hearts;
                        </span>{" "}
                        by{" "}
                        <StyledLink
                            target="_blank"
                            href="https://souravrakshit.me/"
                            animateUnderline
                        >
                            Sourav Rakshit
                        </StyledLink>
                    </Paragraph3>
                    <ModalButton
                        kind={ButtonKind.primary}
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </ModalButton>
                </ModalFooter>
                <GithubCorner
                    direction="left"
                    bannerColor="rgb(39 110 241)"
                    size={60}
                    target="_blank"
                    href="https://github.com/souravrax/codeditor-front"
                />
            </Modal>
        </div>
    );
}

export default Info;
