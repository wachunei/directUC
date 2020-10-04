const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { version } = require("../../package.json");

const isMain = require.main === module;

// eslint-disable-next-line no-console
const log = isMain ? console.log : () => {};
const tag = chalk.dim.bold("📜 manifest/generate ");
const readJSON = async (...filePath) =>
  JSON.parse(
    await fs.promises.readFile(path.join(__dirname, ...filePath), "utf8")
  );

async function generate() {
  const target = process.env.TARGET;
  log(tag, `📄 Generating manifest for target ${chalk.bold(target)}`);

  const base = await readJSON("base.json");
  const targetManifest = await readJSON(`${target}.json`);

  const data = JSON.stringify({ version, ...base, ...targetManifest }, null, 2);

  await fs.promises.writeFile(
    path.join(__dirname, "..", "manifest.json"),
    data
  );

  log(
    tag,
    chalk.green(`✨ Manifest generated for target ${chalk.bold(target)}`)
  );
}

if (isMain) {
  const target = process.env.TARGET;
  generate().catch((error) => {
    // eslint-disable-next-line no-console
    console.error(
      tag,
      chalk.red(
        `❌ Error generating manifest for target ${chalk.bold(
          target
        )}:\n${error}`
      )
    );
    process.exit(1);
  });
}

module.exports = generate;
