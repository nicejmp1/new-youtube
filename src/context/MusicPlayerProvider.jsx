import React, { createContext, useEffect, useState } from 'react';

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
    const [musicData, setMusicData] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedMusicData = localStorage.getItem('musicData');
                if (savedMusicData) {
                    setMusicData(JSON.parse(savedMusicData));
                } else {
                    const response = await fetch(`/data/Jungmin.json`);
                    const data = await response.json();
                    setMusicData(data);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (musicData.length > 0) {
            localStorage.setItem('musicData', JSON.stringify(musicData));
        }
    }, [musicData]);

    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
        setPlayed(0);
    };

    const pauseTrack = () => {
        setIsPlaying(false);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (isShuffling ? Math.floor(Math.random() * musicData.length) : (prevIndex + 1) % musicData.length));
        setIsPlaying(true);
        setPlayed(0);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length);
        setIsPlaying(true);
        setPlayed(0);
    };

    const updatePlayed = (played) => {
        setPlayed(played);
    };

    const updateDuration = (duration) => {
        setDuration(duration);
    };

    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    };

    const toggleRepeat = () => {
        setIsRepeating(!isRepeating);
    };

    const handleTrackEnd = () => {
        if (isRepeating) {
            setPlayed(0);
            setIsPlaying(true);
        } else {
            nextTrack();
        }
    };

    const addTrackToList = (track) => {
        setMusicData((prevMusicData) => [track, ...prevMusicData]);
    };

    const addTrackToEnd = (track) => {
        setMusicData((prevMusicData) => [...prevMusicData, track]);
    };

    const removeTrack = (index) => {
        setMusicData((prevMusicData) => prevMusicData.filter((_, i) => i !== index));
    };

    return (
        <MusicPlayerContext.Provider
            value={{
                musicData,
                currentTrackIndex,
                isPlaying,
                played,
                duration,
                isShuffling,
                isRepeating,
                playTrack,
                pauseTrack,
                prevTrack,
                nextTrack,
                updatePlayed,
                updateDuration,
                toggleShuffle,
                toggleRepeat,
                handleTrackEnd,
                addTrackToList,
                addTrackToEnd,
                removeTrack
            }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

export default MusicPlayerProvider;
