import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MdOutlinePlayCircleFilled, MdFormatListBulletedAdd, MdHive } from 'react-icons/md';
import { MusicPlayerContext } from '../context/MusicPlayerProvider'; // MusicPlayerContext를 사용하여 플레이어 컨트롤러 가져오기
import { toast } from 'react-toastify'; // 알림 기능 추가

const Home = () => {
  // 상태 변수
  const [videos, setVideos] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  const { addTrackToList, addTrackToEnd, playTrack } = useContext(MusicPlayerContext); // 컨텍스트에서 플레이어 기능 가져오기

  // 캐시 키 및 캐시 시간 키
  const latestMusicCacheKey = 'latestMusicVideos';
  const latestMusicCacheTimeKey = 'latestMusicCacheTime';
  const recommendedCacheKey = 'recommendedVideos';
  const recommendedCacheTimeKey = 'recommendedCacheTime';

  // 캐시 지속 시간 (24시간)
  const cacheDuration = 24 * 60 * 60 * 1000; // 24시간 (밀리초 단위)

  useEffect(() => {
    // 최신 음악 비디오를 가져오는 함수
    const fetchLatestMusicVideos = async () => {
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
              q: '최신 음악',
              type: 'video',
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
              publishedAfter: formattedDate,
            },
          }
        );
        const videos = response.data.items;
        setVideos(videos);

        // 캐시에 저장
        localStorage.setItem(latestMusicCacheKey, JSON.stringify(videos));
        localStorage.setItem(latestMusicCacheTimeKey, Date.now().toString());
      } catch (error) {
        console.error('Error fetching latest music videos:', error);
      }
    };

    // 추천 비디오를 가져오는 함수
    const fetchRecommendedVideos = async () => {
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

        // 캐시에 저장
        localStorage.setItem(recommendedCacheKey, JSON.stringify(videos));
        localStorage.setItem(recommendedCacheTimeKey, Date.now().toString());
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      }
    };

    // 캐시된 최신 음악 비디오 데이터 가져오기
    const cachedLatestMusicVideos = localStorage.getItem(latestMusicCacheKey);
    const latestMusicCacheTime = localStorage.getItem(latestMusicCacheTimeKey);

    // 캐시된 추천 비디오 데이터 가져오기
    const cachedRecommendedVideos = localStorage.getItem(recommendedCacheKey);
    const recommendedCacheTime = localStorage.getItem(recommendedCacheTimeKey);

    // 최신 음악 비디오 캐시 유효성 검사 및 데이터 가져오기
    if (cachedLatestMusicVideos && latestMusicCacheTime && Date.now() - parseInt(latestMusicCacheTime, 10) < cacheDuration) {
      setVideos(JSON.parse(cachedLatestMusicVideos));
    } else {
      fetchLatestMusicVideos();
    }

    // 추천 비디오 캐시 유효성 검사 및 데이터 가져오기
    if (cachedRecommendedVideos && recommendedCacheTime && Date.now() - parseInt(recommendedCacheTime, 10) < cacheDuration) {
      setRecommendedVideos(JSON.parse(cachedRecommendedVideos));
    } else {
      fetchRecommendedVideos();
    }
  }, [cacheDuration]);

  // 재생 버튼 클릭 시 호출되는 함수
  const handlePlayNow = (video) => {
    const newTrack = {
      title: video.snippet.title,
      videoID: video.id.videoId,
      imageURL: video.snippet.thumbnails.default.url,
      artist: video.snippet.channelTitle,
      rank: 1 // 초기 rank 설정
    };
    addTrackToList(newTrack);
    playTrack(0);
    toast.success('현재 음악을 재생시켰습니다.');
  };

  // 리스트에 추가 버튼 클릭 시 호출되는 함수
  const handleAddToList = (video) => {
    const newTrack = {
      title: video.snippet.title,
      videoID: video.id.videoId,
      imageURL: video.snippet.thumbnails.default.url,
      artist: video.snippet.channelTitle,
      rank: 1 // 초기 rank 설정
    };
    addTrackToEnd(newTrack);
    toast.success('리스트에 추가했습니다.');
  };

  // 나만의 리스트에 추가 버튼 클릭 시 호출되는 함수
  const handleAddToPlaylistClick = (video) => {
    const newTrack = {
      title: video.snippet.title,
      videoID: video.id.videoId,
      imageURL: video.snippet.thumbnails.default.url,
      artist: video.snippet.channelTitle,
      rank: 1 // 초기 rank 설정
    };
    const playlistId = 'myPlaylist'; // 예제용 리스트 ID
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
