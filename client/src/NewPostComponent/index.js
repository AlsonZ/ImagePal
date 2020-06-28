import React, { useState } from 'react';
import './style.css';

const NewPost = (props) => {

  const [fileName, setFileName] = useState();

  const showName = (e) => {
    setFileName(e.target.files[0].name);
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
          <input type="submit" className="button" value="Upload"/>
        </form>
      </div>
    </div>
  );
}

export default NewPost;