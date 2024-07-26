import React from "react";
import game from "../../assets/game.jfif";
import post from "../../assets/post.webp";
import conference from "../../assets/conference.jfif";

const LatestNews = () => {
  const news = [
    {
      title: "FACULTY OF CIS HELD ITS FIRST INAUGURAL LECTURE",
      location: "University of Ilorin, Nigeria",
      image: game,
    },

    {
      title: "UNILORIN 2023/2024 Post-UTME FORM OUT",
      location: "University of Ilorin, Nigeria",
      image: post,
    },

    {
      title: "FACULTY OF CIS 2ND ANNUAL CONFERENCE",
      location: "University of Ilorin, Nigeria",
      image: conference,
    },
  ];

  return (
    <div className="p-4 mt-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Latest News from UNILORIN</h2>
      <div className="flex gap-4">
        {news.map((item, index) => (
          <div
            key={index}
            className="flex-1 p-4 rounded-md overflow-hidden bg-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div>
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
