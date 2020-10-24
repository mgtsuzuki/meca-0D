import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';

const PATH = '/users/api';
const PARAM_KEYWORD = 'keywords=';
const PARAM_PAGE = 'page=';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hits: [],
            page: 0,
            searchTerm: '',
            isBottom: false
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
      }

    async fetchData(searchTerm, page = 0, reset = false) {
        const result = await axios(`${PATH}?${PARAM_KEYWORD}${searchTerm}&${PARAM_PAGE}${page}`,);
        this.setState(prevState => { 
            const updatedHits = reset? result.data : [...prevState.hits,...result.data]
            return {
                hits: updatedHits,
                page: page,
                isBottom: false
            };
        });
    }

    handleScroll() {
        const scrollTop = (document.documentElement
          && document.documentElement.scrollTop)
          || document.body.scrollTop;
        const scrollHeight = (document.documentElement
          && document.documentElement.scrollHeight)
          || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 50 >= scrollHeight){
          this.setState({isBottom: true});
        }
    }

    componentDidMount() {    
        this.fetchData(this.state.searchTerm, this.state.page);
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isBottom !== this.state.isBottom) {
            if (this.state.isBottom) {
                this.fetchData(this.state.searchTerm, this.state.page + 1);
            }
        }
    }

    render() {
        const {hits, searchTerm} = this.state;
        return (
            <div>
                <header>
                    <h1 className="h2">User Search</h1>
                </header>
                <section className="search-form">
                    <form onSubmit={(event) => {
                        this.fetchData(searchTerm, 0, true);
                        event.preventDefault();
                    }}>
                        <div className="input-group input-group-lg">
                            <label className="sr-only">Keywords</label>
                            <input type="text" placeholder="First Name, Last Name, or Email Address" className="form-control input-lg"
                                value={searchTerm}
                                onChange={ event => {this.setState({searchTerm: event.target.value})} }
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
                </section>
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
