import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// The authored HTML/SVG is rendered at build time. The isolated Node 22
// runtime needs only its standard library and these immutable PNG bytes.
const destination = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const bytes = await readFile(new URL('./entry.png', import.meta.url));
if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
  throw new Error('The committed news artifact must be a PNG');
}
await mkdir(destination, { recursive: true });
await writeFile(join(destination, 'entry.png'), bytes);
