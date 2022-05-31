import { KVError } from "./../node_modules/wrangler/vendor/@cloudflare/kv-asset-handler/src/types";
import {
	getAssetFromKV,
	InternalError,
	MethodNotAllowedError,
	NotFoundError,
} from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event: FetchEvent) => {
	event.respondWith(handleEvent(event));
});

async function handleEvent(event: FetchEvent) {
	try {
		return await getAssetFromKV(event);
	} catch (e) {
		const url = new URL(event.request.url);

		const notFound =
			e instanceof NotFoundError ||
			e instanceof MethodNotAllowedError;
		const internalError =
			e instanceof InternalError || e instanceof KVError;

		const is404Page =
			url.pathname.startsWith("/404") ||
			url.pathname.startsWith("404");
		const is500Page =
			url.pathname.startsWith("/500") ||
			url.pathname.startsWith("500");

		if (notFound) {
			if (!is404Page) {
				return Response.redirect(
					`${url.protocol}//${url.host}/404`
				);
			} else {
				console.log("error with 404 page: ");
				console.log("error name: ", e.name);
				console.log("error message: ", e.message);
				console.log("error stack: ", e.stack);
				return new Response("Not Found", {
					status: 404,
				});
			}
		} else if (internalError) {
			if (!is500Page) {
				return Response.redirect(
					`${url.protocol}//${url.host}/500`
				);
			} else {
				console.log("internal server error: ");
				console.log("error name: ", e.name);
				console.log("error message: ", e.message);
				console.log("error stack: ", e.stack);
				return new Response("Internal Server Error", {
					status: 500,
				});
			}
		}
		return new Response("Uncaught Internal Server Error", {
			status: 500,
		});
	}
}
