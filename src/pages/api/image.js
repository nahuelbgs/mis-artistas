function isAllowedHost(hostname) {
  return (
    hostname.endsWith(".scdn.co") || hostname.endsWith(".spotifycdn.com")
  );
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end();
  }

  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing url" });
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  if (!isAllowedHost(parsed.hostname)) {
    return res.status(400).json({ error: "Host not allowed" });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).end();

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400, immutable");
    res.send(buffer);
  } catch (err) {
    console.error("Image proxy error:", err);
    res.status(500).end();
  }
}
