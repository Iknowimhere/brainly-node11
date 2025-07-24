
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import axios from "../axios";
import { useParams } from "react-router-dom";

const ShareableDashboard = () => {
  const [selectedType, setSelectedType] = useState("document");
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sharedUser, setSharedUser] = useState(null);


  const { hash } = useParams();

  const getSharedContent = async () => {
    if (!hash) return;
    try {
      setLoading(true);
      let res = await axios.get(`/brain/share/${hash}`);
      setContentList(res.data.content || []);
      setSharedUser(res.data.userId?.username || null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setContentList([]);
    }
  };

  useEffect(() => {
    getSharedContent();
    // eslint-disable-next-line
  }, [hash]);

  // Filter content by selectedType
  const filteredContent = contentList.filter(item => item.type === selectedType);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar selectedType={selectedType} onSelectType={setSelectedType} />
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold capitalize text-center md:text-left">
            {selectedType} Content
            {sharedUser && (
              <span className="ml-4 text-base font-normal text-gray-500">Shared by: {sharedUser}</span>
            )}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredContent.length > 0 ? (
              filteredContent.map((item) => <Card key={item._id || item.id} {...item} />)
            ) : (
              <p>No content found.</p>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default ShareableDashboard;
