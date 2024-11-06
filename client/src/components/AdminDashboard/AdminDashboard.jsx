import React from 'react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col p-5">
        <h1 className="text-3xl font-extrabold mb-10 text-center">Admin Panel</h1>
        <nav className="flex-1">
          <ul className="space-y-6 text-lg font-semibold">
            <li>
              <Link to="#" className="block p-3 rounded-md hover:bg-secondary">
                Overview
              </Link>
            </li>
            <li>
              <Link to="#" className="block p-3 rounded-md hover:bg-secondary">
                Counselors
              </Link>
            </li>
            <li>
              <Link to="#" className="block p-3 rounded-md hover:bg-secondary">
                Student
              </Link>
            </li>
            <li>
              <Link to="#" className="block p-3 rounded-md hover:bg-secondary">
                Book Library
              </Link>
            </li>
          </ul>
        </nav>
        <button className="mt-10 bg-secondary text-black font-medium p-2 rounded-md">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-primary">Dashboard</h2>
          <button className="bg-secondary text-black px-4 py-2 rounded-md">
            Create New
          </button>
        </header>

        {/* Content Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overview of Counselor */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Overview of Counselor</h3>
            <p className="text-lg text-primary">Manage counselors and view details</p>
          </div>
          {/* Delete Counselor */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Delete Counselor</h3>
            <p className="text-lg text-primary">Review and remove counselor profiles as necessary.</p>
          </div>
          {/* Student Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Student Section</h3>
            <p className="text-lg text-primary">Access and manage student information.</p>
          </div>
          {/* Book Library */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Book Library</h3>
            <p className="text-lg text-primary">Manage available resources and books for users.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
