import { hydrateRoot } from "react-dom/client";
import Layout from "./layout";
import Loading from "../../components/loading";
import App from "./page";

hydrateRoot(
  document,
  <Layout>
    <Loading />
    <App />
  </Layout>
);
