import { execFileSync } from "node:child_process";

const previous = process.env.VERCEL_GIT_PREVIOUS_SHA;
const current = process.env.VERCEL_GIT_COMMIT_SHA || "HEAD";

function build(reason) {
  console.log(`[vercel-guard] build: ${reason}`);
  process.exit(1);
}

function skip(reason) {
  console.log(`[vercel-guard] skip: ${reason}`);
  process.exit(0);
}

if (!previous || /^0+$/.test(previous)) {
  build("no previous successful deployment SHA is available");
}

let base = previous;
try {
  execFileSync("git", ["merge-base", "--is-ancestor", previous, current], { stdio: "ignore" });
} catch {
  // The last successful Vercel deployment can be a Preview commit that is not
  // an ancestor of a squash/merge on main. Comparing those two trees can make
  // a real Production change look empty. Fall back to the current first parent.
  base = `${current}^`;
  console.log(`[vercel-guard] ${previous} is not an ancestor of ${current}; using ${base}`);
}

let changedFiles;
try {
  changedFiles = execFileSync("git", ["diff", "--name-only", base, current, "--"], {
    encoding: "utf8"
  })
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean);
} catch (error) {
  build(`could not compare ${base}..${current}: ${error.message}`);
}

if (changedFiles.length === 0) {
  skip("no files changed since the deployment baseline");
}

const exactRuntimeFiles = new Set([
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "tsconfig.json",
  "vercel.json",
  "scripts/vercel-ignore-build.mjs"
]);

function affectsRuntime(file) {
  if (exactRuntimeFiles.has(file)) return true;
  if (/^(app|components|lib|public)\//.test(file)) return true;
  if (/^data\/.*\.(?:ts|tsx|js|jsx|mjs|cjs)$/.test(file)) return true;
  if (/^(next\.config\.|middleware\.)/.test(file)) return true;
  return false;
}

const relevant = changedFiles.filter(affectsRuntime);
if (relevant.length > 0) {
  build(`application/runtime inputs changed: ${relevant.join(", ")}`);
}

skip(`generated data/docs/automation-only changes: ${changedFiles.join(", ")}`);
