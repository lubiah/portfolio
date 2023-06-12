import { sequence } from "@sveltejs/kit/hooks";
import minify from "./minifyhtml";
import redirect from "./redirect";

export const handle = sequence(minify,redirect);