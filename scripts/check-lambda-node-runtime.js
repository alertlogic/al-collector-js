"use strict";

const fs = require("fs");
const https = require("https");

const RUNTIME_DOCS_URL = "https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html";

function writeGitHubOutput(key, value) {
  if (!process.env.GITHUB_OUTPUT) {
    return;
  }

  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}

function requestWithRedirects(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; al-collector-js-runtime-sync/1.0)",
        Accept: "text/html,application/xhtml+xml"
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (maxRedirects <= 0) {
          reject(new Error("Too many redirects while fetching Lambda runtime docs"));
          return;
        }
        const redirectedUrl = new URL(res.headers.location, url).toString();
        resolve(requestWithRedirects(redirectedUrl, maxRedirects - 1));
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Unexpected HTTP status ${res.statusCode}`));
        return;
      }

      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => resolve(body));
    });

    req.on("timeout", () => {
      req.destroy(new Error("Request timed out"));
    });
    req.on("error", reject);
  });
}

async function fetchHtmlWithRetry(url, attempts = 3) {
  let lastError;
  for (let i = 1; i <= attempts; i += 1) {
    try {
      return await requestWithRedirects(url);
    } catch (error) {
      lastError = error;
      if (i === attempts) {
        break;
      }
    }
  }
  throw lastError;
}

function parseHighestNodeRuntimeMajor(html) {
  const regex = /\bnodejs(\d+)\.x\b/gi;
  const majors = new Set();
  let match = regex.exec(html);

  while (match !== null) {
    const major = Number(match[1]);
    if (Number.isInteger(major) && major >= 10) {
      // Check context around the runtime to see if it's marked as "Not scheduled"
      const matchIndex = match.index;
      const contextStart = Math.max(0, matchIndex - 200);
      const contextEnd = Math.min(html.length, matchIndex + 200);
      const context = html.substring(contextStart, contextEnd);

      // Skip if "Not scheduled" appears in the context
      if (!context.toLowerCase().includes("not scheduled")) {
        majors.add(major);
      }
    }
    match = regex.exec(html);
  }

  if (majors.size === 0) {
    throw new Error("No Lambda Node.js runtimes were parsed from AWS docs");
  }

  return Math.max(...majors);
}



async function main() {
  try {
    const html = await fetchHtmlWithRetry(RUNTIME_DOCS_URL);
    const targetMajor = parseHighestNodeRuntimeMajor(html);
    const targetRuntime = `nodejs${targetMajor}.x`;

    console.log(JSON.stringify({
      targetMajor,
      targetRuntime
    }, null, 2));

    writeGitHubOutput("target_major", String(targetMajor));
    writeGitHubOutput("target_runtime", targetRuntime);
  } catch (error) {
    console.error(`::error::${error.message}`);
    process.exit(1);
  }
}

main();
