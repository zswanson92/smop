import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';


interface BlogPost {
  id: number;
  title: string;
  content: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const { isAdmin } = useAuth();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';


  useEffect(() => {
    fetch(`${backendUrl}/api/blog`)
      .then((response) => response.json())
      .then(setPosts)
      .catch((error) => console.error('Error fetching blog posts:', error));
  }, []);

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: 'title' | 'content') => {
    if (field === 'title') {
      setEditTitle(e.target.value);
    } else {
      setEditContent(e.target.value);
    }
  };

  const handleUpdate = async (postId: number) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${postId}`, {
        method: 'PUT', // Assuming your API uses PUT for updates
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts => posts.map(post => post.id === postId ? updatedPost : post));
        setEditingId(null); // Reset editing state
        alert('Post updated successfully');
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('An error occurred');
    }
  };



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
        setTitle('');
        setContent('');
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

  const handleDelete = async (postId: number) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPosts(posts => posts.filter(post => post.id !== postId));
        alert('Post deleted successfully');
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred');
    }
  };


  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen blog-container bg-gray-900">
        <h1 className='flex justify-center'>Blog Posts</h1>
        {isAdmin && (
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
        )}
        <div className="posts-display">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              {editingId === post.id ? (
                <>
                  <input value={editTitle} onChange={(e) => handleEditChange(e, 'title')} />
                  <textarea value={editContent} onChange={(e) => handleEditChange(e, 'content')} />
                  <button onClick={() => handleUpdate(post.id)} style={{ padding: '0.5rem', fontWeight: 'bold', backgroundColor: 'green', fontSize: '18px', borderRadius: '10px' }}>Save Changes</button>
                </>
              ) : (
                <>
                  <h2 style={{ padding: '0.5rem', fontWeight: 'bold', color: 'gold', fontSize: '50px' }} className='flex justify-center'>{post.title}</h2>
                  <p style={{ fontSize: '25px', marginBottom: '10px' }}>{post.content}</p>
                  {isAdmin && (
                    <>
                      <button onClick={() => handleEdit(post)} style={{ padding: '0.5rem', fontWeight: 'bold', backgroundColor: 'yellow', fontSize: '18px', borderRadius: '10px', marginRight: '10px' }}>Edit Post</button>
                      <button onClick={() => handleDelete(post.id)} style={{ padding: '0.5rem', fontWeight: 'bold', backgroundColor: 'red', fontSize: '18px', borderRadius: '10px' }}>Delete Post</button>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
