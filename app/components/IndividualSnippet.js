import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowUp, MessageSquare, Heart, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import moment from "moment";
import Link from "next/link";
const IndividualSnippet = ({ snippet, onUpdate, onDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSnippet, setEditedSnippet] = useState(snippet);

  const isAuthor = session?.user?.id === snippet.userId;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await onUpdate(editedSnippet);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      await onDelete(snippet._id);
      //   router.push("/");
    }
  };

  const handleChange = (e) => {
    setEditedSnippet({ ...editedSnippet, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-900 text-white min-h-[300px] p-4">
      <div className="max-w-2xl mx-auto">
        {isEditing ? (
          <div className="space-y-4">
            <Input
              name="title"
              value={editedSnippet.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <Textarea
              name="code"
              value={editedSnippet.code}
              onChange={handleChange}
              placeholder="Snippet content"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-1xl font-bold hover:underline">
                <Link href={`/snippets/${snippet._id}`}>{snippet.title}</Link>
              </h1>
              {isAuthor && (
                <div className="space-x-2">
                  <Button onClick={handleEdit}>
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center mb-4">
              <img
                src={snippet.avatar}
                alt={snippet.userName}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="font-normal">{snippet.language}</p>
                <p className="text-gray-400 text-sm">
                  {moment(snippet.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <pre className="bg-gray-800 p-4 rounded-lg mb-4 whitespace-pre-wrap">
              {snippet.code}
            </pre>
            <div className="flex justify-between text-gray-400">
              <span className="flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> {snippet.upvotes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" /> {snippet.comments}
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" /> {snippet.likes}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IndividualSnippet;
