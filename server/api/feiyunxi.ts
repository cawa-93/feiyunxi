import { defineEventHandler } from "h3";
import * as fs from "node:fs/promises";
import { pathToFileURL } from 'node:url';

export default defineEventHandler(() => {
    return fs.readdir('.')//.then(f => f.map(pathToFileURL))
})
