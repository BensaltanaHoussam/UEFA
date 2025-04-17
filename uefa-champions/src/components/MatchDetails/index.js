import React from 'react';

const MatchDetails = ({ selectedMatch, onClose }) => {
  if (!selectedMatch) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Match Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-8">
          {/* Match Score Section */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <img
                src={selectedMatch.homeTeam?.logo}
                alt={selectedMatch.homeTeam?.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <div className="text-xl font-semibold">
                {selectedMatch.homeTeam?.name}
              </div>
            </div>
            <div className="text-4xl font-bold px-6">
              {selectedMatch.homeScore?.current || 0} -{" "}
              {selectedMatch.awayScore?.current || 0}
            </div>
            <div className="text-center">
              <img
                src={selectedMatch.awayTeam?.logo}
                alt={selectedMatch.awayTeam?.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <div className="text-xl font-semibold">
                {selectedMatch.awayTeam?.name}
              </div>
            </div>
          </div>

          {/* Match Information */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-600">Date & Time</h3>
              <p>
                {new Date(selectedMatch.startTimestamp * 1000).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600">Venue</h3>
              <p>{selectedMatch.venue?.name || "TBD"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600">Tournament Stage</h3>
              <p>Quarter Finals</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600">Status</h3>
              <p>{selectedMatch.status?.description || "Scheduled"}</p>
            </div>
          </div>

          {/* Man of the Match Section */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Man of the Match
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                  <span className="text-yellow-800 text-2xl">👑</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">
                  {selectedMatch.bestPlayer?.name || "To be announced"}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedMatch.bestPlayer?.team || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;