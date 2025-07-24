import { useState } from "react";


const AddContentModal = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
   const [type, setType] = useState("");
   const [tag, setTag] = useState("");
  const [types, setTypes] = useState(["audio","video","document","twitter"]);



  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, link, tag, type });
    setTitle("");
    setLink("");
    setTag("");
    setType("")
  };

  return (
    <div className="fixed inset-0 bg-slate-300 bg-opacity-25 flex items-center justify-center z-50 px-2">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Content</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-4">
          <input
            className="border px-2 py-2 rounded text-sm sm:text-base"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="border px-2 py-2 rounded text-sm sm:text-base"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
           <input
            className="border px-2 py-2 rounded text-sm sm:text-base"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
          <select
            className="border px-2 py-2 rounded text-sm sm:text-base"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContentModal;