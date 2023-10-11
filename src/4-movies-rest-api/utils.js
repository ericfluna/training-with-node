import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export function readJson(path){
  return require(path)
}

