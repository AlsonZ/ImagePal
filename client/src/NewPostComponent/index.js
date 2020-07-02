import React, { useState, useContext } from 'react';
import imageCompression from 'browser-image-compression';
import {UserContext} from '../Contexts/UserContext';
import './style.css';

const NewPost = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [fileName, setFileName] = useState("Choose File");
  const [inputFile, setInputFile] = useState('');
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    if(e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setInputFile(e.target.files[0]);
    }
  }
  // move this into handle image change so it is a preview? as right now its on update
  const compressImage = async () => {
    console.log(`orignal file size ${inputFile.size/1024/1024}`); 
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 960,
      useWebWorker: true,
    }
    try {
      const cFile = await imageCompression(inputFile, options);
      console.log(`new file size ${cFile.size/1024/1024}`);
      let oFReader = new FileReader();
      oFReader.readAsDataURL(cFile);
      oFReader.onload = (oFREvent) => {
        setImage(oFREvent.target.result);
      }
      return cFile;
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();
    let file = await compressImage();
    console.log(file.name);
    if(file.size > inputFile.size) {
      file = inputFile;
    }
    let data = new FormData();
    data.append('file', file);
    data.append('fileName', file.name);
    data.append('uploadedBy', user);
    data.append('uploadedAt', Date());
    // console.log(...data);
    // data.append('upload_preset', 'imagepal');
    const url = '/API/posts/upload';
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    })
    const resData = await res.json();
    // setImage(resData.secure_url);

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
        <div className="img-parent">
          <img src={image}/>
        </div>
      </div>
    </div>
  );
}

export default NewPost;