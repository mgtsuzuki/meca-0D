import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';

const PATH = '/users/api';
const PARAM_KEYWORD = 'keywords=';
const PARAM_PAGE = 'page=';

function App() {
    const [hits, setHits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    
    async function fetchData(page) {
        setIsLoading(true);
        const result = await axios(`${PATH}?${PARAM_KEYWORD}${'J'}&${PARAM_PAGE}${page}`,);
        setHits([...hits,...result.data]);
        setPage(page);
        setIsLoading(false);
    }

    useEffect(() => {    
        fetchData(0);
    }, []);

    return (
    <section className="search-results">
        <header>
            <h1 className="h3">Results</h1>
        </header>
        <ol className="list-group">
            {hits.map(user => (
                <li className="list-group-item">
                    <h3 className="float-right">
                        <small className="text-uppercase">Joined </small>
                        {user.created_at}
                    </h3>
                    <h2 className="h3">{user.first_name} {user.last_name}</h2>
                    <h4>{user.email}</h4>
                </li>
            ))}
        </ol>
        {isLoading ?
            <div>Loading ...</div> :
            <button className="btn btn-primary btn-lg" onClick={() => fetchData(page + 1)}>
                More
            </button>
        }
    </section>
    );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
