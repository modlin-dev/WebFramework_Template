import { hydrateRoot } from "react-dom/client";
import App from "./root";
import Loading from "../../components/loading";

function Layout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles/tailwind.css" />
        <title>{"Elysia + Bun + React"}</title>
        <script src="/scripts/htmx.min.js" />
      </head>
      <body className="select-none flex justify-center items-center">
        <Loading />
        <App />
        <script type="module" src="/scripts/root.js" />
      </body>
    </html>
  );
}

hydrateRoot(document, <Layout />);

export default Layout;
