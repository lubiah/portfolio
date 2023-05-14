import { visit } from "unist-util-visit";
import { run } from "@mermaid-js/mermaid-cli";
import fs from "fs";
import os from "os";
import path from "path";



const plugin = () => async (tree) =>{

    const blocks = [];
    const promises = [];

    visit(tree, 'code',(node,index,parent)=>{
        if (node.lang !== 'mermaid') return;
        blocks.push({ node, index, parent });
    });

    for (const block of blocks){
        let promise = new Promise(async (resolve)=>{
            const { node, index, parent } = block;
            const { value } = node;
            const tempFile = path.join(os.tmpdir(),'temporary.mmd');
            const outputFile = path.join(os.tmpdir(),'temporary.svg');
            fs.writeFileSync(tempFile,value);
            await run(tempFile, outputFile);

            const mermaidSvg = fs.readFileSync(outputFile,'utf-8');
            const mainWrapper = {
                type: 'div',
                data: { hProperties: { class: 'mermaid' } },
                children: [{type:'html', value: mermaidSvg}]
              };
            parent.children[index] = mainWrapper;

            fs.unlinkSync(tempFile);
            fs.unlinkSync(outputFile)
            resolve();
        });
        promises.push(promise);
        
    }

    await Promise.all(promises);
}


export default plugin;