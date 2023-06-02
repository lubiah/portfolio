import fs from "fs";
import path from "path";
import crypto from "crypto";

/**
 * A simple FileCache
 */
class FileCache {
    /**
     * Create a FileCache instance.
     * @param {string} cacheDir - The directory path for the cache.
     */
    constructor(cacheDir) {
      this.cacheDir = cacheDir;
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
    }
  
    /**
     * Generate a cache key based on the file and its contents.
     * @param {string} file - The file path.
     * @param {string} contents - The contents of the file.
     * @returns {string} The generated cache key.
     */
    getCacheKey = (file, contents) => {
      const fileHash = crypto.createHash('md5').update(file).digest('hex');
      const contentHash = crypto.createHash('md5').update(contents).digest('hex');
      return `${fileHash}-${contentHash}`;
    };
  
    /**
     * Cache the results with the specified key.
     * @param {string} key - The cache key.
     * @param {*} result - The result to be cached.
     */
    cacheResults = (key, result) => {
      const filepath = path.join(this.cacheDir, `${key}.json`);
      const data = { result, expiry: Date.now() + 24 * 60 * 60 * 1000 };
      fs.writeFileSync(filepath, JSON.stringify(data));
    };
  
    /**
     * Retrieve the cached results for the specified key.
     * @param {string} key - The cache key.
     * @returns {*} The cached results if available, otherwise undefined.
     */
    getCachedResults = (key) => {
      const filepath = path.join(this.cacheDir, `${key}.json`);
      if (fs.existsSync(filepath)) {
        const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        if (data.expiry > Date.now()) {
          return data.result;
        }
        fs.unlinkSync(filepath);
      }
      return undefined;
    };
  }

export default FileCache