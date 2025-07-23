import React from "react";

const ShareLinkModal = ({ open, link, onClose }) => {
  if (!open) return null;

  const handleCopy = async () => {
    if (link) {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Share Link</h2>
        <div className="flex flex-col gap-4">
          <input
            className="border px-3 py-2 rounded w-full"
            value={link}
            readOnly
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white"
              onClick={handleCopy}
            >
              Copy Link
            </button>
            <button
              className="px-4 py-2 rounded bg-gray-200"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;