import { getContent } from "@/lib/content";
import ContentEditor from "@/components/admin/content-editor";

export default function ContentPage() {
  const content = getContent();
  return <ContentEditor initialContent={content} />;
}
