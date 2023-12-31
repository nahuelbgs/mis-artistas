import React, { useEffect, useState } from "react";
function Callback() {
  const [accessToken, setAccessToken] = useState(null);
  const CLIENT_ID = "458d62972df24888b3e76df9a19261e4";
  const CLIENT_SECRET = "363ed3c25cd54645ab7d0fd7d0abc312";
  const REDIRECT_URI = "https://mis-artistas.vercel.app/Callback";
  useEffect(() => {
    const urlSearch = window.location.search;
    const authCode = new URLSearchParams(urlSearch).get("code");
    if (authCode) {
      const authHeader = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`;
      const authOptions = {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${REDIRECT_URI}`,
      };
      fetch("https://accounts.spotify.com/api/token", authOptions)
        .then((response) => response.json())
        .then((data) => {
          setAccessToken(data.access_token);
          localStorage.setItem("accessToken", data.access_token);
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (accessToken !== null) {
      window.location.href = "https://mis-artistas.vercel.app/";
    }
  }, [accessToken]);

  return (
    <div className="bg-[url('https://assets.shots.so/original/abstract/19.jpg')] bg-cover w-full h-screen">
    </div>
  );
}
export default Callback;
