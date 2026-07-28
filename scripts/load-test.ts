const base = process.env.APP_URL ?? 'http://localhost:3000'
const urls = ['/api/health', '/app/overview']
const results = await Promise.all(
  Array.from({ length: 20 }, (_, index) =>
    fetch(`${base}${urls[index % urls.length]}`).then((response) => response.status),
  ),
)
console.log({
  requests: results.length,
  successful: results.filter((status) => status < 400).length,
})

export {}
