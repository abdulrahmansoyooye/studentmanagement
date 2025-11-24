import React from "react";
import post from "../../assets/post.webpII.png";
import post_II from "../../assets/post.web_III.png";
import post_III from "../../assets/post.web_IV.png";
const LatestNews = () => {
  const news = [
    {
      title: "A Defining Moment in Newgate University’s History",
      location: "Newgate University, Minna, Nigeria",
      image: post,
    },
    {
      title: "Newgate University Minna Secures Full Operational Licence from NUC",
      location: "Main Auditorium, Minna Campus",
      image: post_II
    },
    {
      title: "The Pro Chancellor and Chairman, Newgate University Minna, Mall. Hassan Nuhu awarded by The Association of Medical Laboratory Scientists of Nigeria (AMLSN)",
      location: "Multipurpose Hall, Minna Campus",
      image: post_III
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
