import BrainlyLogo from "../icons/BrainlyLogo";
import { FaFileAlt, FaVideo, FaMusic, FaTwitter, FaTag } from "react-icons/fa";

const contentTypes = [
  { type: "all", label: "All", icon: <FaTag className="inline mr-2" /> },
  {
    type: "document",
    label: "Documents",
    icon: <FaFileAlt className="inline mr-2" />,
  },
  { type: "video", label: "Videos", icon: <FaVideo className="inline mr-2" /> },
  { type: "audio", label: "Audio", icon: <FaMusic className="inline mr-2" /> },
  {
    type: "twitter",
    label: "Twitter",
    icon: <FaTwitter className="inline mr-2" />,
  }
];

const Sidebar = ({ selectedType, onSelectType }) => (
  <aside className="w-full md:w-56 bg-white shadow flex flex-col items-center py-4 md:py-8 min-h-[80px] md:min-h-screen">
    <div className="mb-4 flex items-center gap-2 w-full justify-center md:justify-start">
      <span className="w-8 h-8 mb-2">
        <BrainlyLogo />
      </span>
      <span className="text-xl font-bold text-blue-600">Brainly</span>
    </div>
    <nav className="flex flex-col gap-2 md:gap-4 w-full">
      {contentTypes.map((item) => (
        <button
          key={item.type}
          className={`flex items-center gap-2 px-4 py-2 text-left w-full rounded transition-colors duration-150 ${
            selectedType === item.type
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "hover:bg-gray-100 text-gray-700"
          }`}
          onClick={() => onSelectType(item.type)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
