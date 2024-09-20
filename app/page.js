// // File: app/page.js
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1 className="text-4xl font-bold">Welcome to Code Snippet Sharing</h1>
//       <Link href="/snippets" className="text-blue-500 hover:underline">
//         View Snippets
//       </Link>
//       <Link href="/create" className="text-green-500 hover:underline">
//         Create New Snippet
//       </Link>
//     </main>
//   );
// }

// app/page.js
import Link from "next/link";
import { ArrowUp, MessageSquare, Heart, Edit, Trash } from "lucide-react";
import moment from "moment";
import { getCurrentUser } from "@/lib/auth";
import SharedSnippetList from "@/app/components/SharedSnippetList";

async function getSnippets() {
  const res = await fetch("http://localhost:3000/api/sharedsnippets", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch snippets");
  }
  return res.json();
}

export default async function HomePage() {
  const snippets = await getSnippets();
  const currentUser = await getCurrentUser();
  console.log("shared snippets", snippets);
  // const isAuthor =
  //   session?.user?.id ===
  //   snippets.some((snippet) => snippet.userId.toString() === session?.user?.id);
  // console.log(isAuthor);
  return (
    <div className="container mx-auto p-4">
      <SharedSnippetList snippets={snippets} currentUser={currentUser} />
    </div>
  );
}
// <div className="bg-gray-900 text-white min-h-screen p-4">
//   <div className="max-w-4xl mx-auto">
//     <h1 className="text-3xl font-bold mb-6">Code Snippets</h1>
//     <div className="space-y-6">
//       {snippets.map((snippet) => {
//         // console.log("snippet", snippet);
//         const isOwner = snippet.userId === session?.user?.id;
//         console.log("isOwner", isOwner);
//         return (
//           <div key={snippet._id} className="bg-gray-800 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <Link
//                 href={`/snippets/${snippet.id}`}
//                 className="text-xl font-semibold hover:text-blue-400"
//               >
//                 {snippet.title}
//               </Link>
//               {isOwner && (
//                 <div className="space-x-2">
//                   <Button>
//                     <Edit className="w-4 h-4 mr-2" />{" "}
//                     <Link
//                       href={`/snippets/${snippet.id}`}
//                       className="text-xl font-semibold hover:text-blue-400"
//                     >
//                       Edit
//                     </Link>
//                   </Button>
//                   <Button variant="destructive">
//                     <Trash className="w-4 h-4 mr-2" />{" "}
//                     <Link
//                       href={`/snippets/${snippet.id}`}
//                       className="text-xl font-semibold hover:text-blue-400"
//                     >
//                       Delete
//                     </Link>
//                   </Button>
//                 </div>
//               )}
//             </div>
//             <p className="text-gray-400 text-sm mt-1">
//               Posted by {snippet.userName} •{" "}
//               {moment(snippet?.createdAt).fromNow()}
//             </p>
//             <p className="mt-2 line-clamp-2">{snippet.code}</p>
//             {/* <div className="flex justify-between text-gray-400 mt-4">
//             <span className="flex items-center">
//               <ArrowUp className="w-4 h-4 mr-1" /> {snippet.upvotes}
//             </span>
//             <span className="flex items-center">
//               <MessageSquare className="w-4 h-4 mr-1" /> {snippet.comments}
//             </span>
//             <span className="flex items-center">
//               <Heart className="w-4 h-4 mr-1" /> {snippet.likes}
//             </span>
//           </div> */}
//           </div>
//         );
//       })}
//     </div>
//   </div>
// </div>
