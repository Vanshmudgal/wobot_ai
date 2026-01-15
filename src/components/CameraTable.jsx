import React from 'react';
import { AlertCircle, Ban, CheckCircle2, Trash2 } from 'lucide-react';
import HealthGrade from './HealthGrade'; // Import the helper we made above

const CameraTable = ({ cameras, loading, onUpdateStatus, onDelete }) => {
  
  // Handle Loading State
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Handle Empty State
  if (cameras.length === 0) {
    return <div className="text-center py-10 text-gray-400">No cameras found.</div>;
  }

  return (
    <div className="overflow-x-auto min-h-[400px]">
      <table className="w-full text-left border-collapse">
        {/* Table Head */}
        <thead>
          <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th className="py-4 pl-4 w-10"><input type="checkbox" className="rounded border-gray-300" /></th>
            <th className="py-4 px-2">Name</th>
            <th className="py-4 px-2">Health</th>
            <th className="py-4 px-2">Location</th>
            <th className="py-4 px-2">Recorder</th>
            <th className="py-4 px-2">Tasks</th>
            <th className="py-4 px-2">Status</th>
            <th className="py-4 px-2 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-sm text-gray-700">
          {cameras.map((cam) => (
            <tr key={cam.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-4 pl-4"><input type="checkbox" className="rounded border-gray-300 text-blue-500 focus:ring-0" /></td>

              {/* Name Column */}
              <td className="py-4 px-2">
                <div className="flex items-start gap-3">
                  <div className={`mt-1.5 w-2.5 h-2.5 rounded-full ${cam.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <div className="font-medium text-gray-800 flex items-center gap-2">
                      {cam.name}
                      {cam.hasWarning && <AlertCircle className="w-4 h-4 text-orange-400" />}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{cam.sub}</div>
                  </div>
                </div>
              </td>

              {/* Health Column */}
              <td className="py-4 px-2">
                <div className="flex items-center gap-4">
                  {cam.health && cam.health.cloud && <HealthGrade grade={cam.health.cloud} type="cloud" />}
                  {cam.health && cam.health.device && <HealthGrade grade={cam.health.device} type="device" />}
                  {!cam.health && <span className="text-gray-300 text-xs">-</span>}
                </div>
              </td>

              <td className="py-4 px-2 text-gray-600">{cam.location}</td>
              <td className="py-4 px-2 text-gray-600">{cam.recorder}</td>
              <td className="py-4 px-2 text-gray-600">{cam.tasks}</td>

              {/* Status Badge */}
              <td className="py-4 px-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${cam.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {cam.status}
                </span>
              </td>

              {/* Actions */}
              <td className="py-4 px-2">
                <div className="flex items-center justify-center gap-3">
                  {/* Status Toggle */}
                  <button onClick={() => onUpdateStatus(cam.id, cam.status)} title="Toggle Status">
                    {cam.status === 'Inactive' ? (
                      <CheckCircle2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-green-600 transition-colors" />
                    ) : (
                      <Ban className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
                    )}
                  </button>

                  {/* Delete Button */}
                  <button onClick={() => onDelete(cam.id)} title="Delete Camera">
                    <Trash2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-600 transition-colors" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CameraTable;