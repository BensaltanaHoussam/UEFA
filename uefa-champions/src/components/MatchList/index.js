import React from "react";
import { useSelector } from "react-redux";
import { Calendar, Clock, MapPin, TrendingUp } from "lucide-react";

const MatchList = ({ onMatchClick }) => {
  const { matches, loading, error } = useSelector((state) => state.matches);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
        <p className="text-blue-300 animate-pulse">Loading matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-blue-950/50 border-l-4 border-red-500 text-blue-200 p-4 rounded-r shadow-md"
        role="alert"
      >
        <div className="flex items-center gap-2">
          <svg
            className="h-6 w-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938-9L12 4.062 18.938 11 12 17.938 5.062 11z"
            />
          </svg>
          <span className="font-medium">Error!</span>
        </div>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  const getMatchStatus = (match) => {
    const now = Math.floor(Date.now() / 1000);

    if (match.status === "LIVE") {
      return { label: "LIVE", class: "bg-red-500" };
    } else if (now > match.startTimestamp) {
      return { label: "COMPLETED", class: "bg-blue-800" };
    } else {
      return { label: "UPCOMING", class: "bg-blue-600" };
    }
  };

  const formatMatchTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMatchDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {matches.map((match) => (
        <div
          key={match.id}
          onClick={() => onMatchClick(match)}
          className="bg-black backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold text-white">
              {match.homeTeam?.name || "TBD"}
              {match.homeTeam?.country && (
                <span className="text-sm text-blue-300 ml-2">
                  ({match.homeTeam.country.name})
                </span>
              )}
            </div>
            <div className="text-xl font-bold text-blue-400 px-4 py-2 rounded">
              {match.homeScore?.current || 0} - {match.awayScore?.current || 0}
            </div>
            <div className="text-lg font-semibold text-white">
              {match.awayTeam?.name || "TBD"}
              {match.awayTeam?.country && (
                <span className="text-sm text-blue-300 ml-2">
                  ({match.awayTeam.country.name})
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(match.startTimestamp * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {new Date(match.startTimestamp * 1000).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{match.venue?.name || "TBD"}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>{match.status?.description || "Scheduled"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
