import { hydrate } from "solid-js/web";
import Layout from "./layout";
import Loading from "../../components/loading";
import App from "./page";

hydrate(
  () => (
    <Layout>
      <Loading />
      <App />
    </Layout>
  ),
  document
);
