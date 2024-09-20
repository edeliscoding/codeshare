// File: app/snippets/page.js
import SnippetList from "../components/SnippetList";

export default function Snippets() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Code Snippets</h1>
      <SnippetList />
    </div>
  );
}
