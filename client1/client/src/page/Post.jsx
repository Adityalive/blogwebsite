import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post =  () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();  
 
  useEffect(()=>{
     const fetchpost =async ()=>{
      try {
          setLoading(true)
          const postdata =await axios.get("http://localhost:3000/posts/all");
            setPosts(postdata.data);
            setError('');
      } catch (err) {
          console.error("Fetch error:", err);
          setError('Failed to fetch posts. Please check the server and network connection.'); 
      }
      finally{
          setLoading(false)
      }
     }
     fetchpost();
  },[])

  // Function to generate a simple avatar background color based on the username's first letter
  const getAvatarColor = (username) => {
    const charCode = username.toUpperCase().charCodeAt(0);
    // Simple hash to generate a color index (0-7)
    const colorIndex = charCode % 8; 
    const colors = [
      'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 
      'bg-indigo-400', 'bg-purple-400', 'bg-pink-400', 'bg-teal-400'
    ];
    return colors[colorIndex];
  };
  
  return (
    // Main Container: Added padding, light background, and minimum height
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header and Actions */}
        <div className="flex justify-between items-center mb-10 border-b pb-4">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Community Posts</h1>
            <div className="space-x-4 flex items-center">
                <button
                    onClick={() => navigate('/create')}
                    // Create Button: Elevated, rounded, and uses a primary color
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition duration-150 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Create New Post
                </button>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/');
                    }}
                    // Logout Button: Secondary, clean style
                    className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition duration-150 ease-in-out"
                >
                    Logout
                </button>
            </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading posts...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md text-center">
            <p className="font-semibold">{error}</p>
          </div>
        )}
        
        {/* Main Content */}
        {!loading && !error && (
            <div className="space-y-6">
                {posts.length === 0 ? (
                  // Empty State
                  <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">No Posts Found</h2>
                    <p className="text-gray-500 mb-6">Start by creating the first post!</p>
                    <button
                      onClick={() => navigate('/create')}
                      className="bg-indigo-500 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-600 transition"
                    >
                      Create Post Now
                    </button>
                  </div>
                ) : (
                  posts.map((post) => (
                      // Post Card: White background, large rounded corners, elevated shadow, and hover effect
                      <div key={post._id} 
                        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-[1.01]"
                      >
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-3 leading-snug">{post.title}</h2>
                            {/* Truncate content for a cleaner card view */}
                            <p className="text-gray-600 mb-5 line-clamp-3">{post.content}</p>
                            
                            {/* Author Info with Avatar */}
                            <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${getAvatarColor(post.author.username)}`}>
                                {post.author.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Posted by</p>
                                <p className="text-sm font-semibold text-gray-800">{post.author.username}</p>
                              </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}
      </div>
    </div>
  )
 }
 
export default Post