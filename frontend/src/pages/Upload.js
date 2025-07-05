import { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

export default function Upload() {
  const [image, setImage]     = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');
  const fileInputRef          = useRef();
  const navigate               = useNavigate();
  const { token }             = useContext(AuthContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setMessage('Only image files are allowed.');
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !caption.trim()) {
      setMessage('Please select an image and enter a caption.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption.trim());

    try {
      await axios.post(
        'http://localhost:5000/api/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('✅ Post uploaded!');
      setImage(null);
      setPreview('');
      setCaption('');
      navigate('/posts');
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed. Try again.');
    }
  };

  return (
    <div className="upload-wrapper">
      <form className="upload-card" onSubmit={handleSubmit}>
        <h2 className="upload-title">Share a New Photo</h2>

        <div
          className={`dropzone ${preview ? 'with-preview' : ''}`}
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="preview-img" />
          ) : (
            <p>Click or drag & drop to upload</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <textarea
          className="caption-input"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button type="submit" className="upload-button">
          Post
        </button>

        {message && <p className="upload-message">{message}</p>}
      </form>
    </div>
);
}