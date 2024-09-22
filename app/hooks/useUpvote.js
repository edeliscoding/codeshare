import { useState } from "react";

const useUpvote = (snippetId) => {
  const [upvoting, setUpvoting] = useState(false);
  const [error, setError] = useState(null);
  const [upvotes, setUpvotes] = useState(0);

  const upvoteSnippet = async () => {
    setUpvoting(true);
    setError(null);

    try {
      const response = await fetch(`/api/snippets/${snippetId}/upvote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setUpvotes(data.upvotes);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpvoting(false);
    }
  };

  return { upvoting, upvotes, upvoteSnippet, error };
};

export default useUpvote;
