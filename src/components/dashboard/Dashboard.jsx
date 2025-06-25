import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiLogOut, FiUser, FiActivity, FiUsers, FiShoppingCart, FiPackage } = FiIcons;

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mr-3">
                <SafeIcon icon={FiActivity} className="text-white text-lg" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Ultramed</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <SafeIcon icon={FiUser} className="mr-2" />
                {user.email}
              </div>
              <button
                onClick={onLogout}
                className="flex items-center text-sm text-gray-700 hover:text-teal-600 transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <SafeIcon icon={FiUsers} className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <SafeIcon icon={FiActivity} className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Visits</p>
                  <p className="text-2xl font-bold text-gray-900">42</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <SafeIcon icon={FiShoppingCart} className="text-purple-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Sales Today</p>
                  <p className="text-2xl font-bold text-gray-900">₿15,420</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <SafeIcon icon={FiPackage} className="text-orange-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-gray-900">7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Welcome back! 👋
            </h3>
            <p className="text-gray-600">
              You're logged in as <strong>{user.email}</strong>. This is your clinic dashboard where you can manage patients, appointments, inventory, and more.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;