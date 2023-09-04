import { React, useState, useEffect } from "react";
import { useAppContext } from "./Context/AppContext";
import Selector from "./Selector";
import { Button } from "@nextui-org/react";

function Login() {
  const [authorizationCode, setAuthorizationCode] = useState("");
  const { accessToken, setAccessToken } = useAppContext();
  const clientId = "458d62972df24888b3e76df9a19261e4";
  const clientSecret = "363ed3c25cd54645ab7d0fd7d0abc312";
  useEffect(() => {
    const url = window.location.search;
    setAuthorizationCode(new URLSearchParams(url).get("code"));
    if (authorizationCode) {
      const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
      const authOptions = {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `code=${authorizationCode}&redirect_uri=http://localhost:3000/&grant_type=authorization_code`,
      };
      fetch("https://accounts.spotify.com/api/token", authOptions)
        .then((response) => response.json())
        .then((data) => {
          setAccessToken(data.access_token);
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
          <div className="m-auto w-3/4 h-3/4 flex bg-[#111928af] backdrop-blur-lg backdrop-saturate-200 border border-[#ffffff20] rounded-lg">
            <div className="w-2/5 flex flex-col items-start justify-center ml-10 text-white gap-5">
              <h1 className="text-2xl">
                ¿Te gustaría conocer cuáles son los artistas que más has escuchado?
              </h1>
              <h2 className="text-sm">Muestra tus principales artistas en Spotify durante el último mes, los últimos seis meses y a lo largo de tu historial de escucha.</h2>
              <Button className="bg-green-500">
                <a
                  className="text-xl text-white"
                  href={`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/&scope=user-top-read&grant_type=authorization_code`}
                >
                  INICIAR SESIÓN
                </a>
              </Button>
            </div>
            <div className="w-3/5 flex">
              <img
                className="w-full object-cover"
                src="https://i.postimg.cc/bwRLJFXn/artistas.png"
                alt="Imagen con varios artistas"
              />
            </div>
          </div>
        </div>
      ) : (
        <Selector />
      )}
    </>
  );
}

export default Login;
