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
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-6 shadow-lg">
                <h1 className="text-3xl font-bold text-center">
                    UEFA Champions League
                </h1>
                <p className="text-center text-blue-100">Quarter Finals 2024/2025</p>
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