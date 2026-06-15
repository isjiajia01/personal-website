import Home from "./[lang]/page";
import PrinterShell from "../components/printer-shell";
import { defaultLanguage, getDictionary } from "../dictionaries";

export default async function RootPage() {
  const dictionary = await getDictionary(defaultLanguage);
  const initialColorMode = "system";
  const printerShellProps = {
    labels: {
      home: dictionary.labels.home,
      works: dictionary.labels.works,
      resume: dictionary.labels.resume,
      about: dictionary.labels.about,
      brandName: dictionary.labels.brandName,
      brandTagline: dictionary.labels.brandTagline,
    },
    urls: {
      home: dictionary.urls.home,
      works: dictionary.urls.works,
      resume: dictionary.urls.resume,
      about: dictionary.urls.about,
    },
  };

  return (
    <PrinterShell dictionary={printerShellProps} lang={defaultLanguage} initialColorMode={initialColorMode}>
      <Home params={Promise.resolve({ lang: defaultLanguage })} />
    </PrinterShell>
  );
}
