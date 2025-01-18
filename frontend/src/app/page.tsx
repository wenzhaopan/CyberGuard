import React from 'react';
import { Shield, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

const SecurityDashboard = () => {
  const currentThreats = [
    {
      severity: "Critical",
      title: "Phishing Campaign Targeting Online Banking",
      description: "Active phishing campaign detected mimicking RBC login pages. Customers reporting suspicious emails claiming account suspension.",
      affectedSystems: ["Online Banking", "Mobile App"],
      timeDetected: "2 hours ago",
      status: "Active"
    },
    {
      severity: "High",
      title: "Credential Stuffing Attempts",
      description: "Increased automated login attempts detected across digital banking platforms. Potentially compromised credentials being tested.",
      affectedSystems: ["Authentication Systems"],
      timeDetected: "5 hours ago",
      status: "Monitoring"
    },
    {
      severity: "Medium",
      title: "Mobile Banking Vulnerability",
      description: "Security patch required for iOS banking app version 2.1.0. Update available in App Store.",
      affectedSystems: ["iOS App"],
      timeDetected: "1 day ago",
      status: "Patched"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">RBC Security Dashboard</h1>
                <p className="text-blue-200 text-sm">Cybersecurity Threat Monitor</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-blue-800 rounded-full px-4 py-1">
                <Clock className="h-4 w-4 text-blue-200 mr-2" />
                <span className="text-blue-200 text-sm">Last updated: Just now</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Threat Summary Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Threats</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Systems Affected</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Resolution Time</p>
                  <p className="text-2xl font-bold text-gray-900">4.2 hrs</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Active Threats List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Active Security Threats</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {currentThreats.map((threat, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                            {threat.severity}
                          </span>
                          <span className="text-sm text-gray-500">{threat.timeDetected}</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{threat.title}</h3>
                        <p className="text-gray-600">{threat.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-sm text-gray-500">Affected Systems:</span>
                          <div className="flex gap-2">
                            {threat.affectedSystems.map((system, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                {system}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${
                        threat.status === 'Active' ? 'text-red-600' :
                        threat.status === 'Monitoring' ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {threat.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecurityDashboard;
