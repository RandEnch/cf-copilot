export default {
  async fetch(request) {
    const url = new URL(request.url)
    url.hostname = "copilot.microsoft.com"
    return fetch(new Request(url, request))
  }
}
