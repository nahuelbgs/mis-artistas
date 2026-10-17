import { useEffect, useState } from "react";
import Selector from "./Selector";
import SpotifyBadge from "./SpotifyBadge";

export default function Login() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  if (token !== null) return <Selector accessToken={token} />;

  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_ENDPOINT;
  const RESPONSE_TYPE = process.env.NEXT_PUBLIC_SPOTIFY_RESPONSE_TYPE;
  const SCOPE = process.env.NEXT_PUBLIC_SPOTIFY_SCOPE;

  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 sm:p-12 max-w-md w-full flex flex-col items-center gap-6 shadow-2xl">
        <SpotifyBadge className="w-16 h-16" />
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            ¿Cuáles son tus artistas más escuchados?
          </h1>
          <p className="text-sm sm:text-base text-white/60">
            Descubrí tus canciones y artistas top en Spotify del último mes,
            los últimos 6 meses y de siempre.
          </p>
        </div>
        <a
          href={authUrl}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold rounded-full px-8 py-3 text-sm sm:text-base transition-colors cursor-pointer shadow-lg w-full text-center"
        >
          Iniciar sesión con Spotify
        </a>
        <p className="text-xs text-white/40 text-center">
          Solo lectura. No publicamos nada en tu cuenta.
        </p>
      </div>
    </div>
  );
}
