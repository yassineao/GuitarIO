import TeachingAssistant from "@/components/teaching/TeachingAssistant";
import { teachingDocuments } from "@/lib/teaching-content";
import ProtectedRoute from "@/components/protectedContent";

export default function TeachingPage() {
  return(
  <ProtectedRoute>
   <TeachingAssistant teachingDocuments={teachingDocuments} />;
  </ProtectedRoute>)
}
