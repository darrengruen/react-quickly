import { ajax } from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'

const App = React.createClass({
    getInitialState: ()=>({
        result: [],
    }),

    onSearchResult: function(data) {
        this.setState({result: data})
    },

    render: function() {
        return (
            <div>
                <br/>
                <Search onSearchResult={ this.onSearchResult } />
                <div>
                    {
                        this.state.result.map(function(item) {
                            console.info(item);
                            return (
                                <div>
                                    title: { item.title }
                                    <br/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
})

const Search = React.createClass({
    defaultProps: {},
    _searchIt: function() {
        ajax({
            url: 'http://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            success: (data)=>this.props.onSearchResult(data)
        })
    },
    render: function() {
        return (
            <div>
                <input type="text" ref="searchText" />
                <button type="button" onClick={ this._searchIt }>Search</button>
            </div>
        )
    }
})

ReactDOM.render(<App />, document.getElementById("app") )
