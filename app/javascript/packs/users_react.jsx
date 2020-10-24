import React, { Component } from 'react';
import ReactDOM from 'react-dom'

const PATH = '/users';
const PARAM_KEYWORD = 'keywords=';
const PARAM_PAGE = 'page=';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hits: [],
            page: 0,
            searchTerm: '',
            isLoading: true
        };
        this.fetchData = this.fetchData.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onMoreClick = this.onMoreClick.bind(this);
      }

    fetchData(page = 0) {
        this.setState({isLoading: true})
        fetch(`${PATH}?${PARAM_KEYWORD}${this.state.searchTerm}&${PARAM_PAGE}${page}`)
        .then(response => response.json())
        .then(result => this.setState( prevState => {
            const updatedHits = page === 0 ? result : [...prevState.hits,...result]
            return {
                hits: updatedHits,
                page: page,
                isLoading: false
            };
        }))
        .catch(error => error);
    }

    componentDidMount() {    
        this.fetchData();
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    onSearchSubmit(event) {
        this.fetchData();
        event.preventDefault();
    }

    onMoreClick() {
        this.fetchData(this.state.page + 1)
    }

    render() {
        const {hits, searchTerm, isLoading} = this.state;
        return (
            <div>
                {/* Search form - should be its own component */}
                <header>
                    <h1 className="h2">User Search</h1>
                </header>
                <section className="search-form">
                    <form onSubmit={ this.onSearchSubmit }>
                        <div className="input-group input-group-lg">
                            <label className="sr-only">Keywords</label>
                            <input type="text" placeholder="First Name, Last Name, or Email Address" className="form-control input-lg"
                                value={searchTerm}
                                onChange={this.onSearchChange}
                            />
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Find Customers
                                </button>
                            </span>
                        </div>
                    </form>
                </section>

                {/* Results listing - should be its own component */}
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
                </section>
                { isLoading ?
                    <div>Loading ...</div> :
                    <button className="btn btn-primary btn-lg" onClick={this.onMoreClick}>
                        More
                    </button>
                }
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
