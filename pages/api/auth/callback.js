export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({error: "Method not allowed"});
  }

  const {code} = req.query;

  if (!code) {
    return res.status(400).json({error: "Missing authorization code"});
  }

  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

  if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
    return res
      .status(500)
      .json({error: "Missing Spotify environment variables on the server"});
  }

  const authHeader =
    "Basic " +
    Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  }).toString();

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return res
        .status(response.status)
        .json({error: "Spotify token request failed", details: errorBody});
    }

    const data = await response.json();

    return res.status(200).json({
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token ?? null,
      scope: data.scope,
    });
  } catch (error) {
    console.error("Error fetching access token from Spotify:", error);
    return res
      .status(500)
      .json({error: "Internal server error while contacting Spotify"});
  }
}

