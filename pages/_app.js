import { PlayProvider } from "@/contexts/Play";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <PlayProvider>
        <Component {...pageProps} />
      </PlayProvider>
    </>
  );
}
