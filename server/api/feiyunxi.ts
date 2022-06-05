import { defineEventHandler } from "h3";
import * as fs from "node:fs/promises";
import { pathToFileURL } from 'node:url';

export default defineEventHandler(() => {
    return fs.readdir('./public/images/feiyunxi')//.then(f => f.map(pathToFileURL))
})
