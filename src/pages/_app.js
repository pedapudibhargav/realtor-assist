import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../app/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
