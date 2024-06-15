import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdClose } from 'react-icons/md';

const DeleteModal = ({ isOpen, onClose, onDeleteToPlaylist }) => {
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

    const handleDeleteClick = (playlist) => {
        onDeleteToPlaylist(playlist.id);
        toast.success(`${playlist.name} 리스트를 삭제하였습니다.`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-delete">
            <div className="modal-content">
                <span className="close" onClick={onClose}><MdClose /></span>
                <h2>플레이리스트 삭제</h2>
                <ul>
                    {playlists.map((playlist, index) => (
                        <li key={playlist.id}>
                            <span>{index + 1}. {playlist.name}</span>
                            <button className='modal-button' onClick={() => handleDeleteClick(playlist)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DeleteModal;
