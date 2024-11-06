import React from "react";
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";

const engine = new Styletron();

const Centered = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
});

export default function BaseWebProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <Centered>{children}</Centered>
            </BaseProvider>
        </StyletronProvider>
    );
}
