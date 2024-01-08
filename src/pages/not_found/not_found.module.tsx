import { hydrateRoot } from "react-dom/client";
import Loading from "../../components/loading";
import App from "./not_found";

function Layout(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles/tailwind.css" />
        <title>{"404 - Page Not Found"}</title>
        <script src="/scripts/htmx.min.js" />
      </head>
      <body className="select-none">
        <Loading />
        <App />
      </body>
    </html>
  );
}

export default Layout;

hydrateRoot(document, <App />);
