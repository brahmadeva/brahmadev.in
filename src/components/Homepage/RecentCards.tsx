import React from "react";
import { parseMarkdown } from "../../utils/helpers";

export default function RecentCards(props: any) {
  return (
    <div className="container mx-auto px-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 w-full">
      {props?.pages.map((post: any, index: number) => (
        <a
          key={index}
          href={`/page/${post.slug}/`}
          style={{
            position: "relative",
            borderWidth: "3px",
          }}
          className=" col-span-1 flex flex-col border-3
          
       border-purple-50 bg-purple-50  p-4 rounded-lg shadow-md
       hover:border-purple-600"
        >
          <div className="pt-1.5 pb-3 pl-1.5 pr-4">
            <h2 className="text-lg font-bold text-gray-900 leading-snug">
              {post.data.titleDevanagri}
            </h2>
            <h3 className="text-sm mt-0.5  text-gray-600 leading-5">
              {post.data.titleEnglish.slice(0, 75)}
            </h3>

            {/* <p
                className="text-sm text-gray-700 leading-tight mb-3 p-2 pl-0 overflow-hidden"
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(
                    post.body.replace(/(<([^>]+)>)/gi, "").slice(0, 256)
                  ),
                }}
              ></p> */}

            <p
              className="text-sm text-gray-800 leading-tight mb-3 p-2 pl-0 overflow-hidden"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {post.data.description}
            </p>
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
            }}
            className="px-5 py-2 border-t-2 border-gray-200 w-full text-sm font-bold hover:text-gray-500 text-gray-800"
          >
            Read More
          </div>
        </a>
      ))}
    </div>
  );
}
