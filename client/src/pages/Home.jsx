import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, PlayCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Master New Skills <br />
            <span className="text-primary">Advance Your Career</span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Access high-quality courses from industry experts. Learn at your own pace and build a portfolio-ready project today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/courses" className="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center">
              Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/signup" className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-all">
              Start for Free
            </Link>
          </div>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Expert Instructors", desc: "Learn from industry professionals with real-world experience.", icon: <User /> },
            { title: "Self-Paced Learning", desc: "Watch lessons anytime, anywhere. Lifetime access to courses.", icon: <PlayCircle /> },
            { title: "Certificate of Completion", desc: "Earn certificates to showcase your skills on LinkedIn.", icon: <CheckCircle /> }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-4">
                {feature.icon === <User /> ? <CheckCircle className="h-6 w-6" /> : feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-dark rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to start your journey?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">Join thousands of students learning specific skills to upgrade their careers.</p>
            <Link to="/signup" className="inline-block px-8 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
              Join for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper for icon fallback
const User = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

export default Home;
