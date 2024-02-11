import { SITE_TITLE, SITE_TITLE_DEVANAGRI } from "./consts.ts"


export function parseMarkdown(markdownText: string): string {
  const textAttr = "";

  const htmlText = markdownText
    .replace(/^###### (.*$)/gim, `<p ${textAttr}>$1</p>`)
    .replace(/^##### (.*$)/gim, `<p ${textAttr}>$1</p>`)
    .replace(/^#### (.*$)/gim, `<p ${textAttr}>$1</p>`)
    .replace(/^### (.*$)/gim, `<h6 ${textAttr}>$1</h6>`)
    .replace(/^## (.*$)/gim, `<h5 ${textAttr}>$1</h5>`)
    .replace(/^# (.*$)/gim, `<h3 ${textAttr}>$1</h3>`)
    .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
    .replace(/\*(.*)\*/gim, "<i>$1</i>")
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a style='' href='$2'>$1</a>")
    .replace(/\n$/gim, "")
    .replace(/<br \/>$/gim, "")
    .replace(/<br\/>$/gim, "");

  return htmlText.trim();
}
