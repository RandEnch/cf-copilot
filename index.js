export default {
  async fetch(request, env) {
    // 密码校验
    const urlObj = new URL(request.url)
    const auth = urlObj.searchParams.get("pwd") // 从 URL 参数获取密码
    if (env.MCP_PASSWD && auth !== env.MCP_PASSWD) {
      return new Response("Unauthorized: wrong or missing password", { status: 401 })
    }

    // 转发逻辑
    const url = new URL(request.url)
    url.hostname = "copilot.microsoft.com"
    url.protocol = "https:"

    const newHeaders = new Headers(request.headers)
    newHeaders.set("host", "copilot.microsoft.com")
    newHeaders.set(
      "user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    )
    newHeaders.set("referer", "https://copilot.microsoft.com/")

    const newReq = new Request(url, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: "follow"
    })

    return fetch(newReq)
  }
}
