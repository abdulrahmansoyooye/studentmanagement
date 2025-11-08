import React from "react";
import post from "../../assets/post.webp";

const LatestNews = () => {
  const news = [
    {
      title: "First Inaugural Lecture",
      location: "Newgate University, Minna, Nigeria",
      image: post,
    },
    {
      title: "Student Innovation Fair 2025",
      location: "Main Auditorium, Minna Campus",
      image: "https://source.unsplash.com/featured/?university,event",
    },
    {
      title: "Scholarship Awards Ceremony",
      location: "Multipurpose Hall, Minna Campus",
      image: "https://source.unsplash.com/featured/?graduation,students",
    },
  ];

  return (
    <div className="p-6 w-full bg-gray-50 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Latest News from Newgate University
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
