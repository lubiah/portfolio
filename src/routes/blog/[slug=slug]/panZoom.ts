import panZoom from "svg-pan-zoom";

const plugin = (node: HTMLElement) =>  {
    const svgElement: SVGElement = node.querySelector("svg")!;
    const resetZoomButton: HTMLElement = node.querySelector('[data-action=reset-zoom]')!;
    const zoomInButton: HTMLElement = node.querySelector('[data-action=zoom-in]')!;
    const zoomOutButton: HTMLElement = node.querySelector('[data-action=zoom-out]')!;

    const zoom = panZoom(svgElement,{
        fit: true,
        center: true
    });

    const { width, height } = zoom.getSizes();
    svgElement.style.width = width.toString();
    svgElement.style.height = height.toString();

    resetZoomButton.addEventListener("click", ()=>{
        zoom.reset();
    });

    zoomInButton.addEventListener("click",()=>{
        zoom.zoomIn();
    });

    zoomOutButton.addEventListener('click',()=>{
        zoom.zoomOut();
    })


}

// TODO: Remove event listeners;
export default plugin;
