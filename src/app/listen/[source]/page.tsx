export { metadata } from "../page";
export { default } from "../../page";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["ig", "tt", "yt", "x"].map(source => ({ source }));
}
