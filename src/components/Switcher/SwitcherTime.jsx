import React from "react";

function SwitcherTime({ switcherTime, setSwitcherTime }) {
  const handleSwitcher = (e) => {
    setSwitcherTime(e.target.value);
  };
  return (
    <div className="bg-[#27272a] w-fit flex rounded-xl">
      <div
        className={`${
          switcherTime === "short_term"
            ? "bg-[#3F3F46] m-1 rounded-xl transition-all duration-500"
            : "m-1 rounded-xl text-[#606067] transition-all duration-500"
        }`}
      >
        <button
          onClick={handleSwitcher}
          value="short_term"
          className="text-sm p-2"
        >
          Último Mes
        </button>
      </div>
      <div
        className={`${
          switcherTime === "medium_term"
            ? "bg-[#3F3F46] m-1 rounded-xl transition-all duration-500"
            : "m-1 rounded-xl text-[#606067] transition-all duration-500"
        }`}
      >
        <button
          onClick={handleSwitcher}
          value="medium_term"
          className="text-sm p-2"
        >
          Últimos 6 meses
        </button>
      </div>
      <div
        className={`${
          switcherTime === "long_term"
            ? "bg-[#3F3F46] m-1 rounded-xl transition-all duration-500"
            : "m-1 rounded-xl text-[#606067] transition-all duration-500"
        }`}
      >
        <button
          onClick={handleSwitcher}
          value="long_term"
          className="text-sm p-2"
        >
          Todo el tiempo
        </button>
      </div>
    </div>
  );
}

export default SwitcherTime;
