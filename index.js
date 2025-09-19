export default {
  async fetch(request) {
    const url = new URL(request.url)
    url.hostname = "copilot.microsoft.com"
    url.protocol = "https:"
    const newReq = new Request(url, request)
    newReq.headers.set("host", "copilot.microsoft.com")
    return fetch(newReq)
  }
}
