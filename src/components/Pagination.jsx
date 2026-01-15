import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  if (totalItems === 0) return null;

  return (
    <div className="flex justify-end items-center py-6 gap-6 text-xs text-gray-500 font-medium select-none">
      {/* Items Per Page Dropdown */}
      <div className="flex items-center gap-1 cursor-pointer">
        <span>{itemsPerPage}</span>
        <ChevronDown className="w-3 h-3" />
      </div>

      {/* Pagination Text */}
      <span>
        {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} of {totalItems}
      </span>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          <ChevronsLeft className={`w-4 h-4 ${currentPage === 1 ? 'text-gray-200' : 'text-gray-600 cursor-pointer hover:text-gray-800'}`} />
        </button>

        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft className={`w-4 h-4 ${currentPage === 1 ? 'text-gray-200' : 'text-gray-600 cursor-pointer hover:text-gray-800'}`} />
        </button>

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <ChevronRight className={`w-4 h-4 ${currentPage === totalPages ? 'text-gray-200' : 'text-gray-600 cursor-pointer hover:text-gray-800'}`} />
        </button>

        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
          <ChevronsRight className={`w-4 h-4 ${currentPage === totalPages ? 'text-gray-200' : 'text-gray-600 cursor-pointer hover:text-gray-800'}`} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;