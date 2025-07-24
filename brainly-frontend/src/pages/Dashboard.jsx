import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaShareAlt } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import Card from "../components/Card";

const SkeletonCard = () => (
  <div className="bg-white rounded shadow p-4 sm:p-6 flex flex-col w-full max-w-xs mx-auto animate-pulse">
    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
    <div className="h-40 sm:h-64 w-full bg-gray-100 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);
import AddContentModal from "../components/AddContentModal";
import axios from "../axios";
import useAuth from "../context/UserContext";
import ShareLinkModal from "../components/ShareLinkModal";
import { IoIosLogOut } from "react-icons/io";

const Dashboard = () => {
  let { token,logout } = useAuth();
  const [selectedType, setSelectedType] = useState("all");
  const [contentList, setContentList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleAddContent = async (content) => {
    setShowModal(false);
    let res = await axios.post(
      "/content",
      { ...content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setContentList((prev) => [...prev, res.data]);
  };

  const [allContent, setAllContent] = useState([]);

  const getContentList = async () => {
    try {
      setLoading(true);
      let res = await axios.get("/content", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllContent(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  

  useEffect(() => {
    getContentList();
  }, []);

  useEffect(() => {
    if (selectedType === "all") {
      setContentList(allContent);
    }else {
      setContentList(allContent.filter(content => content.type === selectedType));
    }
  }, [selectedType, allContent]);

  const handleShare = async () => {
    try {
      let res = await axios.post(
        "/brain/share",
        { share: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShareLink(`http://localhost:5173/brain/share/${res.data.hash}`);
      setShowShareModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar selectedType={selectedType} onSelectType={setSelectedType} />
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold capitalize text-center md:text-left">
            {selectedType} Content
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
              onClick={handleShare}
            >
              <FaShareAlt /> <span className="hidden sm:inline">Share</span>
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded cursor-pointer flex items-center justify-center gap-2 border-2 border-slate-200 w-full sm:w-auto"
              onClick={() => setShowModal(!showModal)}
            >
              <IoAddOutline /> <span className="hidden sm:inline">Add content</span>
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded cursor-pointer flex items-center justify-center gap-2 bg-red-500 text-white w-full sm:w-auto"
              onClick={logout}
            >
              <IoIosLogOut/> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
          ) : (
            <>
              {contentList?.map((item) => (
                <Card {...item} key={item._id}/>
              ))}
            </>
          )}
        </div>
      </main>
      <AddContentModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddContent}
        selectedType={selectedType}
      />
      <ShareLinkModal
        open={showShareModal}
        link={shareLink}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
};

export default Dashboard;
