import type { Handle } from "@sveltejs/kit";
import redirects from "./redirect.json";

/**
 * This handle function handles redirects
 */
const handle = (async ({ event, resolve })=>{
    let mustRedirect = redirects.find(route => route.from === event.url.pathname);
    if (mustRedirect) return Response.redirect(`${event.url.origin}${mustRedirect.to}`,mustRedirect.status);
    return await resolve(event);

}) satisfies Handle

export default handle;