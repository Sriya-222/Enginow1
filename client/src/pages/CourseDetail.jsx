import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { PlayCircle, CheckCircle, Lock, Clock, BarChart } from 'lucide-react';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/courses/${slug}`); // Backend handles slug or ID
        setCourse(data);
      } catch (err) {
        setError('Course not found');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading course...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  const handleEnroll = async () => {
    try {
      await axios.post('/api/enrollments', { courseId: course._id });
      // Redirect to dashboard on success
      window.location.href = '/dashboard';
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/courses" className="hover:text-primary">Courses</Link>
            <span>/</span>
            <span className="text-gray-900">{course.category}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-xl text-gray-500">{course.description}</p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{course.lessons.length} Lessons</span>
            </div>
            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              <span>{course.difficulty}</span>
            </div>
          </div>
        </div>
        
        {/* Enrollment Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-24">
          <div className="aspect-video bg-gray-200 rounded-lg mb-6 overflow-hidden">
             {course.thumbnailUrl && <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />}
          </div>
          
          <div className="text-3xl font-bold text-gray-900 mb-6">
            ${course.price === 0 ? 'Free' : course.price}
          </div>
          
          <button 
            onClick={handleEnroll}
            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-md mb-4"
          >
            Enroll Now
          </button>
          
          <p className="text-center text-sm text-gray-500">
            30-day money-back guarantee
          </p>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
        <div className="space-y-4">
          {course.lessons.map((lesson, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-100 transition-colors">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-50 text-primary rounded-full flex items-center justify-center mr-4 font-bold text-sm">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-700">{lesson.title}</span>
              </div>
              {index === 0 ? (
                <PlayCircle className="h-5 w-5 text-primary" />
              ) : (
                <Lock className="h-4 w-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
