import { sequence } from "@sveltejs/kit/hooks";
import minify from "./minifyhtml"

export const handle = sequence(minify);