import { statSync } from "fs";
import { join } from "path";
import { g } from "../utils/global";
import { dir } from "utils/dir";

const index = {
  html: "",
  css: {
    src: null as any,
    encoding: "",
  },
  isFile: {} as Record<string, boolean>,
  ts: "",
};

export const serveWeb = async (url: URL, req: Request) => {
  let site_id = "2512068e-fd68-44f5-9700-5153ccecf6a5";

  const base = dir(`app/static/site`);
  // const base = `/Users/r/Developer/prasi/.output/app/srv/site`;

  let path = join(base, url.pathname);

  if (url.pathname === "/site_id") {
    return new Response(site_id);
  }

  if (url.pathname.startsWith("/index.css")) {
    if (!index.css.src) {
      const res = await fetch("https://prasi.avolut.com/index.css");
      index.css.src = await res.arrayBuffer();
    }

    return new Response(index.css.src, {
      headers: {
        "content-type": "text/css",
        "content-encoding": index.css.encoding,
      },
    });
  }

  try {
    if (typeof index.isFile[path] === "undefined") {
      const s = statSync(path);
      if (s.isFile()) {
        index.isFile[path] = true;
        return new Response(Bun.file(path));
      }
    } else if (index.isFile[path]) {
      return new Response(Bun.file(path));
    }
  } catch (e) {}

  if (!index.html) {
    index.html = generateIndexHtml("", site_id);
  }

  return [site_id, index.html];
};

export const generateIndexHtml = (base_url: string, site_id: string) => {
  const base = base_url.endsWith("/")
    ? base_url.substring(0, base_url.length - 1)
    : base_url;

  if (!index.ts) index.ts = Date.now().toString();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <link rel="stylesheet" href="${base}/index.css?${index.ts}">
</head>
<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  <div style="position:absolute;opacity:0.1;top:0;left:0">&nbsp;</div>
  <div id="root"></div>
  <script src="${base}/site.js?${index.ts}" type="module"></script>
  <script>window.id_site = "${site_id}";</script>
</body>
</html>`;
};
