import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// import "react-datepicker/dist/react-datepicker.css";
// import "../assets/style/globals.css";
// import React, { useEffect } from "react";
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import createSageMiddleware from "redux-saga";
// import reducers from "../components/redux/reducers";
// import mySaga from "../components/redux/sagas";
// import { composeWithDevTools } from "redux-devtools-extension";
// import Layout from "../components/layout/layout.jsx";
// const sagaMiddleware = createSageMiddleware();
// const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(sagaMiddleware))
// );
// sagaMiddleware.run(mySaga);
// function MyApp({ Component, pageProps }) {
//   useEffect(() => {
//     const use = async () => {
//       (await import("tw-elements")).default;
//     };
//     use();
//   }, []);

//   return (
//     <Layout>
//       <Provider store={store}>
//         <Component {...pageProps} />
//       </Provider>
//     </Layout>
//   );
// }

// export default MyApp;
