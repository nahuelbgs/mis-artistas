import { React, useState, useEffect } from "react";
import Selector from "./Selector";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";

function Login() {
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const CLIENT_ID = "458d62972df24888b3e76df9a19261e4";
  const CLIENT_SECRET = "363ed3c25cd54645ab7d0fd7d0abc312";
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'code'
  const SCOPE = 'user-top-read'
  // useEffect(() =>{
  //   const hash = window.location.hash;
  //   if(hash){
  //   let token = hash.substring(1).split('&').find(element => element.startsWith('access_token')).split('=')[1]
  //   setAccessToken(token)}
  // }, [])

  useEffect(() => {
    const url = window.location.search;
    setAuthorizationCode(new URLSearchParams(url).get("code"));
    if (authorizationCode) {
      const authHeader = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`;
      const authOptions = {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${REDIRECT_URI}`,
      };
      fetch("https://accounts.spotify.com/api/token", authOptions)
        .then((response) => response.json())
        .then((data) => {
          setAccessToken(data.access_token)
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [authorizationCode]);

  return (
    <>
      {accessToken === null ? (
        <div className="flex h-screen">
          <div className="m-auto w-3/4 h-3/4 flex justify-between bg-[#111928af] backdrop-blur-lg backdrop-saturate-200 border border-[#ffffff20] rounded-lg max-lg:flex-col max-lg:justify-around max-sm:w-11/12 max-sm:h-5/6">
            <div className="w-5/12 flex flex-col items-start justify-center ml-10 text-white gap-5 max-lg:w-full max-lg:h-1/2 max-lg:m-0 max-lg:p-4 max-sm:gap-3">
              <h1 className="text-2xl max-sm:text-xl">
                ¿Te gustaría conocer cuáles son los artistas que más has
                escuchado?
              </h1>
              <h2 className="text-sm max-sm:text-base">
                Muestra tus principales artistas y canciones en Spotify durante
                el último mes, los últimos seis meses y a lo largo de tu
                historial de escucha.
              </h2>
              <Button color="success">
                <a
                  className="text-xl text-white max-sm:text-lg"
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
                >
                  INICIAR SESIÓN CON SPOTIFY
                </a>
              </Button>
            </div>
            <div className="w-1/2 mt-3 max-lg:w-full max-lg:h-1/2">
              <img
                className="w-full h-full object-cover max-lg:object-contain max-lg:p-4"
                src="https://i.postimg.cc/HxrbP9tN/asdasd.png"
                alt="Imagen con varios artistas"
              />
            </div>
          </div>
        </div>
      ) : (
        <Selector accessToken={accessToken} />
      )}
    </>
  );
}

export default Login;
