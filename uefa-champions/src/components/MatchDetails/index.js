import React from 'react';
import { useSelector } from 'react-redux';

const MatchDetails = () => {
    const { selectedMatch } = useSelector((state) => state.matches);

    if (!selectedMatch) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Match Details</h2>
                {/* Add match details here */}
            </div>
        </div>
    );
};

export default MatchDetails;