import React, { useState } from "react";
import { Languages } from "../src/utils/consts.ts";

const PageGenrator = () => {
  const [langBlock, setLangBlocks] = useState<any[]>([]);

  const [genratedHtml, setGenratedHtml] = useState<string>("");

  const [userText, setUserText] = useState<string>("");

  const onLangBtnClick = (lang: string) => {
    const block = {
      lang,
      text: userText.replace(/(?:\r\n|\r|\n)/g, "<br/>") + "<br/>",
    };

    const newLangBlocks = [...langBlock, block];
    setLangBlocks(newLangBlocks);
    setUserText("");
  };

  const genHtml = () => {
    let html = "";

    for (let block of langBlock) {
      if (block.lang === "sanskrit") {
        html += `<div class="sanskrit-shlok">${block.text}</div>`;
        continue;
      } else if (block.lang === "bold") {
        html += `<div><b>${block.text}</b></div>`;
        continue;
      } else if (block.lang === "normal") {
        html += `<div>${block.text}</div>`;
        continue;
      } else {
        html += `<div class="${block.lang}-translation translation">${block.text}</div>`;
      }
    }

    setGenratedHtml(html);
  };

  return (
    <div>
      <textarea
        value={userText}
        // defaultValue={""}
        onChange={(e) => setUserText(e.target.value)}
        className="border rounded-lg border-black px-4 py-2"
        rows={5}
        cols={50}
      ></textarea>
      <div className="">
        <button
          className="border bg-blue-500 text-white px-3 rounded-xl py-1 mr-2 mt-1"
          onClick={() => onLangBtnClick("normal")}
        >
          Normal
        </button>
        <button
          className="border bg-blue-500 text-white px-3 rounded-xl py-1 mr-2 mt-1"
          onClick={() => onLangBtnClick("bold")}
        >
          bold
        </button>

        <button
          className="border bg-blue-500 text-white px-3 rounded-xl py-1 mr-2 mt-1"
          onClick={() => onLangBtnClick("sanskrit")}
        >
          Sanskrit
        </button>
        {Languages.map((lang) => (
          <button
            key={lang.label}
            className="border capitalize bg-blue-500 text-white px-3 rounded-xl py-1 mr-2 mt-1"
            onClick={() => onLangBtnClick(lang.label)}
          >
            {lang.label}
          </button>
        ))}

        <button
          onClick={genHtml}
          className="border bg-green-500 text-white px-3 rounded-xl py-1 mr-2 mt-1"
        >
          Genrate HTML
        </button>
        <button
          onClick={() => {
            setLangBlocks([]);
            setGenratedHtml("");
            if (window.confirm("Clear Text Input Also?")) {
              setUserText("");
            }
          }}
          className="border bg-orange-500 text-white px-3 rounded-xl py-1 mr-2 mt-1"
        >
          Clear All
        </button>
      </div>

      <div>
        {langBlock.map((block, index) => (
          <div className="border py-2 px-2 mt-3">
            <span className="text-sm text-pink-500 font-bold capitalize">
              {block.lang}
            </span>
            <button
              onClick={() => {
                const newLangBlocks = langBlock.filter((b, i) => i !== index);
                setLangBlocks(newLangBlocks);
              }}
              className="text-sm bg-red-500 text-white py-1 px-2 rounded font-bold ml-2"
            >
              DEL
            </button>
            <br />
            {block.text}
          </div>
        ))}
      </div>

      {genratedHtml && (
        <div className="border py-2 px-2 mt-8">
          <button
            onClick={() => {
              navigator.clipboard.writeText(genratedHtml);
              alert("HTML Copied");
            }}
            className="text-sm bg-purple-500 text-white py-1 px-2 rounded font-bold ml-2"
          >
            Copy HTML to clipboard
          </button>
          <br />
          {genratedHtml}
        </div>
      )}
    </div>
  );
};

export default PageGenrator;
