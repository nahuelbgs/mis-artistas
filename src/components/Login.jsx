import { React, useEffect, useState } from "react";
import Selector from "./Selector";
import { Button } from "@nextui-org/react";

function Login() {
  const [token, setToken] = useState(null)
  const CLIENT_ID = "458d62972df24888b3e76df9a19261e4";
  const REDIRECT_URI = "https://mis-artistas.vercel.app/Callback";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "code";
  const SCOPE = "user-top-read";

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"))
  }, [token]);

  return (
    <>
      {token === null ? (
        <div className="flex h-screen">
          <div className="m-auto w-3/4 h-3/4 flex justify-between bg-[#111928af] backdrop-blur-lg backdrop-saturate-200 border border-[#ffffff20] rounded-lg max-lg:flex-col max-lg:justify-around max-sm:w-11/12 max-sm:h-5/6">
            <div className="w-5/12 flex flex-col items-start justify-center ml-10 text-white gap-5 max-lg:w-full max-lg:m-0 max-lg:p-4 max-md-h-1/2 max-sm:h-2/3 max-sm:gap-4">
              <h1 className="text-2xl max-sm:text-lg">
                ¿Te gustaría conocer cuáles son los artistas que más has
                escuchado?
              </h1>
              <h2 className="text-base max-sm:text-base">
                Muestra tus principales artistas y canciones en Spotify durante
                el último mes, los últimos seis meses y a lo largo de tu
                historial de escucha.
              </h2>
              <Button color="success">
                <a
                  className="text-xl text-white max-sm:text-base"
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
                >
                  INICIAR SESIÓN CON SPOTIFY
                </a>
              </Button>
            </div>
            <div className="w-1/2 mt-3 max-lg:w-full max-lg:h-1/2 max-md:h-1/3">
              <img
                className="w-full h-full object-cover max-lg:object-contain max-lg:p-4"
                src="https://i.postimg.cc/HxrbP9tN/asdasd.png"
                alt="Imagen con varios artistas"
              />
            </div>
          </div>
        </div>
      ) : (
        <Selector accessToken={token} />
      )}
    </>
  );
}

export default Login;
