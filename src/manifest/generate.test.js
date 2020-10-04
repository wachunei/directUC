const path = require("path");
const fs = require("fs");
const generate = require("./generate");

const manifestPath = path.join(__dirname, "..", "manifest.json");

describe("generate manifest", () => {
  beforeEach(async () => {
    try {
      await fs.promises.unlink(manifestPath);
    } catch (error) {
      // manifest does not exists
    }
  });

  test("should throw without target", async () => {
    process.env.TARGET = undefined;
    await expect(async () => {
      await generate();
    }).rejects.toThrow();
    await expect(fs.promises.access(manifestPath)).rejects.toThrow();
  });

  test("should generate for target chrome", async () => {
    process.env.TARGET = "chrome";
    const spy = jest.spyOn(fs.promises, "writeFile");

    await generate();
    expect(spy).toHaveBeenCalled();
    await expect(fs.promises.access(manifestPath)).resolves.toBeUndefined();
  });

  test("should generate for target firefox", async () => {
    process.env.TARGET = "firefox";
    const spy = jest.spyOn(fs.promises, "writeFile");

    await generate();
    expect(spy).toHaveBeenCalled();
    await expect(fs.promises.access(manifestPath)).resolves.toBeUndefined();
  });
});
