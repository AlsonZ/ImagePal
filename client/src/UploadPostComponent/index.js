import React, { useState, useContext } from 'react';
import imageCompression from 'browser-image-compression';
import {UserContext} from '../Contexts/UserContext';
import './style.css';

const UploadPost = (props) => {

  const title = props.title ? props.title : 'Create New Post'
  const [user] = useContext(UserContext);
  const [fileName, setFileName] = useState("Choose File");
  const [inputFile, setInputFile] = useState('');
  const [compressedFile, setCompressedFile] = useState('');
  const [image, setImage] = useState('');
  const url = props.url;
  // const url = '/API/posts/upload';
  const postID = props.postID ? props.postID : '';
  const commentID = props.commentID ? props.commentID : '';
  // const onSuccess = props.onSuccess ? props.onSuccess : ()=>{};

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
    // console.log(`orignal file size ${inputFile.size/1024/1024}`); 
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 960,
      useWebWorker: true,
    }
    try {
      const cFile = await imageCompression(inputFile, options);
      // console.log(`new file size ${cFile.size/1024/1024}`);
      showImagePreview(cFile);
      setCompressedFile(cFile);
      return cFile;
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();
    let file = compressedFile ? compressedFile : await compressImage();
    // let file = await compressImage();
    // console.log(file.name);
    if(file.size > inputFile.size) {
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
    console.log(resData);
    if(res.status === 200) {
      props.onSuccessfulEdit();
    } else if (res.status === 201) {
      // redirect to post page
      props.onSuccess(resData);
    }
  }

  const handlePreview = async (e) => {
    e.preventDefault();
    if(compressedFile) {
      //image is already shown
    } else {
      await compressImage();
    }
    // const file = compressedFile ? compressedFile : await compressImage(); 
  }

  

  return (
    <div className="upload-post-parent">
      <div className="upload-post">
        <h1>{title}</h1>
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