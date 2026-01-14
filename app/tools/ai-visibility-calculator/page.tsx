import { Metadata } from "next";
import AiVisibilityPage from "./AiVisibilityPage";

export const metadata: Metadata = {
  title: "AI Visibility Calculator",
  description:
    "Test how well your content ranks in AI search results with our advanced 5-point analysis.",
};

export default function Page() {
  return <AiVisibilityPage />;
}
