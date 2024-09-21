// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import {
//   ArrowUp,
//   MessageSquare,
//   Heart,
//   Edit,
//   Trash,
//   Copy,
//   Check,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import moment from "moment";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// export default function SingleSnippetPage() {
//   const { id } = useParams();

//   const router = useRouter();
//   const { data: session } = useSession();
//   const [isEditing, setIsEditing] = useState(false);
//   //   const [editedSnippet, setEditedSnippet] = useState(snippet);
//   const [snippet, setSnippet] = useState(null);
//   const [copied, setCopied] = useState(false);

//   const isAuthor = session?.user?.id === snippet?.userId;

//   const handleEdit = () => setIsEditing(true);

//   const handleSave = async () => {
//     // Implement API call to update snippet
//     setIsEditing(false);
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this snippet?")) {
//       // Implement API call to delete snippet
//       router.push("/snippets");
//     }
//   };

//   const handleChange = (e) => {
//     setSnippet({ ...snippet, [e.target.name]: e.target.value });
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(snippet.content).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`/api/snippets/${id}`);
//       const res = await response.json();
//       setSnippet(res);
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-4">
//       <div className="max-w-3xl mx-auto">
//         <Button onClick={() => router.push("/snippets")} className="mb-4">
//           &larr; Back to Snippets
//         </Button>

//         {isEditing ? (
//           <div className="space-y-4">
//             <input
//               className="w-full bg-gray-800 p-2 rounded"
//               name="title"
//               value={snippet?.title}
//               onChange={handleChange}
//             />
//             <Textarea
//               className="w-full bg-gray-800 p-2 rounded"
//               name="code"
//               value={snippet?.code}
//               onChange={handleChange}
//               rows={10}
//             />
//             <div className="flex justify-end space-x-2">
//               <Button onClick={() => setIsEditing(false)}>Cancel</Button>
//               <Button onClick={handleSave}>Save</Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-3xl font-bold">Hello</h1>
//               {/* {isAuthor && (
//                 <div className="space-x-2">
//                   <Button onClick={handleEdit}>
//                     <Edit className="w-4 h-4 mr-2" /> Edit
//                   </Button>
//                   <Button variant="destructive" onClick={handleDelete}>
//                     <Trash className="w-4 h-4 mr-2" /> Delete
//                   </Button>
//                 </div>
//               )} */}
//             </div>

//             <div className="flex items-center mb-4">
//               <img
//                 src={snippet?.avatar}
//                 alt={snippet?.userName}
//                 className="w-10 h-10 rounded-full mr-3"
//               />
//               <div>
//                 <p className="font-normal">{snippet?.language}</p>
//                 <p className="text-gray-400 text-sm">
//                   {moment(snippet?.createdAt).fromNow()}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-gray-800 p-4 rounded-lg mb-4 relative">
//               {/* <pre className="whitespace-pre-wrap overflow-x-auto">
//                 <code>{snippet?.code}</code>
//               </pre> */}
//               <textarea
//                 id="code"
//                 value={snippet?.code}
//                 // onChange={(e) => setCode(e.target.value)}
//                 required
//                 rows={10}
//                 className="mt-1 bg-gray-900 text-white p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//               <SyntaxHighlighter
//                 language={snippet?.language}
//                 style={docco}
//                 showLineNumbers={true}
//                 lineProps={{
//                   style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
//                 }}
//                 wrapLines={true}
//               >
//                 {snippet?.code}
//               </SyntaxHighlighter>

//               <Button
//                 className="absolute top-2 right-2"
//                 onClick={copyToClipboard}
//               >
//                 {copied ? (
//                   <Check className="w-4 h-4" />
//                 ) : (
//                   <Copy className="w-4 h-4" />
//                 )}
//               </Button>
//             </div>

//             {copied && (
//               <Alert className="mb-4">
//                 <AlertTitle>Success</AlertTitle>
//                 <AlertDescription>Code copied to clipboard!</AlertDescription>
//               </Alert>
//             )}

//             {/* <div className="flex justify-between text-gray-400">
//               <span className="flex items-center">
//                 <ArrowUp className="w-4 h-4 mr-1" /> {snippet.upvotes}
//               </span>
//               <span className="flex items-center">
//                 <MessageSquare className="w-4 h-4 mr-1" /> {snippet.comments}
//               </span>
//               <span className="flex items-center">
//                 <Heart className="w-4 h-4 mr-1" /> {snippet.likes}
//               </span>
//             </div> */}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import moment from "moment";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { Copy, Check } from "lucide-react";

// export default function SingleSnippetPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [isEditing, setIsEditing] = useState(false);
//   const [snippet, setSnippet] = useState(null);
//   const [copied, setCopied] = useState(false);

//   console.log("snippet?code", snippet);

//   const isAuthor = session?.user?.id === snippet?.userId;
//   console.log("isAuthor", isAuthor);
//   const handleEdit = () => setIsEditing(true);

//   const handleSave = async () => {
//     // Implement API call to update snippet
//     setIsEditing(false);
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this snippet?")) {
//       // Implement API call to delete snippet
//       router.push("/snippets");
//     }
//   };

//   const handleChange = (e) => {
//     setSnippet({ ...snippet, [e.target.name]: e.target.value });
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(snippet.code).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   useEffect(() => {
//     if (id) {
//       const fetchData = async () => {
//         const response = await fetch(`/api/snippets/${id}`);
//         const data = await response.json();
//         setSnippet(data);
//       };

//       fetchData();
//       // console.log("fetcheddata res", snippet);
//     }
//   }, [id]);

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-4">
//       <div className="max-w-3xl mx-auto">
//         <Button onClick={() => router.push("/")} className="mb-4">
//           &larr; Back to Snippets
//         </Button>

//         {isEditing ? (
//           <div className="space-y-4">
//             <input
//               className="w-full bg-gray-800 p-2 rounded"
//               name="title"
//               value={snippet?.title}
//               onChange={handleChange}
//             />
//             <Textarea
//               className="w-full bg-gray-800 p-2 rounded"
//               name="code"
//               value={snippet?.code}
//               onChange={handleChange}
//               rows={10}
//             />
//             <div className="flex justify-end space-x-2">
//               <Button onClick={() => setIsEditing(false)}>Cancel</Button>
//               <Button onClick={handleSave}>Save</Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-3xl font-bold">{snippet?.title}</h1>
//               {isAuthor && (
//                 <div className="space-x-2">
//                   <Button onClick={handleEdit}>Edit</Button>
//                   <Button variant="destructive" onClick={handleDelete}>
//                     Delete
//                   </Button>
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center mb-4">
//               <img
//                 src={snippet?.avatar}
//                 alt={snippet?.userName}
//                 className="w-10 h-10 rounded-full mr-3"
//               />
//               <div>
//                 <p className="font-normal">{snippet?.language}</p>
//                 <p className="text-gray-400 text-sm">
//                   {moment(snippet?.createdAt).fromNow()}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-gray-800 p-4 rounded-lg mb-4 relative">
//               <textarea
//                 id="code"
//                 value={snippet?.code || ""}
//                 rows={10}
//                 className="mt-1 bg-gray-900 text-white p-2 block w-full rounded-md"
//                 readOnly={!isAuthor}
//               />
//               <SyntaxHighlighter
//                 language={snippet?.language}
//                 style={docco}
//                 showLineNumbers={true}
//                 wrapLines={true}
//               >
//                 {snippet?.code}
//               </SyntaxHighlighter>

//               <Button
//                 className="absolute top-2 right-2"
//                 onClick={copyToClipboard}
//               >
//                 {copied ? (
//                   <Check className="w-4 h-4" />
//                 ) : (
//                   <Copy className="w-4 h-4" />
//                 )}
//               </Button>
//             </div>

//             {copied && (
//               <Alert className="mb-4">
//                 <AlertTitle>Success</AlertTitle>
//                 <AlertDescription>Code copied to clipboard!</AlertDescription>
//               </Alert>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import moment from "moment";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react";

export default function SingleSnippetPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [snippet, setSnippet] = useState(null);
  const [copied, setCopied] = useState(false);

  // If session data is still being fetched, handle the loading state
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  console.log("snippet", snippet);
  // Calculate isAuthor based on the session and snippet
  const isAuthor = session && session?.user?.id === snippet?.userId;

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    // Implement API call to update snippet
    console.log("snippet from handleSave", snippet);
    try {
      const response = await fetch(`/api/snippets/${snippet._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippet),
      });
      // if (response.ok) {
      //   setSnippet(
      //     snippets.map((snippet) =>
      //       snippet._id === updatedSnippet._id ? updatedSnippet : snippet
      //     )
      //   );
      // }
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      // Implement API call to delete snippet
      router.push("/snippets");
    }
  };

  const handleChange = (e) => {
    setSnippet({ ...snippet, [e.target.name]: e.target.value });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetch(`/api/snippets/${id}`);
        const data = await response.json();
        setSnippet(data);
      };

      fetchData();
    }
  }, [id]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <Button onClick={() => router.push("/")} className="mb-4">
          &larr; Back to Snippets
        </Button>

        {isEditing ? (
          <div className="space-y-4">
            <input
              className="w-full bg-gray-800 p-2 rounded"
              name="title"
              value={snippet?.title}
              onChange={handleChange}
            />
            <Textarea
              className="w-full bg-gray-800 p-2 rounded"
              name="code"
              value={snippet?.code}
              onChange={handleChange}
              rows={10}
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{snippet?.title}</h1>
              {isAuthor && (
                <div className="space-x-2">
                  <Button onClick={handleEdit}>Edit</Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center mb-4">
              <img
                src={snippet?.avatar}
                alt={snippet?.userName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-normal">{snippet?.language}</p>
                <p className="text-gray-400 text-sm">
                  {moment(snippet?.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mb-4 relative">
              <textarea
                id="code"
                value={snippet?.code || ""}
                rows={10}
                className="mt-1 bg-gray-900 text-white p-2 block w-full rounded-md"
                // readOnly={!isAuthor}
              />
              <SyntaxHighlighter
                language={snippet?.language}
                style={docco}
                showLineNumbers={true}
                wrapLines={true}
              >
                {snippet?.code}
              </SyntaxHighlighter>

              <Button
                className="absolute top-2 right-2"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            {copied && (
              <Alert className="mb-4">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Code copied to clipboard!</AlertDescription>
              </Alert>
            )}
          </>
        )}
      </div>
    </div>
  );
}
