import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';


interface BlogPost {
  id: number;
  title: string;
  content: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  // State hooks for form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/blog')
      .then((response) => response.json())
      .then(setPosts)
      .catch((error) => console.error('Error fetching blog posts:', error));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch('http://localhost:5000/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts(currentPosts => [...currentPosts, newPost]);
        // Clear form fields
        setTitle('');
        setContent('');
        // Notify the user of successful submission
        // toast.success('Post created successfully');
        alert('Post created successfully');
      } else {
        // toast.error('Failed to create post');
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      // toast.error('An error occurred');
      alert('An error occurred');
    }
  };

  return (
    <>
    <Navbar />
    <div className="pt-16 blog-container">
      <h1>Blog Posts</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <button type="submit" className="submit-btn">Create Post</button>
        </form>
      </div>
      <div className="posts-display">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
