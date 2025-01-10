// src/deno/denoFs.ts

export function existsSync(path: string): boolean {
  try {
    Deno.statSync(path);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
}

export function readFileSync(path: string, encoding: string): string {
  if (encoding !== "utf-8") {
    throw new Error("Only utf-8 encoding is supported.");
  }
  const data = Deno.readFileSync(path);
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(data);
}

export function resolve(...paths: string[]): string {
  let resolvedPath = paths[0];
  for (let i = 1; i < paths.length; i++) {
    if (paths[i].startsWith('/')) {
      resolvedPath = paths[i];
    } else {
      resolvedPath += '/' + paths[i];
    }
  }
  const segments = resolvedPath.split('/').filter(segment => segment.length > 0);
  const stack = [];
  for (const segment of segments) {
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }
  return '/' + stack.join('/');
}

export function cwd(): string {
  return Deno.cwd();
}
