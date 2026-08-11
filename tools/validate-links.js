const { existsSync, readFileSync, readdirSync, statSync } = require("node:fs");
const { dirname, extname, join, normalize, relative, resolve } = require("node:path");

const ROOT_DIRECTORY = resolve(__dirname, "..");
const SKIPPED_DIRECTORIES = new Set([".git", "BlogPessoal", "node_modules"]);
const HTML_ATTRIBUTE_PATTERN = /\b(?:href|src)=["']([^"']+)["']/g;
const ID_PATTERN = /\bid=["']([^"']+)["']/g;
const errors = [];

function collectHtmlFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    if (SKIPPED_DIRECTORIES.has(entry)) return [];

    const absolutePath = join(directory, entry);

    if (statSync(absolutePath).isDirectory()) return collectHtmlFiles(absolutePath);
    return extname(entry) === ".html" ? [absolutePath] : [];
  });
}

function resolveLocalTarget(sourceFile, rawReference) {
  const reference = rawReference.split("?")[0];
  const [pathname, fragment = ""] = reference.split("#");

  if (!pathname) return { filePath: sourceFile, fragment };

  let filePath = pathname.startsWith("/")
    ? join(ROOT_DIRECTORY, pathname)
    : resolve(dirname(sourceFile), pathname);

  if (!extname(filePath)) filePath = join(filePath, "index.html");

  return { filePath: normalize(filePath), fragment };
}

function validateReference(sourceFile, reference) {
  if (/^(?:https?:|mailto:|tel:|data:)/.test(reference)) return;

  const target = resolveLocalTarget(sourceFile, reference);

  if (!target.filePath.startsWith(ROOT_DIRECTORY) || !existsSync(target.filePath)) {
    errors.push(`${relative(ROOT_DIRECTORY, sourceFile)} -> ${reference}`);
    return;
  }

  if (!target.fragment || extname(target.filePath) !== ".html") return;

  const targetHtml = readFileSync(target.filePath, "utf8");
  const ids = new Set([...targetHtml.matchAll(ID_PATTERN)].map((match) => match[1]));

  if (!ids.has(decodeURIComponent(target.fragment))) {
    errors.push(`${relative(ROOT_DIRECTORY, sourceFile)} -> #${target.fragment} não existe`);
  }
}

collectHtmlFiles(ROOT_DIRECTORY).forEach((htmlFile) => {
  const html = readFileSync(htmlFile, "utf8");

  [...html.matchAll(HTML_ATTRIBUTE_PATTERN)]
    .map((match) => match[1])
    .forEach((reference) => validateReference(htmlFile, reference));
});

if (errors.length > 0) {
  process.stderr.write(`Links locais inválidos:\n${errors.map((error) => `- ${error}`).join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write("All local HTML links and assets resolve.\n");
}
