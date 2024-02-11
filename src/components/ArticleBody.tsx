import React, { useState, useEffect } from "react";
import { Languages, Tags } from "../utils/consts.ts";
import "../styles/ArticleBody.css";

export default function ArticleBody({
  children,
  data,
  availableLanguages,
}: {
  children: JSX.Element;
  data: any;
  availableLanguages: string[];
}) {
  const [selectedLang, setSelectedLang] = useState("hindi");

  useEffect(() => {
    document
      .querySelectorAll<HTMLElement>(`.${selectedLang}-translation`)
      .forEach((element) => {
        element.style.display = "block";
      });

    const languageLables: string[] = Languages.map((item) => item.label).filter(
      (item) => item != selectedLang
    );

    languageLables.forEach((lang) => {
      document
        .querySelectorAll<HTMLElement>(`.${lang}-translation`)
        .forEach((element) => {
          element.style.display = "none";
        });
    });
  }, [selectedLang]);

  React.useEffect(() => {
    if (availableLanguages.length > 0) {
      setSelectedLang(availableLanguages[0]);
    }
  }, [availableLanguages]);

  return (
    <div className="w-full mx-auto">
      <div className="bg-purple-50 px-4 py-6 w-full mx-auto border shadow-lg text-left rounded-lg">
        <div className="mx-auto w-full flex justify-center items-center">
          {data.tags.map((tag: any, index: any) => (
            <a
              key={index}
              href={Tags.includes(tag) ? `/tags/${tag}` : undefined}
              className={`w-fit bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1 mt-2 ${
                Tags.includes(tag) && "hover:underline"
              }`}
            >
              #{tag}
            </a>
          ))}
        </div>

        <div className="text-center pt-4 pb-3">
          <h1 className="font-bold text-2xl">{data.titleDevanagri}</h1>
          <h2 className="font-semibold text-md mt-1">{data.titleEnglish}</h2>
        </div>

        {availableLanguages.length > 0 ? (
          <div className="border w-fit px-20 border-purple-400 rounded-lg pb-6 pt-1 my-2 mx-auto text-center">
            <h3 className="font-semibold w-full">Select Language</h3>
            <div className="flex gap-6 pt-0 flex-row flex-wrap justify-center">
              {Languages.filter((item) =>
                availableLanguages.includes(item.label)
              ).map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLang(item.label)}
                  title={`Show ${item.label} Translation`}
                  className={`font-default text-sm relative border border-gray-300 text-gray-700 rounded-full font-bold h-10 w-10 ${
                    item.label == selectedLang
                      ? "text-purple-700 border-purple-500 drop-shadow bg-purple-100"
                      : ""
                  }`}
                >
                  {item.symbol}{" "}
                  <span className="capitalize absolute text-[10px] -bottom-5 w-full text-center left-0 block">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-1/2 mx-auto">
            <hr className="border-t border-slate-800/40 mx-3 mb-8" />
          </div>
        )}

        <div className="px-4 sm:px-8 md:px-16 lg:px-18 mt-8 antialised">
          {children}

          <br />

          <div
            style={{
              lineHeight: "1.6rem",
            }}
            className="pb-4 antialiased"
          >
            {data.sourceName && (
              <>
                <span className="font-semibold antialiased">From:</span>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: data.sourceName,
                  }}
                ></span>
                <br />
              </>
            )}

            {data.sourceDescription && (
              <>
                <span
                  className="text-sm leading-tight antialiased"
                  dangerouslySetInnerHTML={{
                    __html: data.sourceDescription,
                  }}
                ></span>
                <br />
              </>
            )}

            {data.sourceLink && (
              <div className="mt-3 antialiased">
                <span className="font-semibold">Source Link:</span>
                <a
                  href={data.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-900 hover:underline"
                >
                  {" "}
                  {data.sourceLink.substring(0, 50)}...
                </a>
              </div>
            )}

            {data.extraInfo && (
              <div className="mt-4 mb-2">
                <h2 className="font-semibold mt-3">Information:</h2>
                <p
                  className="mt-1 antialiased"
                  dangerouslySetInnerHTML={{
                    __html: data.extraInfo,
                  }}
                ></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
