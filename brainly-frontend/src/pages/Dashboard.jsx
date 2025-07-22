import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaShareAlt } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";

const placeholderContent = {
  document: [
    { id: 1, title: "Sample Document 1", link: "#" },
    { id: 2, title: "Sample Document 2", link: "#" },
  ],
  video: [
    { id: 1, title: "Sample Video 1", link: "#" },
    { id: 2, title: "Sample Video 2", link: "#" },
  ],
  audio: [
    { id: 1, title: "Sample Audio 1", link: "#" },
    { id: 2, title: "Sample Audio 2", link: "#" },
  ],
  twitter: [
    { id: 1, title: "Sample Tweet 1", link: "#" },
    { id: 2, title: "Sample Tweet 2", link: "#" },
  ],
};

const Dashboard = () => {
  const [selectedType, setSelectedType] = useState("document");
  const contentList = placeholderContent[selectedType] || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar selectedType={selectedType} onSelectType={setSelectedType} />
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold capitalize">
            {selectedType} Content
          </h1>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-2 py-1 rounded-sm cursor-pointer flex items-center gap-2"
            >
              <FaShareAlt /> Share
            </button>
            <button
              type="submit"
              className="px-2 py-1 rounded-sm cursor-pointer flex items-center gap-2 border-2 border-slate-200"
            >
              {" "}
              <IoAddOutline /> Add content
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contentList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded shadow p-6 flex flex-col"
            >
              <span className="text-lg font-semibold mb-2">{item.title}</span>
              <div className="h-64 w-64 bg-amber-100">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/x78KpaMu-zQ?si=kx7oN74nK7aNXZBr"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                  className="w-full h-auto"
                >
                  {" "}
                </iframe>
              </div>
              <a href={item.link} className="text-blue-500 hover:underline">
                Click on this
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
