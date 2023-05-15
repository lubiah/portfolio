import fs from "fs";
import path from "path";
import crypto from "crypto";

class FileCache {
    constructor(cacheDir){
        this.cacheDir = cacheDir;
        if(!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir)
    }

    getCacheKey = (file,contents)=>{
        const fileHash = crypto.createHash('md5').update(file).digest('hex');
        const contentHash = crypto.createHash('md5').update(contents).digest('hex');
        return `${fileHash}-${contentHash}`
    }

    cacheResults = (key,result)=>{
        const filepath = path.join(this.cacheDir, `${key}.json`);
        const data = { result, expiry: Date.now() + (24 * 60 * 60 * 1000)}
        fs.writeFileSync(filepath,JSON.stringify(data));    
    }


    getCachedResults = (key)=>{
        const filepath = path.join(this.cacheDir,`${key}.json`);
        if (fs.existsSync(filepath)){
            const data = JSON.parse(fs.readFileSync(filepath,'utf-8'));
            if (data.expiry > Date.now()){
                return data.result
            }
            fs.unlinkSync(filepath);
        }
        return undefined;
    }
}


export default FileCache;