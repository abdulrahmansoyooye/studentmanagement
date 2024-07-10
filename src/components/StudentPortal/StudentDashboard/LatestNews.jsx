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
    <div className="p-4  mt-4">
      <h2 className="text-xl font-semibold mb-4">Latest News from UNILORIN</h2>
      <div className="flex  max-lg:flex-col gap-[1rem]">
        {news.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-md overflow-hidden bg-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="">
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
