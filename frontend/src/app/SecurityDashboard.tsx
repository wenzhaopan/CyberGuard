"use client";

import React, { useState, useEffect } from "react";
import { Shield, ExternalLink, X, AlertTriangle } from "lucide-react";

interface NewsItem {
  id: string | number;
  headlines: string;
  fullNews: string;
  summary?: string;
  preventionTips?: string[];
  threatLevel?: 'low' | 'medium' | 'high';
  newsDate?: string;
  newsImgURL?: string;
  newsURL?: string;
  author?: string;
}

const SecurityDashboard: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [activeNewsType, setActiveNewsType] = useState<string>("cyberAttack");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const newsCategories = [
    { id: "cyberAttack", label: "Cyber Attacks", icon: Shield },
    { id: "dataBreach", label: "Data Breaches", icon: AlertTriangle },
    { id: "vulnerability", label: "Vulnerabilities", icon: AlertTriangle },
    { id: "malware", label: "Malware", icon: Shield },
  ];

  const getDefaultPreventionTips = (category: string) => {
    const tips = {
      dataBreach: [
        "Use strong, unique passwords for all accounts",
        "Enable two-factor authentication when available",
        "Monitor your accounts for suspicious activity",
        "Regularly check for data breaches involving your information"
      ],
      cyberAttack: [
        "Keep all software and systems up to date",
        "Use reliable antivirus software",
        "Be cautious with unexpected emails and links",
        "Regularly backup important data"
      ],
      vulnerability: [
        "Apply security patches promptly",
        "Regularly update all software and systems",
        "Use security best practices in configurations",
        "Monitor security advisories for your systems"
      ],
      malware: [
        "Don't click on suspicious links or downloads",
        "Use reliable antivirus software",
        "Keep your operating system updated",
        "Be careful when downloading software"
      ]
    };
    return tips[category as keyof typeof tips] || tips.cyberAttack;
  };

  const getThreatLevelColor = (level?: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const processNewsData = (data: NewsItem[]) => {
    const getRandomThreatLevel = () => {
      const levels = ['high', 'medium', 'low'];
      return levels[Math.floor(Math.random() * levels.length)];
    };
  
    return data.map(news => ({
      ...news,
      summary: news.summary || news.fullNews?.slice(0, 150) + '...',
      threatLevel: news.threatLevel || getRandomThreatLevel(),
      preventionTips: news.preventionTips || getDefaultPreventionTips(activeNewsType),
    }));
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/${activeNewsType}News`,
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setNewsData(processNewsData(data));
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeNewsType]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNews(null);
      }
    };

    if (selectedNews) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedNews]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                Cyber Threat Monitor & Prevention
              </h1>
              <p className="text-blue-200 text-sm">
                Learn about current threats and how to protect yourself
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-xl font-semibold text-black">
                Latest Cyber Threats
              </h2>
              <div className="flex flex-wrap gap-2">
                {newsCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveNewsType(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeNewsType === category.id
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading threat data...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            ) : newsData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">No threats reported in this category</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newsData.map((news) => (
                  <div
                    key={news.id}
                    className="border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedNews(news)}
                  >
                    {news.newsImgURL && (
                      <div className="h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={news.newsImgURL}
                          alt={news.headlines}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThreatLevelColor(news.threatLevel)}`}>
                          {(news.threatLevel || 'MEDIUM')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {news.newsDate !== "N/A" ? news.newsDate : "Recent"}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-black mb-2 line-clamp-2">
                        {news.headlines}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                        {news.summary || news.fullNews}
                      </p>
                      <span className="text-blue-600 text-sm">Click to learn prevention tips →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedNews && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-black pr-4">
                    {selectedNews.headlines}
                  </h2>
                  <span className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${getThreatLevelColor(selectedNews.threatLevel)}`}>
                    {(selectedNews.threatLevel || 'MEDIUM')} threat
                  </span>
                </div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="p-1 hover:bg-gray-100 rounded-full text-black"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {selectedNews.newsImgURL && (
                <img
                  src={selectedNews.newsImgURL}
                  alt={selectedNews.headlines}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-black mb-2">Threat Summary</h3>
                <p className="text-gray-700">{selectedNews.summary || selectedNews.fullNews}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-black mb-2">Prevention Tips</h3>
                <ul className="space-y-2">
                  {(selectedNews.preventionTips || getDefaultPreventionTips(activeNewsType)).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                <div>
                  {selectedNews.newsDate !== "N/A" && (
                    <span className="mr-4">{selectedNews.newsDate}</span>
                  )}
                  {selectedNews.author !== "N/A" && <span>{selectedNews.author}</span>}
                </div>
                {selectedNews.newsURL && (
                  <a
                    href={selectedNews.newsURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Full details <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityDashboard;