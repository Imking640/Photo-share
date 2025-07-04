// src/pages/Feed.js
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to load posts:', err);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div style={styles.feedContainer}>
      <h2 style={styles.heading}>📸 Photo Feed</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={styles.card}>
            <img src={post.imageUrl} alt="upload" style={styles.image} />
            <p style={styles.caption}><strong>Caption:</strong> {post.caption}</p>
            <p style={styles.meta}>🧑‍💻 by {post.author?.name || 'Unknown'} — {new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  feedContainer: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  caption: {
    marginTop: '10px',
    fontSize: '16px',
  },
  meta: {
    marginTop: '5px',
    fontSize: '13px',
    color: '#666',
  },
};