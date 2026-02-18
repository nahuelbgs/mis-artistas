import React, { useEffect, useState } from "react";
function Callback() {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const urlSearch = window.location.search;
    const authCode = new URLSearchParams(urlSearch).get("code");
    if (authCode) {
      fetch(`/api/auth/callback?code=${encodeURIComponent(authCode)}`)
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
      window.location.href = "/";
    }
  }, [accessToken]);

  return (
    <div className="bg-[url('https://assets.shots.so/original/abstract/19.jpg')] bg-cover w-full h-screen">
    </div>
  );
}
export default Callback;
