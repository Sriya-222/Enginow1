import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash, Edit } from 'lucide-react';

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [loading, setLoading] = useState(true);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    slug: '',
    description: '',
    price: 0,
    category: '',
    difficulty: 'Beginner',
    thumbnailUrl: '',
    lessons: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const coursesRes = await axios.get('/api/courses'); // Public
      const usersRes = await axios.get('/api/auth/users'); // Admin only
      
      setCourses(coursesRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching admin data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/courses/${id}`);
        fetchData();
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      // Mock lesson for simplicity
      const courseData = {
        ...newCourse,
        lessons: [
          { title: 'Introduction', contentHtml: '<p>Welcome</p>', order: 1 }
        ]
      };
      
      await axios.post('/api/courses', courseData);
      setShowForm(false);
      fetchData();
    } catch (error) {
      alert('Failed to create course');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Admin Panel...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'courses'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Courses Management
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            User Management
          </button>
        </nav>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gra-100 mb-8">
          <h2 className="text-xl font-bold mb-4">Create New Course</h2>
          <form onSubmit={handleCreateCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Title" required
              className="p-2 border rounded"
              value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})}
            />
            <input 
              type="text" placeholder="Slug (url-friendly)" required
              className="p-2 border rounded"
              value={newCourse.slug} onChange={e => setNewCourse({...newCourse, slug: e.target.value})}
            />
            <input 
              type="text" placeholder="Category" required
              className="p-2 border rounded"
              value={newCourse.category} onChange={e => setNewCourse({...newCourse, category: e.target.value})}
            />
            <input 
              type="number" placeholder="Price" required
              className="p-2 border rounded"
              value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: Number(e.target.value)})}
            />
             <select 
              className="p-2 border rounded"
              value={newCourse.difficulty} onChange={e => setNewCourse({...newCourse, difficulty: e.target.value})}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <textarea 
              placeholder="Description" required
              className="p-2 border rounded md:col-span-2"
              value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})}
            />
            
            <div className="md:col-span-2 flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600"
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'courses' ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map(course => (
                <tr key={course._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{course.title}</div>
                    <div className="text-sm text-gray-500">${course.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDeleteCourse(course._id)} className="text-red-600 hover:text-red-900">
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
