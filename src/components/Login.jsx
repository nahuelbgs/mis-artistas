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
        body: `code=${authorizationCode}&redirect_uri=https://mis-artistas.vercel.app/&grant_type=authorization_code`,
      };
      fetch("https://accounts.spotify.com/api/token", authOptions)
        .then((response) => response.json())
        .then((data) => {
          setAccessToken(data.access_token);
          if (!localStorage.getItem("token")) {
            localStorage.setItem("token", data.access_token);
            replaceUrl()
          }
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [authorizationCode]);
  const replaceUrl = () => {
    const newURL = `${window.location.origin}${window.location.pathname}`;
    return window.location.replace(newURL);
  };

  console.log(accessToken);
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
                  href={`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=https://mis-artistas.vercel.app/&scope=user-top-read&grant_type=authorization_code`}
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
        <Selector />
      )}
    </>
  );
}

export default Login;
