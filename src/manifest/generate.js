/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

async function generate() {
  console.log(`--- 📄 Generating manifest for target: ${process.env.TARGET}`);
  const base = JSON.parse(
    await fs.promises.readFile(path.join(__dirname, "base.json"), "utf8")
  );

  const chrome = JSON.parse(
    await fs.promises.readFile(path.join(__dirname, "chrome.json"), "utf8")
  );
  const firefox = JSON.parse(
    await fs.promises.readFile(path.join(__dirname, "firefox.json"), "utf8")
  );

  const data = JSON.stringify(
    {
      ...base,
      ...(process.env.TARGET === "chrome" ? chrome : firefox),
    },
    null,
    2
  );

  await fs.promises.writeFile(
    path.join(__dirname, "..", "manifest.json"),
    data
  );
  console.log(`--- ✨ Manifest generated for target: ${process.env.TARGET}`);
}

generate().catch((error) => {
  console.error(`--- ❌ Error generating manifest: ${error}`);
});
