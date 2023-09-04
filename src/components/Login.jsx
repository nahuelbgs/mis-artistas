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
    <div className="h-full">
      {accessToken === null ? (
        <div className="flex flex-col h-screen">
          <div className="bg-gradient-to-tr from-pink-500 to-yellow-500 m-auto w-5/6 h-5/6 flex">
            <div className="w-1/2">
            <h1>¿Te gustaría conocer cuáles son los artistas y canciones que más has escuchado?</h1>
            <Button className="bg-green-500">
          <a
            className="text-xl text-white"
            href={`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/&scope=user-top-read&grant_type=authorization_code`}
          >
            INICIAR SESIÓN
          </a>
        </Button>
            </div>
            <div className="w-1/2 flex items-end">
            <img className="w-full object-cover" src='https://i.postimg.cc/6qw4fTr1/Artists.png' alt="Imagen con varios artistas"/>
            </div>
          </div>
        </div>
      ) : (
        <Selector />
      )}
    </div>
  );
}

export default Login;
