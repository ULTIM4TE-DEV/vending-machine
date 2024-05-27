import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {store} from '@/store'
import {Provider} from "react-redux";
import { Toaster } from '@/components/ui/sonner';
export default function App({ Component, pageProps }: AppProps) {
  return( <Provider store={store}>
    <Toaster richColors />
    <Component {...pageProps} />
  </Provider>);
}
