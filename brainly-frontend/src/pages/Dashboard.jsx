import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaShareAlt } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import Card from "../components/Card";
import AddContentModal from "../components/AddContentModal";
import axios from "../axios";
import useAuth from "../context/UserContext";
import ShareLinkModal from "../components/ShareLinkModal";


const Dashboard = () => {
  let { token } = useAuth();
  const [selectedType, setSelectedType] = useState("document");
  const [contentList, setContentList] = useState([]);
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

  const getContentList = async () => {
    try {
      setLoading(true);
      let res = await axios.get("/content", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setContentList(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContentList();
  }, []);

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
              onClick={handleShare}
            >
              <FaShareAlt /> Share
            </button>
            <button
              type="submit"
              className="px-2 py-1 rounded-sm cursor-pointer flex items-center gap-2 border-2 border-slate-200"
              onClick={() => setShowModal(!showModal)}
            >
              {" "}
              <IoAddOutline /> Add content
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {contentList.map((item) => (
                <Card {...item} />
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
