import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Star } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course.slug}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {course.thumbnailUrl ? (
          <img 
            src={course.thumbnailUrl} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-primary">
            <BookOpen className="h-12 w-12 opacity-50" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-700 shadow-sm">
          ${course.price === 0 ? 'Free' : course.price}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
            course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {course.difficulty}
          </span>
          <span className="text-xs text-gray-500 font-medium">{course.category}</span>
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-50">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{course.lessons?.length || 0} Lessons</span>
          </div>
          <div className="flex items-center">
            {/* Placeholder for rating */}
            <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
            <span>4.8</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
