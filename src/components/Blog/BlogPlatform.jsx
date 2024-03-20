import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPlatform.css'; 
import { API_BASE_URL } from '../../config';
import { useSnackbar } from 'notistack';
import  dummyPhotoURL from "../../not-available.jpg"
import { Link, useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');

const BlogPlatform = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate(); 
   
    const [blogs, setBlogs] = useState([]);
    const [newBlogTitle, setNewBlogTitle] = useState('');
    const [newBlogContent, setNewBlogContent] = useState('');

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            if (!token) {
                console.error('Token not found');
                return;
            }
  
            const url = `${API_BASE_URL}/blog`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            };
   
            const response = await axios.get(url, config);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleCreateBlog = async () => {
        try {
            if (!token) {
                console.error('Token not found');
                return;
            }
            if (!newBlogTitle.trim()) {
                enqueueSnackbar('Title cannot be empty', { variant: 'error' });
                return;
            }
            const response = await axios.post(`${API_BASE_URL}/blog`, {
                title: newBlogTitle,
                content: newBlogContent,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });

            console.log(response.data)
            setBlogs([...blogs, response.data]);
            setNewBlogTitle('');
            setNewBlogContent('');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };
    
    const handleDeleteBlog = async (id) => {
        try {
            if (!token) {
                console.error('Token not found');
                return;
            }
      
            await axios.delete(`${API_BASE_URL}/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            enqueueSnackbar('Deleted Successfully', { variant: 'success' });
            setBlogs(blogs.filter((blog) => blog._id !== id));

        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };
    const handleLogin = () => {
        navigate('/login'); // Redirect to login page
    };

    const handleRegister = () => {
        navigate('/register'); // Redirect to register page
    };

    return (
        <div className='platformContainer'>
        <div className="header">
            <h1 >Blog Platform</h1>
            <div className="topBar">
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
            <div className="container">
                <div className="createBlogSection">
                    <h2>Create New Blog</h2>
                    <input
                        type="text"
                        value={newBlogTitle}
                        onChange={(e) => setNewBlogTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <textarea
                        value={newBlogContent}
                        onChange={(e) => setNewBlogContent(e.target.value)}
                        placeholder="Content"
                    />
                    <button onClick={handleCreateBlog}>Create Blog</button>
                </div>
                <div className="blogListSection">
               
                    {blogs.length === 0 ? (
                        <div className="noPostAvailable">
                            <img  src={dummyPhotoURL} alt="No Posts" />
                            
                        </div>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog._id} className="blogItem">
                                <h3>{blog.title}</h3>
                                <p>{blog.content}</p>
                                <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPlatform;
