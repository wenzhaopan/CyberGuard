import React from 'react';
import { Clock, Bookmark, Share2 } from 'lucide-react';

const NewsPage = () => {
  const featuredNews = {
    title: "Major Breakthrough in Renewable Energy Storage",
    category: "Technology",
    image: "/api/placeholder/800/400",
    summary: "Scientists develop new battery technology that could revolutionize renewable energy storage, making solar and wind power more viable than ever.",
    author: "Sarah Chen",
    readTime: "6 min read",
    date: "Jan 18, 2025"
  };

  const newsItems = [
    {
      title: "Global Economy Shows Signs of Recovery",
      category: "Business",
      image: "/api/placeholder/400/200",
      summary: "Markets rally as new economic indicators point to strong recovery across major economies.",
      author: "Michael Roberts",
      readTime: "4 min read",
      date: "Jan 18, 2025"
    },
    {
      title: "New AI Model Makes Breakthrough in Medical Research",
      category: "Science",
      image: "/api/placeholder/400/200",
      summary: "Revolutionary AI system helps identify potential treatments for rare diseases.",
      author: "Dr. Emily Wilson",
      readTime: "5 min read",
      date: "Jan 18, 2025"
    },
    {
      title: "Space Tourism Company Announces First Commercial Flight",
      category: "Space",
      image: "/api/placeholder/400/200",
      summary: "Private space company sets date for first civilian orbital journey.",
      author: "James Thompson",
      readTime: "3 min read",
      date: "Jan 18, 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Global News</h1>
            <nav className="space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Latest</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Politics</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Tech</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Science</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Article */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-96" src={featuredNews.image} alt="Featured news" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {featuredNews.category}
              </div>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {featuredNews.title}
              </h2>
              <p className="mt-4 text-gray-500">
                {featuredNews.summary}
              </p>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <span className="sr-only">{featuredNews.author}</span>
                  <img className="h-10 w-10 rounded-full bg-gray-200" src="/api/placeholder/40/40" alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{featuredNews.author}</p>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredNews.readTime}
                    </span>
                    <span>{featuredNews.date}</span>
                  </div>
                </div>
                <div className="ml-auto flex space-x-4">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="h-48 w-full object-cover" src={news.image} alt={news.title} />
              <div className="p-6">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {news.category}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {news.title}
                </h3>
                <p className="mt-3 text-gray-500">
                  {news.summary}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>{news.author}</span>
                    <span className="mx-1">·</span>
                    <span>{news.readTime}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-500">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewsPage;