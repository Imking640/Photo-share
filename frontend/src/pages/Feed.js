// src/pages/Feed.js
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css'; // contains your .feed-*, .message-*, and new .post-actions styles

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentOpen, setCommentOpen] = useState({});       // { postId: true }
  const [commentText, setCommentText] = useState({});       // { postId: '...' }
  const { token, user } = useContext(AuthContext);

  // Fetch feed
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/posts',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(data);
      } catch (err) {
        console.error('Failed to load posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [token]);

  // Like handler
  const handleLike = async postId => {
    try {
      await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Optimistically update like count
      setPosts(posts =>
        posts.map(p =>
          p._id === postId
            ? { ...p, likeCount: (p.likeCount || 0) + 1 }
            : p
        )
      );
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  // Toggle comment section
  const toggleComment = postId => {
    setCommentOpen(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Submit comment
  const submitComment = async (e, postId) => {
    e.preventDefault();
    const text = commentText[postId]?.trim();
    if (!text) return;
    try {
      await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Clear input and close
      setCommentText(prev => ({ ...prev, [postId]: '' }));
      setCommentOpen(prev => ({ ...prev, [postId]: false }));
      // Optionally, you could re-fetch or append comment to local state
    } catch (err) {
      console.error('Comment failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="feed-wrapper">
        <p style={{ color: '#fff', textAlign: 'center' }}>Loading…</p>
      </div>
    );
  }

  return (
    <div className="feed-wrapper">
      <div className="feed-container">
        {/* Upload link */}
        <Link to="/upload" className="upload-link">
          + Upload a Picture
        </Link>

        {posts.map(post => {
          const authorName = post.author?.name || 'Unknown';
          const isMine     = user?.name && authorName === user.name;
          const sideClass  = isMine ? 'right' : '';

          return (
            <div key={post._id} className={`message-card ${sideClass}`}>
              <div className="message-username">{authorName}</div>

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.caption || 'Post'}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    margin: '8px 0',
                    objectFit: 'cover'
                  }}
                />
              )}

              {post.caption && (
                <div className="message-content">{post.caption}</div>
              )}

              {/* Like & Comment Actions */}
              <div className="post-actions">
                <button
                  className="action-btn like-btn"
                  onClick={() => handleLike(post._id)}
                >
                  👍 {post.likeCount || 0}
                </button>
                <button
                  className="action-btn comment-btn"
                  onClick={() => toggleComment(post._id)}
                >
                  💬 {post.commentCount || 0}
                </button>
              </div>

              {/* Comment Input */}
              {commentOpen[post._id] && (
                <form
                  className="comment-form"
                  onSubmit={e => submitComment(e, post._id)}
                >
                  <input
                    type="text"
                    className="comment-input"
                    placeholder="Write a comment…"
                    value={commentText[post._id] || ''}
                    onChange={e =>
                      setCommentText(prev => ({
                        ...prev,
                        [post._id]: e.target.value
                      }))
                    }
                  />
                  <button type="submit" className="comment-submit">
                    Post
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}