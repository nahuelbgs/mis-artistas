import React from "react";

function SwitcherArtistSong({switcherArtistSong, setSwitcherArtistSong}) {
    const handleSwitcher = (e) =>{
        e.preventDefault()
        setSwitcherArtistSong(e.target.value);
    }
  return (
    <div className="bg-[#27272a] flex w-fit rounded-xl">
      <div className={`${switcherArtistSong === 'songs' ? 'bg-[#3F3F46] m-1 rounded-xl  transition-all duration-500' : 'm-1 rounded-xl text-[#606067] transition-all duration-500'}`}>
        <button onClick={handleSwitcher} value='songs' className="text-sm p-2">
          Canciones
        </button>
      </div>
      <div className={`${switcherArtistSong === 'artists' ? 'bg-[#3F3F46] m-1 rounded-xl  transition-all duration-500' : 'm-1 rounded-xl text-[#606067] transition-all duration-500'}`}>
        <button onClick={handleSwitcher} value='artists' className="text-sm p-2">
          Artistas
        </button>
      </div>
    </div>
  );
}

export default SwitcherArtistSong;
