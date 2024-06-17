import React, { forwardRef, useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { FcCalendar } from 'react-icons/fc';
import { MdFormatListBulletedAdd, MdOutlinePlayCircleFilled, MdDelete } from 'react-icons/md';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref}>
        <FcCalendar size={24} />
        <span>{value}</span>
    </button>
));

const PlayChart = ({ title, showCalendar, selectedDate, onDateChange, minDate, maxDate, data }) => {
    const { addTrackToList, addTrackToEnd, playTrack } = useContext(MusicPlayerContext);
    const [trackList, setTrackList] = useState(data);

    const handlePlayNow = (item) => {
        addTrackToList(item);
        playTrack(0);
        toast.success('현재 음악을 재생시켰습니다.');
    };

    const handleAddToList = (item) => {
        addTrackToEnd(item);
        toast.success('리스트에 추가했습니다.');
    };

    const handleDelete = (index) => {
        const updatedTrackList = trackList.filter((_, i) => i !== index);
        setTrackList(updatedTrackList);
        toast.success('항목이 삭제되었습니다.');
    };

    return (
        <>
            <section className='music-chart'>
                <div className="title">
                    <h2>{title}</h2>
                    {showCalendar && (
                        <div className='date'>
                            <DatePicker
                                selected={selectedDate}
                                onChange={onDateChange}
                                dateFormat="yyyy-MM-dd"
                                minDate={minDate}
                                maxDate={maxDate}
                                customInput={<CustomInput />}
                            />
                        </div>
                    )}
                </div>
                <div className="list">
                    <ul>
                        {trackList.map((item, index) => (
                            <li key={index}>
                                <span className='rank'>#{item.rank}</span>
                                <span className='img' style={{ backgroundImage: `url(${item.imageURL})` }}></span>
                                <span className='title'>{item.title}</span>
                                <span className='actions'>
                                    <MdOutlinePlayCircleFilled onClick={() => handlePlayNow(item)} /><span className='ir'>노래듣기</span>
                                    <MdFormatListBulletedAdd onClick={() => handleAddToList(item)} /><span className='ir'>리스트 추가하기</span>
                                    <MdDelete onClick={() => handleDelete(index)} /><span className='ir'>삭제하기</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default PlayChart;
