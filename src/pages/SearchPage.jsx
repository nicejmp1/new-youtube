import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MdOutlinePlayCircleFilled, MdFormatListBulletedAdd, MdHive } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import Modal from '../components/Modal';

const SearchPage = () => {
    const { searchKeyword } = useParams();
    const { addTrackToList, addTrackToEnd, playTrack } = useContext(MusicPlayerContext);
    const [youtubeResults, setYoutubeResults] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState(searchKeyword);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        q: searchKeyword,
                        type: 'video',
                        videoCategoryId: '10', // 음악 카테고리 ID
                        maxResults: 10,
                        key: process.env.REACT_APP_YOUTUBE_API_KEY,
                    },
                });

                // 결과 필터링: 채널 이름 또는 제목에 특정 키워드가 포함된 경우만 유지
                const filteredResults = response.data.items.filter(item => {
                    const title = item.snippet.title.toLowerCase();
                    const channelTitle = item.snippet.channelTitle.toLowerCase();
                    return title.includes('music') || channelTitle.includes('music') || channelTitle.includes('official');
                });

                setYoutubeResults(filteredResults);
                setSelectedTitle(searchKeyword);
            } catch (error) {
                console.error('YouTube 검색에 실패했습니다.', error);
            }
        };

        fetchData();
    }, [searchKeyword]);

    const handlePlayNow = (result) => {
        const newTrack = {
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
        };
        addTrackToList(newTrack);
        toast.success('현재 음악을 재생시켰습니다.');
        playTrack(0);
    };

    const handleAddToList = (result) => {
        const newTrack = {
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
        };
        addTrackToEnd(newTrack);
        toast.success('리스트에 추가했습니다.');
    };

    const handleAddToPlaylistClick = (result) => {
        setSelectedTrack({
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
        });
        setIsModalOpen(true);
    };
    const handleAddToPlaylist = (playlistId) => {
        const playlist = JSON.parse(localStorage.getItem(playlistId));
        if (playlist && selectedTrack) {
            playlist.items.push(selectedTrack);
            localStorage.setItem(playlistId, JSON.stringify(playlist));
        }
    };

    return (
        <div className="search-page">
            <h1>🧑🏻‍💻 👉 "{selectedTitle}"에 대한 유튜브 검색 결과입니다.</h1>
            {youtubeResults.length > 0 ? (
                <ul>
                    {youtubeResults.map((result, index) => (
                        <li key={index}>
                            <span className="img" style={{ backgroundImage: `url(${result.snippet.thumbnails.default.url})` }}></span>
                            <span className="title">{result.snippet.title}</span>
                            <span className="playNow" onClick={() => handlePlayNow(result)}>
                                <MdOutlinePlayCircleFilled /><span className='ir'>노래듣기</span>
                            </span>
                            <span className="listAdd" onClick={() => handleAddToList(result)}>
                                <MdFormatListBulletedAdd /><span className='ir'>리스트 추가하기</span>
                            </span>
                            <span className="chartAdd" onClick={() => handleAddToPlaylistClick(result)}>
                                <MdHive /><span className='ir'>나의 리스트에 추가하기</span>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
            <ToastContainer />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddToPlaylist={handleAddToPlaylist}
            />
        </div>
    );
};

export default SearchPage;
