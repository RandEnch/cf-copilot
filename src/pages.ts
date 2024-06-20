import { bingPorxyWorker } from "./proxy/bingPorxyWorker";

export async function onRequest(context:EventContext<Env,string,any>):Promise<Response>{
    const { request, env } = context;
    const { pathname } = new URL(request.url);
    if (pathname == "/robots.txt") {
        return new Response("User-agent: *\nDisallow: /", {
            headers: { "Content-Type": "text/plain" },
        });
    } else
	return bingPorxyWorker(request, env);
}
