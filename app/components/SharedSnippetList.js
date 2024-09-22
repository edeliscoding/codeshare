"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowUp, MessageSquare, Heart, Edit, Trash } from "lucide-react";
import moment from "moment";
const SharedSnippetList = ({ snippets, currentUser }) => {
  // console.log("currentUser", currentUser);
  return (
    <div className="text-white">
      {snippets.map((snippet) => {
        // Check if the current user is the author of this snippet
        // console.log("snippet", snippet);
        const isAuthor = snippet.userId === currentUser?.id;
        const avatar = "https://avatar.iran.liara.run/public/45";
        return (
          <div
            key={snippet._id}
            className="bg-gray-800 p-4 rounded-lg mb-3 text-white"
          >
            <div className="flex items-center">
              <div className="flex flex-col gap-2">
                <img
                  src={avatar}
                  // alt={snippet.userName}
                  className="w-10 h-10 rounded-full mr-4"
                />
                {/* <span>{currentUser?.username}</span> */}
              </div>
              <div>
                <p className="font-normal">{snippet.language}</p>
                <p className="text-gray-400 text-sm">
                  {moment(snippet.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <div className="mt-2 ml-12">
              <h2 className="text-1xl font-bold hover:underline">
                <Link href={`/snippets/${snippet._id}`}>{snippet.title}</Link>
              </h2>
              <p className="">{snippet.code}</p>
            </div>
            {/* Conditionally render Edit/Delete buttons if the current user is the author */}
            {isAuthor && (
              <div className="mt-2 flex gap-2 ml-12">
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  <Link
                    href={`/snippets/${snippet._id}`}
                    className="text-l font-semibold hover:text-blue-400"
                  >
                    Edit
                  </Link>
                </Button>
                {/* <Button variant="destructive">
                  <Trash className="w-4 h-4 mr-2" />{" "}
                  <Link
                    href={`/snippets/${snippet._id}`}
                    className="text-l font-semibold hover:text-blue-400"
                  >
                    Delete
                  </Link>
                </Button> */}
              </div>
            )}
          </div>
          //   <div className="bg-gray-900 text-white min-h-screen p-4">
          //     <div className="max-w-4xl mx-auto">
          //       <h1 className="text-3xl font-bold mb-6">Code Snippets</h1>
          //       <div className="space-y-6">
          //         <div key={snippet._id} className="bg-gray-800 p-4 rounded-lg">
          //           <div className="flex justify-between items-center">
          //             <Link
          //               href={`/snippets/${snippet._id}`}
          //               className="text-xl font-semibold hover:text-blue-400"
          //             >
          //               {snippet.title}
          //             </Link>
          //             {isAuthor && (
          //               <div className="space-x-2">
          //                 <Button>
          //                   <Edit className="w-4 h-4 mr-2" />{" "}
          //                   <Link
          //                     href={`/snippets/${snippet._id}`}
          //                     className="text-xl font-semibold hover:text-blue-400"
          //                   >
          //                     Edit
          //                   </Link>
          //                 </Button>
          //                 <Button variant="destructive">
          //                   <Trash className="w-4 h-4 mr-2" />{" "}
          //                   <Link
          //                     href={`/snippets/${snippet._id}`}
          //                     className="text-xl font-semibold hover:text-blue-400"
          //                   >
          //                     Delete
          //                   </Link>
          //                 </Button>
          //               </div>
          //             )}
          //           </div>
          //           <p className="text-gray-400 text-sm mt-1">
          //             Posted by • {moment(snippet?.createdAt).fromNow()}
          //           </p>
          //           <p className="mt-2 line-clamp-2">{snippet.code}</p>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
        );
      })}
    </div>
  );
};

export default SharedSnippetList;
