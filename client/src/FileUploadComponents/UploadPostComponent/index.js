import React, { useState, useContext } from 'react';
import imageCompression from 'browser-image-compression';
import {UserContext} from '../../Contexts/UserContext';
import './style.css';

const UploadPost = (props) => {

  const title = props.title;
  const [user] = useContext(UserContext);
  const [fileName, setFileName] = useState("Choose File");
  const [inputFile, setInputFile] = useState('');
  const [compressedFile, setCompressedFile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState('');
  const url = props.url;
  const postID = props.postID ? props.postID : '';
  const commentID = props.commentID ? props.commentID : '';

  const handleImageChange = (e) => {
    if(e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setInputFile(e.target.files[0]);
    }
  }
  const showImagePreview = (compressedFile) => {
    let oFReader = new FileReader();
    oFReader.readAsDataURL(compressedFile);
    oFReader.onload = (oFREvent) => {
      setImage(oFREvent.target.result);
    }
  }
  const compressImage = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 960,
      useWebWorker: true,
    }
    try {
      const cFile = await imageCompression(inputFile, options);
      showImagePreview(cFile);
      setCompressedFile(cFile);
      return cFile;
    } catch (error) {
      setErrorMessage('Failure to Compress File, Please try again later')
    }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();
    let file = compressedFile ? compressedFile : await compressImage();
    if(!file) {
      setErrorMessage('Please choose a file to upload')
      return;
    }
    if((file.size > inputFile.size)) {
      file = inputFile;
    }
    let data = new FormData();
    data.append('file', file);
    data.append('fileName', file.name);
    data.append('author', user.username);
    data.append('postID', postID);
    data.append('commentID', commentID);
    data.append('uploadedAt', Date());
    
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    })
    const resData = await res.json();
    if(res.status === 200 || res.status === 201) {
      props.onSuccess(resData);
    } else if(res.status === 403 || res.status === 401 || res.status === 400) {
      setErrorMessage(resData);
    } else {
      setErrorMessage('Failure to edit or create post or comment')
    }
  }

  const handlePreview = async (e) => {
    e.preventDefault();
    if(compressedFile) {
      //image is already shown so do nothing
    } else {
      let file = await compressImage();
      if(!file) {
        setErrorMessage('Please choose a file to upload')
      }
    }
  }

  

  return (
    <div className="upload-post-parent">
      <div className="upload-post">
        <h1>{title}</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form>
          {/* mabe need to add an upload icon here */}
          <label className="custom-file-input">
            <span className="file-name">{fileName}</span>
            <span className="browse">Browse</span>
            <input type="file" accept="image/*" className="file-input" onChange={handleImageChange}/>
          </label>
          <div className="button-parent">
            <input type="submit" className="button" value="Upload" onClick={handleImageUpload}/>
            <input type="submit" className="button" value="Preview" onClick={handlePreview}/>
          </div>
        </form>
        <div className="img-parent">
          <img src={image}/>
        </div>
      </div>
    </div>
  );
}

export default UploadPost;