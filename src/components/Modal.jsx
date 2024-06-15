import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, onAddToPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const count = Number(localStorage.getItem('playlistCount')) || 0;
      const loadedPlaylists = [];
      for (let i = 1; i <= count; i++) {
        const playlistKey = `playlist${i}`;
        const playlist = JSON.parse(localStorage.getItem(playlistKey));
        if (playlist) {
          loadedPlaylists.push(playlist);
        }
      }
      setPlaylists(loadedPlaylists);
    }
  }, [isOpen]);

  const handleAddClick = (playlist) => {
    onAddToPlaylist(playlist.id);
    toast.success(`${playlist.name}리스트에 추가하였습니다.`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}><MdClose /></span>
        <h2>플레이리스트 선택</h2>
        <ul>
          {playlists.map((playlist, index) => (
            <li key={playlist.id}>
              <span>{index + 1}. {playlist.name}</span>
              <button className='modal-button' onClick={() => handleAddClick(playlist)}>추가</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
