import { Metadata } from "next";
import WebsiteAuditorPage from "./WebsiteAuditorPage";

export const metadata: Metadata = {
  title: "Website AI Auditor",
  description:
    "Is your website ready for the AI era? Check your specialized readiness for Crawlers, RAG, and Entity Understanding.",
};

export default function Page() {
  return <WebsiteAuditorPage />;
}
