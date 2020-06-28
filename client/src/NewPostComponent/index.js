import React, { useState } from 'react';
import './style.css';
import { setRandomFallback } from 'bcryptjs';

const NewPost = (props) => {

  const [fileName, setFileName] = useState("Choose File");
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');

  const showName = (e) => {
    setFileName(e.target.files[0].name);
    setFile(e.target.files);
  }
  const uploadImage = async (e) => {
    e.preventDefault();
    console.log(file[0].name);
    let data = new FormData();
    data.append('file', file[0]);
    data.append('upload_preset', 'imagepal');
    const url = '';//check .env file for url
    const res = await fetch(url, {
      method: 'POST',
      body: data
    })
    const resData = await res.json();
    setImage(resData.secure_url);

  }

  return (
    <div className="new-post-parent">
      <div className="new-post">
        <h1>Create New Post</h1>
        <form>
          {/* mabe need to add an upload icon here */}
          <label className="custom-file-input">
            <span className="file-name">{fileName}</span>
            <span className="browse">Browse</span>
            <input type="file" className="file-input" onChange={showName}/>
          </label>
          <input type="submit" className="button" value="Upload" onClick={uploadImage}/>
        </form>
        <div>
          <img src={image}/>
        </div>
      </div>
    </div>
  );
}

export default NewPost;