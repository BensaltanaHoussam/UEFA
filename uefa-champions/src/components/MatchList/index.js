import React from 'react';
import { useSelector } from 'react-redux';

const MatchList = ({ onMatchClick }) => {
    const { matches, loading, error } = useSelector((state) => state.matches);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {matches.map((match) => (
                <div
                    key={match.id}
                    onClick={() => onMatchClick(match)}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-lg font-semibold">
                            {match.homeTeam?.name || "TBD"}
                        </div>
                        <div className="text-xl font-bold bg-gray-100 px-4 py-2 rounded">
                            {match.homeScore?.current || 0} -{" "}
                            {match.awayScore?.current || 0}
                        </div>
                        <div className="text-lg font-semibold">
                            {match.awayTeam?.name || "TBD"}
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-600">
                        {new Date(match.startTimestamp * 1000).toLocaleDateString("en-GB", {
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
    );
};

export default MatchList;