/**
 * Returns a title bar DOM element with the specified language as its content.
 * @param {string} language - The language to display in the title bar.
 * @return {{
*  type: string,
*  value: string
* }} 
*/
export const makeTitleBar = (language = '') => {
   return {
       type: 'html',
       value: `<div class='code-block-title'>${language}</div>`
   }
}



/**
 * Returns a header DOM element containing the specified filename, wrapped in a container div.
 * @param {string} [fileName=''] - The name of the file to display in the header.
 * @return {{
*  type: string,
*  data: { hProperties: { class: string } },
*  children: {
*      type: string,
*      data: { hProperties: { class: string } },
*      children: { type: string, value: string }[]
*  }[]
* }} An object describing a DOM element, including its type, data, and children.
*/
export const makeHeader = (fileName = "") => {
   const fileNameContainer = {
       type: 'div',
       data: {
           hProperties: { class: 'code-block-filename'}
       },
       children: [{type: 'span', value: fileName }]
   }

   const actionButtonsWrapper = {
    type: 'div',
    data: {
        hProperties: { class: 'code-block-actions' }
    },
    children: [{
        type: 'html',
        value: `<button data-action='copy'><svg width="24" height="24" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25 6.5V5.108C5.25 3.973 6.095 3.01 7.226 2.916C7.599 2.886 7.974 2.859 8.349 2.836M12.75 17H15C15.5967 17 16.169 16.7629 16.591 16.341C17.0129 15.919 17.25 15.3467 17.25 14.75V5.108C17.25 3.973 16.405 3.01 15.274 2.916C14.9 2.88498 14.5256 2.85831 14.151 2.836M14.151 2.836C14.009 2.3767 13.7226 1.97493 13.3357 1.68954C12.9489 1.40414 12.4808 1.25011 12 1.25H10.5C10.0192 1.25011 9.55115 1.40414 9.16426 1.68954C8.77738 1.97493 8.49203 2.3767 8.35 2.836C8.285 3.046 8.25 3.269 8.25 3.5V4.25H14.25V3.5C14.25 3.269 14.216 3.046 14.151 2.836ZM12.75 17.75V15.875C12.75 14.9799 12.3944 14.1215 11.7615 13.4885C11.1285 12.8556 10.2701 12.5 9.375 12.5H7.875C7.57663 12.5 7.29048 12.3815 7.0795 12.1705C6.86853 11.9595 6.75 11.6734 6.75 11.375V9.875C6.75 8.97989 6.39442 8.12145 5.76149 7.48851C5.12855 6.85558 4.27011 6.5 3.375 6.5H2.25M3.75 6.5H1.875C1.254 6.5 0.75 7.004 0.75 7.625V19.625C0.75 20.246 1.254 20.75 1.875 20.75H11.625C12.246 20.75 12.75 20.246 12.75 19.625V15.5C12.75 13.1131 11.8018 10.8239 10.114 9.13604C8.42613 7.44821 6.13695 6.5 3.75 6.5Z" stroke="#C5C5C5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>`
        },
        {
            type: 'html',
            value: `<button data-action='download'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5031 17.7703C11.6437 17.9391 11.8219 18 12 18C12.1781 18 12.356 17.937 12.4978 17.8103L19.2478 11.8103C19.5569 11.5357 19.5862 11.0612 19.3108 10.7519C19.0354 10.4413 18.558 10.4128 18.2519 10.6896L12.75 15.5812V0.75C12.75 0.335438 12.4125 0 12 0C11.5875 0 11.25 0.335438 11.25 0.75V15.5812L5.74687 10.6875C5.44219 10.4109 4.96406 10.4437 4.6875 10.7531C4.41375 11.0203 4.44281 11.5359 4.75313 11.7703L11.5031 17.7703ZM21 15H18.75C18.3358 15 18 15.3357 18 15.75C18 16.1642 18.3358 16.5 18.75 16.5H21C21.8283 16.5 22.5 17.1717 22.5 18V21C22.5 21.8283 21.8283 22.5 21 22.5H3C2.17172 22.5 1.5 21.8283 1.5 21V18C1.5 17.1717 2.17172 16.5 3 16.5H5.25C5.6625 16.5 6 16.1625 6 15.75C6 15.3375 5.6625 15 5.25 15H3C1.34297 15 0 16.343 0 18V21C0 22.657 1.34297 24 3 24H21C22.657 24 24 22.657 24 21V18C24 16.3453 22.6547 15 21 15ZM20.625 19.5C20.625 18.8789 20.1211 18.375 19.5 18.375C18.8789 18.375 18.375 18.8789 18.375 19.5C18.375 20.1211 18.8789 20.625 19.5 20.625C20.1211 20.625 20.625 20.1234 20.625 19.5Z" fill="#C5C5C5"/>
            </svg>
            </button>`
        }
]
   }

   const wrapper =  {
       type: 'div',
       data: {
           hProperties: { class: 'code-block-header' }
       },
       children: []
   }

   if (fileName) wrapper.children.push(fileNameContainer);
   wrapper.children.push(actionButtonsWrapper)

   return wrapper;
}


export const makeDirectoryHeader = (directory) => {
    const transformedDirectory = directory.split("/").join(" > ");
    return {
        type: 'html',
        value: `<div class='code-block-directory'>${transformedDirectory}</div>`
    }
}