import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';

function VideoItem({ file, pathtype }) {
  console.log('File: ', file)
  const navigate = useNavigate();
  const filePath = `/api/videoplayer/${file.name}/paths/${pathtype}`
  const { height, width } = useWindowDimensions();



  async function handleDelete() {
    const isConfirm = window.confirm("Are you sure whant to delete?");
    if (isConfirm) {
      try {
        let resp = await fetch(`/api/delete/${file.name}`, {
          method: 'DELETE'
        });
        resp = await resp.json();
        navigate('/')
        alert(resp?.message);
      } catch (error) {
        alert(error?.message)
      }

    }
  }

  async function handleUnzip() {
    try {
      let resp = await fetch(`/api/unzip/${file.name}`)
      resp = await resp.json();
      navigate('/')
      alert(resp?.message);
    } catch (error) {
      alert(error?.message)
    }
  }


  return (
    <div>
      {/* <h3>{fileName}</h3> */}
      {/* <div className='video-item-button-group'>
        <button className='btn btn-danger' onClick={() => handleDelete()}>Delete</button>
        <button className='btn btn-primary' onClick={() => handleUnzip()}>Unzip</button>
      </div> */}
      <video src={filePath} controls width={'100%'} height={height-30} muted />
    </div>
  )
}

export default VideoItem
