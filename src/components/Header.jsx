import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FcRating, FcPlus, FcApproval, FcDeleteDatabase } from "react-icons/fc";
import { IoMusicalNotes } from "react-icons/io5";
import { toast } from 'react-toastify';

const Header = () => {
  const [showInput, setShowInput] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [playlistCount, setPlaylistCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem('playlistCount') || 0;
    setPlaylistCount(Number(count)); // 숫자로 변환하여 설정
  }, []);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleCancelClick = () => {
    setNewItem('');
    setShowInput(false);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      const newCount = playlistCount + 1;
      const playlistKey = `playlist${newCount}`;
      const newPlaylist = {
        id: playlistKey,
        name: newItem,
        items: []
      };

      localStorage.setItem(playlistKey, JSON.stringify(newPlaylist));
      localStorage.setItem('playlistCount', newCount.toString());
      setPlaylistCount(newCount);
      setNewItem('');
      toast.success(`${newPlaylist.name} 리스트를 추가하였습니다.`);
      setShowInput(false);
    }
  };

  const handleDeleteClick = (playlistId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      handleDeleteItem(playlistId);
    }
  };

  const handleDeleteItem = (playlistId) => {
    if (!playlistId) return;

    localStorage.removeItem(playlistId);
    const newCount = playlistCount - 1;
    setPlaylistCount(newCount);

    for (let i = parseInt(playlistId.replace('playlist', ''), 10); i < playlistCount; i++) {
      const currentKey = `playlist${i + 1}`;
      const newKey = `playlist${i}`;
      const playlistData = localStorage.getItem(currentKey);
      localStorage.setItem(newKey, playlistData);
    }

    localStorage.removeItem(`playlist${playlistCount}`);
    localStorage.setItem('playlistCount', newCount.toString());

    toast.success('플레이리스트가 삭제되었습니다.');
  };

  const playlistLinks = [];
  for (let i = 1; i <= playlistCount; i++) {
    const playlistKey = `playlist${i}`;
    const playlist = JSON.parse(localStorage.getItem(playlistKey) || "{}");
    if (playlist.name) {
      playlistLinks.push(
        <li key={i} className="playlist-item">
          <Link to={`/playlist/${playlistKey}`}><span className='icon2'><FcApproval /></span>{playlist.name}
            <button onClick={() => handleDeleteClick(playlistKey)} className="delete-button"><FcDeleteDatabase /></button>
          </Link>

        </li>
      );
    }
  }

  return (
    <header id='header' role='banner'>
      <h1 className='logo'>
        <Link to='/'><IoMusicalNotes />Music Chart</Link>
      </h1>
      <h2>chart</h2>
      <ul>
        {['melon', 'bugs', 'apple', 'genie', 'billboard'].map(chart => (
          <li key={chart}><Link to={`chart/${chart}`}><span className='icon'></span><span>{`${chart}`}</span>Top100</Link></li>
        ))}
      </ul>
      <h2>playlist</h2>
      <ul>
        <li><Link to='/mymusic'><span className='icon2'><FcRating /></span>Mymusic</Link></li>
        {playlistLinks}
        <li>
          {showInput ? (
            <div className='playList__but'>
              <input
                type='text'
                value={newItem}
                onChange={handleInputChange}
                placeholder="리스트이름"
              />
              <button onClick={handleAddItem}>추가</button>
              <button onClick={handleCancelClick}>취소</button>
            </div>
          ) : (
            <>
              <Link to='#' onClick={handleAddClick}><span className='icon2'><FcPlus /></span>Create</Link>
            </>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
