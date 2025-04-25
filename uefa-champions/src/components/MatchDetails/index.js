import React from 'react';
import { X, Clock, MapPin, Calendar } from "lucide-react";

const MatchDetails = ({ selectedMatch, onClose }) => {
  if (!selectedMatch) return null;

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-blue-950 to-black rounded-lg max-w-2xl w-full shadow-xl">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-blue-800/30">
          <h2 className="text-xl font-bold text-white">Match Details</h2>
          <button
            onClick={onClose}
            className="text-blue-300 hover:text-white p-2 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 border-b-white">
          {/* Match Overview */}
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {selectedMatch.homeTeam?.name}
              </h3>
              <p className="text-sm text-blue-300">
                {selectedMatch.homeTeam?.country?.name}
              </p>
            </div>

            <div className="px-8 text-center">
              <div className="text-4xl font-bold text-white space-x-4">
                <span>{selectedMatch.homeScore?.current || 0}</span>
                <span className="text-blue-400">-</span>
                <span>{selectedMatch.awayScore?.current || 0}</span>
              </div>
            </div>

            <div className="text-center flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {selectedMatch.awayTeam?.name}
              </h3>
              <p className="text-sm text-blue-300">
                {selectedMatch.awayTeam?.country?.name}
              </p>
            </div>
          </div>

          {/* Match Info */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="flex items-center gap-3 text-blue-300">
              <Calendar className="w-5 h-5" />
              <div>
                <p className="text-xs uppercase">Date</p>
                <p className="text-white">{formatDate(selectedMatch.startTimestamp)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-blue-300">
              <Clock className="w-5 h-5" />
              <div>
                <p className="text-xs uppercase">Time</p>
                <p className="text-white">{formatTime(selectedMatch.startTimestamp)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-blue-300">
              <MapPin className="w-5 h-5" />
              <div>
                <p className="text-xs uppercase">Venue</p>
                <p className="text-white">{selectedMatch.venue?.name || 'TBD'}</p>
              </div>
            </div>
          </div>

          {/* Match Statistics */}
          {selectedMatch.stats && (
            <div className="space-y-4 border-t border-blue-800/30 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Match Stats</h3>
              <div className="grid gap-3">
                {Object.entries(selectedMatch.stats).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-blue-300">{key}</span>
                    <div className="flex gap-4 text-white">
                      <span>{value?.home || 0}</span>
                      <span>{value?.away || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;