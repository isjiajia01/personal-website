import Home from "../[lang]/page";
import { defaultLanguage } from "../../dictionaries";

export default function RootPage() {
  return <Home params={Promise.resolve({ lang: defaultLanguage })} />;
}
