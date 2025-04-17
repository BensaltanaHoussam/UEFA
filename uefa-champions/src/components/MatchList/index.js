import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../features/matches/matchesSlice';

const MatchList = () => {
    const dispatch = useDispatch();
    const { matches, loading, error, currentPage } = useSelector((state) => state.matches);

    useEffect(() => {
        dispatch(fetchMatches());
    }, [dispatch]);

    const matchesPerPage = 2;
    const indexOfLastMatch = currentPage * matchesPerPage;
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
    const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Quarter Final Matches</h1>
            <div className="grid gap-4">
                {currentMatches.map((match) => (
                    <div key={match.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <div className="text-lg">{match.homeTeam}</div>
                            <div className="text-xl font-bold">vs</div>
                            <div className="text-lg">{match.awayTeam}</div>
                        </div>
                        <div className="mt-2 text-center text-sm text-gray-600">
                            {new Date(match.startTime).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchList;