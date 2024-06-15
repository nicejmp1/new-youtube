import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        console.log(searchKeyword);
        if (searchKeyword) {
            navigate(`/search/${searchKeyword}`);
            setSearchKeyword('');
        }
    }

    return (
        <article className="search">
            <label htmlFor="searchInput">
                <LuSearch />
            </label>
            <input
                type="text"
                placeholder="검색하기"
                id="searchInput"
                autoComplete="off"
                onChange={e => setSearchKeyword(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
        </article>
    );
};

export default Search;
