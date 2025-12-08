import { redirect } from "next/navigation";
import { getFirstDoc } from "@/lib/docs";

export default function DocsPage() {
  const firstDoc = getFirstDoc();

  if (firstDoc) {
    redirect(`/docs/${firstDoc.slug}`);
  }

  // Fallback to introduction if no docs found
  redirect("/docs/introduction");
}
