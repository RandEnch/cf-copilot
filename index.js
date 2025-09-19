export default {
  async fetch(request) {
    const url = new URL(request.url)
    url.hostname = "copilot.microsoft.com"
    url.protocol = "https:"

    const newHeaders = new Headers(request.headers)
    newHeaders.set("host", "copilot.microsoft.com")
    newHeaders.set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
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
