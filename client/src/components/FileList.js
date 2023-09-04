import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FileList() {

  const [filesList, setFilesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    const resp = await fetch('/api/files');
    const resp1 = await resp.json();
    setFilesList(resp1?.files || [])
    console.log('resp1', resp1);
  }


  return (
    <div className='file-name-div-container'>
      {
        filesList.map((file, index) => {
          const urlPath = `/video/${encodeURIComponent(file.name)}`;
          return (
            <div className='file-name-div' key={file.name} onClick={() => navigate(urlPath)}>
              <span>{filesList.length - index}</span>
              <div className='title'>{file.name}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default FileList