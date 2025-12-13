import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();   

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        "http://localhost:3000/posts/create",
        { title, content },
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Post created successfully, navigate back to the list
      navigate('/post');
      
    } catch (error) {
      console.error("Post creation error:", error);
      // Check if the error is due to authentication
      if (error.response && error.response.status === 401) {
        setError('You must be logged in to create a post. Redirecting...');
        // Clear token and redirect to login after a delay
        setTimeout(() => {
          localStorage.removeItem('token');
          navigate('/');
        }, 2000);
      } else {
        setError('Failed to create post. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-2xl transition duration-500 hover:shadow-3xl">
        
        {/* Header and Back Button */}
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Create New Post
          </h1>
          <button
            onClick={() => navigate('/post')}
            className="flex items-center space-x-2 text-indigo-600 font-semibold hover:text-indigo-800 transition transform hover:scale-105"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Posts</span>
          </button>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
              <input
                id="title"
                type="text"
                placeholder="A catchy title for your story"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-300 focus:shadow-md"
              />
            </div>
            
            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                id="content"
                placeholder="Share your thoughts here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows="8"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-300 focus:shadow-md"
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <p className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 font-medium animate-pulse">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className={`
                w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-white font-bold text-lg 
                transition duration-300 ease-in-out shadow-lg transform active:scale-95
                ${loading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5'
                }
              `}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <ArrowUpOnSquareIcon className="w-6 h-6" />
                  <span>Create Post</span>
                </>
              )}
            </button>
            
        </form>
    </div>
    </div>
  );
};

export default Create;