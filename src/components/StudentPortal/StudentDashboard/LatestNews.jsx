import React from "react";

const LatestNews = () => {
  const news = [
    {
      title: "UNILORIN Admission List 2023/2024 Released",
      location: "University of Ilorin, Nigeria",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "New Academic Session Resumption Announced",
      location: "University of Ilorin, Nigeria",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "UNILORIN Post-UTME Results Released",
      location: "University of Ilorin, Nigeria",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="p-4 bg-white shadow-lg mt-4">
      <h2 className="text-xl font-semibold mb-4">Latest News from UNILORIN</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {news.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
