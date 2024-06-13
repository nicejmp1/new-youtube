import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FcRating, FcPlus, FcApproval } from "react-icons/fc";
import { IoMusicalNotes } from "react-icons/io5";

const Header = () => {
  const [showInput, setShowInput] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [playlistCount, setPlaylistCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem('playlistCount') || 0;
    setPlaylistCount(Number(count));
  }, []);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
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
      setShowInput(false);
    }
  };

  const handleDeleteItem = (playlistId) => {
    if (!playlistId) return; // 삭제할 ID가 없을 경우 함수 종료

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
  };

  const playlistLinks = [];
  for (let i = 1; i <= playlistCount; i++) {
    const playlistKey = `playlist${i}`;
    const playlist = JSON.parse(localStorage.getItem(playlistKey));
    playlistLinks.push(
      <li key={i}>
        <Link to={`/playlist/${playlistKey}`}><span className='icon2'><FcApproval /></span>{playlist.name}</Link>
      </li>
    );
  }

  return (
    <header id='header' role='banner'>
      <h1 className='logo'>
        <Link to='/'><IoMusicalNotes />나의 뮤직 챠트</Link>
      </h1>
      <h2>chart</h2>
      <ul>
        {['melon', 'bugs', 'apple', 'genie', 'billboard'].map(chart => (
          <li key={chart}><Link to={`chart/${chart}`}><span className='icon'></span>{`${chart} 챠트`}</Link></li>
        ))}
      </ul>
      <h2>playlist</h2>
      <ul>
        <li><Link to='/mymusic'><span className='icon2'><FcRating /></span>Mymusic</Link></li>
        {playlistLinks}
        <li>
          {showInput ? (
            <div>
              <input
                type='text'
                value={newItem}
                onChange={handleInputChange}
              />
              <button onClick={handleAddItem}>Add</button>
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
