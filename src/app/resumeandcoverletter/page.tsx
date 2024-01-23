"use client";
import { CopilotProvider } from "@copilotkit/react-core";
import { CopilotSidebarUIProvider } from "@copilotkit/react-ui";
import "@copilotkit/react-textarea/styles.css";
import "@copilotkit/react-ui/styles.css";
import React, { useEffect, useState } from "react";
import { CoverLetterAndResume } from "../components/resume";

function buildResume() {
  return (
    <CopilotProvider chatApiEndpoint="./../api/copilotkit/chat">
      <CopilotSidebarUIProvider>
        <CoverLetterAndResume />
      </CopilotSidebarUIProvider>
    </CopilotProvider>
  );
}

export default buildResume;
