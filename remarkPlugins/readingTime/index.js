import { visit } from "unist-util-visit";
import readingTime from "reading-time";


const plugin = ()=> (tree,file)=>{
    let text = '';
    visit(tree, ['code','text'], (node)=>{
        text += node.value;
    });

    file.data.fm['readingTime'] = readingTime(text);

}

export default plugin;