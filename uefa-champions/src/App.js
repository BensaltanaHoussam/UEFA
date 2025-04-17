import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches } from "./features/matches/matchesSlice";

function App() {
  const dispatch = useDispatch();
  const { matches, loading, error } = useSelector((state) => state.matches);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    dispatch(fetchMatches())
      .unwrap()
      .then((data) => console.log("Fetched data:", data))
      .catch((error) => console.error("Fetch error:", error));
  }, [dispatch]);

  console.log('Current state:', { matches, loading, error });

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          UEFA Champions League
        </h1>
        <p className="text-center text-blue-100">Quarter Finals 2024/2025</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Matches Grid */}
        {matches && matches.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {matches.map((match) => (
              <div
                key={match.id}
                onClick={() => handleMatchClick(match)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-semibold">{match.homeTeam}</div>
                  <div className="text-sm bg-gray-100 px-3 py-1 rounded">
                    vs
                  </div>
                  <div className="text-lg font-semibold">{match.awayTeam}</div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {new Date(match.startTime).toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Match Details Modal */}
        {selectedMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Match Details</h2>
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <pre className="bg-gray-50 p-4 rounded">
                {JSON.stringify(selectedMatch, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
