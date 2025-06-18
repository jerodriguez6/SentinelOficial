import React from "react";
import "../styles/global.css";
import Layout from "@components/Layout/Layout";
import "semantic-ui-css/semantic.min.css";
import { AppWrapper } from "../context/state";

import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
// import Home from "pages"; // You usually don't import specific pages here
import { ProviderAuth } from "@hooks/useAuth";
import { Provider } from "../components/ui/provider";

// --- START next-i18next specific imports ---
import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from '../next-i18next.config'; // Make sure this path is correct
// --- END next-i18next specific imports ---

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SENTINEL IA</title>
      </Head>
      <ProviderAuth>
        <AppWrapper>
          <Provider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </AppWrapper>
      </ProviderAuth>
    </>
  );
}

// --- START next-i18next specific export ---
export default appWithTranslation(MyApp, nextI18nConfig);
// --- END next-i18next specific export ---