import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMatches } from "./features/matches/matchesSlice";
import MatchList from "./components/MatchList";
import MatchDetails from "./components/MatchDetails";

function App() {
  const dispatch = useDispatch();
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black py-8 px-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-950 opacity-80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#000_70%)]"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 transform rotate-45 bg-blue-500 ml-1 first:ml-0"
                    ></div>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  UEFA <span className="text-blue-400">Champions League</span>
                </h1>
              </div>
              <p className="text-blue-300 mt-2 tracking-wider text-sm md:text-base font-medium">
                QUARTER FINALS 2024/2025
              </p>
            </div>

            <div className="bg-blue-900/50 backdrop-blur-sm px-4 py-3 rounded-lg border border-blue-800/50 shadow-lg">
              <div className="text-xs text-blue-300 uppercase font-semibold">
                Next Match
              </div>
              <div className="text-white font-bold mt-1">
                Apr 18 • 20:00 CET
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <MatchList onMatchClick={handleMatchClick} />
        <MatchDetails
          selectedMatch={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      </main>
    </div>
  );
}

export default App;
