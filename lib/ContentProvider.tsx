"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "./content";
import defaultContent from "@/data/site-content.json";

const ContentContext = createContext<SiteContent>(
  defaultContent as unknown as SiteContent,
);

export function ContentProvider({
  initialContent,
  children,
}: {
  initialContent: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={initialContent}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
