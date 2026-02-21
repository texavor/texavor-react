import { getDocsByCategory } from "@/lib/docs";
import DocsLanding from "./DocsLanding";

export default function DocsPage() {
  const categorizedDocs = getDocsByCategory();

  return <DocsLanding categories={categorizedDocs} />;
}
