import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './style.css';

const NewPost = (props) => {

  const [fileName, setFileName] = useState("Choose File");
  const [file, setFile] = useState('');
  // const [compressedFile, setCompressedFile] = useState('');
  const [image, setImage] = useState('');
  const [image2, setImage2] = useState('');

  const handleImageChange = (e) => {
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
  }

  const compressImage = async () => {
    console.log(`orignal file size ${file.size/1024/1024}`); 
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    }
    try {
      const cFile = await imageCompression(file, options);
      // setCompressedFile(cFile);
      console.log(`new file size ${cFile.size/1024/1024}`);
      let oFReader = new FileReader();
      oFReader.readAsDataURL(cFile);
      oFReader.onload = (oFREvent) => {
        setImage2(oFREvent.target.result);
      }
      return cFile;
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const compressedFile = await compressImage();
    console.log(compressedFile.name);
    let data = new FormData();
    data.append('file', file);
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
            <input type="file" accept="image/*" className="file-input" onChange={handleImageChange}/>
          </label>
          <input type="submit" className="button" value="Upload" onClick={handleImageUpload}/>
        </form>
        <div>
          <img src={image}/>
          <img src={image2}/>
        </div>
      </div>
    </div>
  );
}

export default NewPost;