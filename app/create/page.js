// File: app/create/page.js
import SnippetForm from "../components/SnippetForm";

export default function CreateSnippet() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Snippet</h1>
      <SnippetForm />
    </div>
  );
}
