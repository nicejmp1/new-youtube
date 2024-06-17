import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MdOutlinePlayCircleFilled, MdFormatListBulletedAdd, MdHive } from 'react-icons/md';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import { toast } from 'react-toastify';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  const { addTrackToList, addTrackToEnd, playTrack } = useContext(MusicPlayerContext);

  useEffect(() => {
    const fetchLatestMusicVideos = async () => {
      const cachedVideos = localStorage.getItem('latestMusicVideos');
      if (cachedVideos) {
        setVideos(JSON.parse(cachedVideos));
      } else {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const formattedDate = oneMonthAgo.toISOString();

        try {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
              params: {
                part: 'snippet',
                maxResults: 5,
                q: '최신',
                type: 'video',
                key: process.env.REACT_APP_YOUTUBE_API_KEY,
                publishedAfter: formattedDate,
              },
            }
          );
          const videos = response.data.items;
          setVideos(videos);
          localStorage.setItem('latestMusicVideos', JSON.stringify(videos));
        } catch (error) {
          console.error('Error fetching latest music videos:', error);
        }
      }
    };

    const fetchRecommendedVideos = async () => {
      const cachedRecommendedVideos = localStorage.getItem('recommendedVideos');
      if (cachedRecommendedVideos) {
        setRecommendedVideos(JSON.parse(cachedRecommendedVideos));
      } else {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
              params: {
                part: 'snippet',
                maxResults: 5,
                q: '추천 음악',
                type: 'video',
                key: process.env.REACT_APP_YOUTUBE_API_KEY,
              },
            }
          );
          const videos = response.data.items;
          setRecommendedVideos(videos);
          localStorage.setItem('recommendedVideos', JSON.stringify(videos));
        } catch (error) {
          console.error('Error fetching recommended videos:', error);
        }
      }
    };

    fetchLatestMusicVideos();
    fetchRecommendedVideos();
  }, []);

  const handlePlayNow = (video) => {
    const newTrack = {
      title: video.snippet.title,
      videoID: video.id.videoId,
      imageURL: video.snippet.thumbnails.default.url,
      artist: video.snippet.channelTitle,
      rank: 1
    };
    addTrackToList(newTrack);
    playTrack(0);
    toast.success('현재 음악을 재생시켰습니다.');
  };

  const handleAddToList = (video) => {
    const newTrack = {
      title: video.snippet.title,
      videoID: video.id.videoId,
      imageURL: video.snippet.thumbnails.default.url,
      artist: video.snippet.channelTitle,
      rank: 1
    };
    addTrackToEnd(newTrack);
    toast.success('리스트에 추가했습니다.');
  };

  const handleAddToPlaylistClick = (video) => {
    const newTrack = {
      title: video.snippet.title,
      videoID: video.id.videoId,
      imageURL: video.snippet.thumbnails.default.url,
      artist: video.snippet.channelTitle,
      rank: 1
    };
    const playlistId = 'myPlaylist';
    const playlist = JSON.parse(localStorage.getItem(playlistId)) || { items: [] };
    playlist.items.push(newTrack);
    localStorage.setItem(playlistId, JSON.stringify(playlist));
    toast.success('나만의 리스트에 추가했습니다.');
  };

  return (
    <div className='main__info'>
      <h1>최신음악</h1>
      <div className="video_list">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.channelTitle}</p>
            <div className="video-actions">
              <span onClick={() => handlePlayNow(video)}>
                <MdOutlinePlayCircleFilled /><span className='ir'>노래듣기</span>
              </span>
              <span onClick={() => handleAddToList(video)}>
                <MdFormatListBulletedAdd /><span className='ir'>리스트 추가하기</span>
              </span>
              <span onClick={() => handleAddToPlaylistClick(video)}>
                <MdHive /><span className='ir'>나의 리스트에 추가하기</span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2>추천리스트</h2>
      <div className="video_list">
        {recommendedVideos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.channelTitle}</p>
            <div className="video-actions">
              <span onClick={() => handlePlayNow(video)}>
                <MdOutlinePlayCircleFilled /><span className='ir'>노래듣기</span>
              </span>
              <span onClick={() => handleAddToList(video)}>
                <MdFormatListBulletedAdd /><span className='ir'>리스트 추가하기</span>
              </span>
              <span onClick={() => handleAddToPlaylistClick(video)}>
                <MdHive /><span className='ir'>나의 리스트에 추가하기</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
