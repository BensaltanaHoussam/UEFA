import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../features/matches/matchesSlice';

const Pagination = () => {
    const dispatch = useDispatch();
    const { matches, currentPage } = useSelector((state) => state.matches);
    const totalPages = Math.ceil(matches.length / 2);

    return (
        <div className="flex justify-center mt-4 gap-2">
            <button
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Previous
            </button>
            <button
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;