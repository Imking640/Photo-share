import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Upload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !caption) {
      setMessage('Please select an image and enter a caption.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('✅ Post uploaded!');
      setImage(null);
      setCaption('');
    } catch (err) {
      setMessage('❌ Upload failed. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Upload a New Photo</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={styles.captionInput}
        />
        <button type="submit" style={styles.button}>Post</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      {image && (
        <div style={styles.preview}>
          <p>Preview:</p>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={styles.imagePreview}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '500px', margin: '30px auto', textAlign: 'center' },
  heading: { marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  fileInput: { padding: '8px', borderRadius: '5px' },
  captionInput: { padding: '8px', borderRadius: '5px' },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  message: { marginTop: '15px', color: '#333' },
  preview: { marginTop: '20px' },
  imagePreview: { maxWidth: '100%', borderRadius: '8px' }
};