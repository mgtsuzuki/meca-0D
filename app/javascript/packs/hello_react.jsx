import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';

const PATH = '/users/api';
const PARAM_KEYWORD = 'keywords=';
const PARAM_PAGE = 'page=';

function App() {
    const [hits, setHits] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isBottom, setIsBottom] = useState(false);

    async function fetchData(searchTerm, page = 0, reset = false) {
        // setIsLoading(true);
        const result = await axios(`${PATH}?${PARAM_KEYWORD}${searchTerm}&${PARAM_PAGE}${page}`,);
        setHits(reset? result.data : [...hits,...result.data]);
        setPage(page);
        // setIsLoading(false);
        setIsBottom(false);
    }

    useEffect(() => {    
        fetchData(searchTerm, page);
    }, []);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    function handleScroll() {
        const scrollTop = (document.documentElement
          && document.documentElement.scrollTop)
          || document.body.scrollTop;
        const scrollHeight = (document.documentElement
          && document.documentElement.scrollHeight)
          || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 50 >= scrollHeight){
          setIsBottom(true);
        }
    }

    useEffect(() => {
        if (isBottom) {
            fetchData(searchTerm, page + 1);
        }
    }, [isBottom]);

    return (
        <div>
            <header>
                <h1 className="h2">User Search</h1>
            </header>
            <section className="search-form">
                <form onSubmit={(event) => {
                    fetchData(searchTerm, 0, true);
                    event.preventDefault();
                }}>
                    <div className="input-group input-group-lg">
                        <label className="sr-only">Keywords</label>
                        <input type="text" placeholder="First Name, Last Name, or Email Address" className="form-control input-lg"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Find Customers
                            </button>
                        </span>
                    </div>
                </form>
            </section>
            <section className="search-results">
                <header>
                    <h1 className="h3">Results</h1>
                </header>
                <ol className="list-group">
                    {hits.map(user => (
                        <li className="list-group-item" key={user.id}>
                            <h3 className="float-right">
                                <small className="text-uppercase">Joined </small>
                                {user.created_at.slice(0,10)}
                            </h3>
                            <h2 className="h3">{user.first_name} {user.last_name}</h2>
                            <h4>{user.email}</h4>
                        </li>
                    ))}
                </ol>
                {/* {isLoading ?
                    <div>Loading ...</div> :
                    <button className="btn btn-primary btn-lg" onClick={() => fetchData(searchTerm, page + 1)}>
                        More
                    </button>
                } */}
            </section>
        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
