import "../styles/globals.scss";
import { PersistGate } from "redux-persist/integration/react";
import NProgress from "nprogress";
import Router from "next/router";
import { useStore } from "react-redux";
import { store } from "../redux/store";
import ReactTooltip from "react-tooltip";
import icons from "../public/fixture";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", (url) => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

if (process.browser) {
  var hours = 6;
  var now = Date.now();
  var setupTime = localStorage.getItem("version");
  if (setupTime == null) {
    localStorage.clear();
    localStorage.setItem("version", now);
  } else if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem("version", now);
  }
}

function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <PersistGate persistor={store.__persistor}>
      {() => <Component {...pageProps} />}
    </PersistGate>
  );
}

export default store.withRedux(MyApp);
