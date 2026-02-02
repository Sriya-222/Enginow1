import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data } = await axios.get('/api/enrollments/me');
        setEnrollments(data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-500">Track your learning progress and upcoming lessons.</p>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.length > 0 ? (
            enrollments.map((enrollment) => (
              <div key={enrollment._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200 relative">
                  {enrollment.course.thumbnailUrl && (
                    <img 
                      src={enrollment.course.thumbnailUrl} 
                      alt={enrollment.course.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Link 
                      to={`/courses/${enrollment.course.slug}`}
                      className="px-6 py-2 bg-white text-gray-900 rounded-full font-bold text-sm transform hover:scale-105 transition-transform"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">{enrollment.course.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>In Progress</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div 
                      className="bg-secondary h-2 rounded-full" 
                      style={{ width: `${(enrollment.completedLessons.length / 5) * 100}%` /* Mock calculation */ }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{enrollment.completedLessons.length} lessons completed</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No enrollments yet</h3>
              <p className="text-gray-500 mb-6">Start your learning journey by exploring our courses.</p>
              <Link to="/courses" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
