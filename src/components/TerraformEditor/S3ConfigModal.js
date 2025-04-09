// src/components/TerraformEditor/S3ConfigModal.js
import React, { useState } from "react";

const S3ConfigModal = ({ config, onConfigChange, visible, onClose }) => {
  // Move the useState hook before any conditional returns
  const [localConfig, setLocalConfig] = useState({ ...config });

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onConfigChange(localConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-white">
          S3 Configuration
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              AWS Region
            </label>
            <input
              type="text"
              name="region"
              value={localConfig.region}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-accent-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Bucket Name
            </label>
            <input
              type="text"
              name="bucketName"
              value={localConfig.bucketName}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-accent-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Prefix (Folder Path)
            </label>
            <input
              type="text"
              name="prefix"
              value={localConfig.prefix}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-accent-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-accent-500 hover:bg-accent-600 text-white py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default S3ConfigModal;
