import { visit } from "unist-util-visit";
import { run } from "@mermaid-js/mermaid-cli";
import fs from "fs";
import os from "os";
import path from "path";
import FileCache from "./cache.js";



const plugin = () =>  async (tree,file) =>{
    const { filename } = file;
    const blocks = [];

    visit(tree, { type: 'code', lang: 'mermaid' },(node,index,parent)=>{
        blocks.push({ node, index, parent });
    });

    for (const block of blocks){
            const { node, index, parent } = block;
            const { value } = node;
   
            const Cache = new FileCache(".mermaid-cache");
            const key = Cache.getCacheKey(filename,value);
            const cached = Cache.getCachedResults(key);
            let mermaidSvg;
            if (!cached){
                const tempFile = path.join(os.tmpdir(),'temporary.mmd');
                const outputFile = path.join(os.tmpdir(),'temporary.svg');
                fs.writeFileSync(tempFile,value);
                 await run(tempFile, outputFile,{
                    puppeteerConfig: {
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    }
                });
                mermaidSvg = fs.readFileSync(outputFile,'utf-8');
                Cache.cacheResults(key,mermaidSvg);
                // if (fs.existsSync(tempFile.toString())) fs.unlinkSync(tempFile.toString());
                // if (fs.existsSync(outputFile.toString()) )fs.unlinkSync(outputFile.toString());
            }
            
            else {
                mermaidSvg = cached;
            }



            const mermaidElement = { type: 'html', value: mermaidSvg };
            const controls = {
                type: 'html',
                value: `
                <div class='mermaid-bottom'>
                <div class='mermaid-controls'>
                    <button class='mermaid-button' data-action='zoom-in' aria-label='Zoom in'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3965 17.9998 12.4887 17.9998 10.4995C17.9998 8.51035 17.2096 6.60262 15.803 5.19605C14.3965 3.78947 12.4887 2.99927 10.4995 2.99927C8.51035 2.99927 6.60262 3.78947 5.19605 5.19605C3.78947 6.60262 2.99927 8.51035 2.99927 10.4995C2.99927 12.4887 3.78947 14.3965 5.19605 15.803C6.60262 17.2096 8.51035 17.9998 10.4995 17.9998C12.4887 17.9998 14.3965 17.2096 15.803 15.803ZM10.5 7.50005V13.5M13.5 10.5H7.50005" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>  
                    </button>
                    <button class='mermaid-button' data-action='reset-zoom' araia-label='Reset zoom'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.023 9.34794H21.015L17.834 6.16494C16.8099 5.14081 15.5342 4.40433 14.1352 4.02955C12.7362 3.65476 11.2632 3.65487 9.86428 4.02986C8.46534 4.40486 7.18977 5.14153 6.16581 6.16581C5.14184 7.19009 4.40557 8.46588 4.03101 9.86494M2.98501 19.6439V14.6519M2.98501 14.6519H7.97701M2.98501 14.6519L6.16501 17.8349C7.18912 18.8591 8.4648 19.5955 9.8638 19.9703C11.2628 20.3451 12.7358 20.345 14.1347 19.97C15.5337 19.595 16.8092 18.8584 17.8332 17.8341C18.8572 16.8098 19.5934 15.534 19.968 14.1349M21.015 4.35594V9.34594" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class='mermaid-button' data-action='zoom-out' aria-label='Zoom out'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3965 17.9998 12.4887 17.9998 10.4995C17.9998 8.51035 17.2096 6.60262 15.803 5.19605C14.3965 3.78947 12.4887 2.99927 10.4995 2.99927C8.51035 2.99927 6.60262 3.78947 5.19605 5.19605C3.78947 6.60262 2.99927 8.51035 2.99927 10.4995C2.99927 12.4887 3.78947 14.3965 5.19605 15.803C6.60262 17.2096 8.51035 17.9998 10.4995 17.9998C12.4887 17.9998 14.3965 17.2096 15.803 15.803ZM13.5 10.5H7.50005" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                </div>
                `
            }
            const mainWrapper = {
                type: 'div',
                data: { hProperties: { class: 'mermaid-diagram' } },
                children: [mermaidElement,controls]
              };
            parent.children[index] = mainWrapper;
            }
        }
        
    

export default plugin;
