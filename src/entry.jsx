// Should refactor this to have each of the components in their own file

// I was unable to find a "good" substitute for jquery.ajax
import { ajax } from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'

/**
 * The main part of the App
 *
 * Should be broken out into its own file
 */
const App = React.createClass({
    getInitialState: ()=>({
        result: [],
        searchType: 'posts'
    }),

    onSearchResult: function(data) {
        // Use react.addons.update instead
        this.setState({result: data})
    },

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-4 col-xs-offset-4 text-center">
                        <Search onSearchResult={ this.onSearchResult } />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        {
                            // use lodash here
                            this.state.result.map(function(item, index) {
                                return (
                                    <div className="well well-sm" key={ index }>
                                        { item.title ? <h4>{ item.title}</h4> : "" }
                                        { item.name ? <h4>{ item.name }</h4>  : "" }
                                        { item.body ? <p>{ item.body }</p> : "" }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
})

/**
 * The search component.
 *
 * Should be broken out into its own file
 */
const Search = React.createClass({
    // I would like to ping a "live" sites API to add true functionality
    searchIt: function() {
        let search = this.refs.searchText.value;
        ajax({
            url: 'http://jsonplaceholder.typicode.com/' + search,
            method: 'GET',
            success: (data)=>this.props.onSearchResult(data)
        })
    },

    render: function() {
        return (
            <select className="form-control" id="seachText" ref="searchText" onChange={ this.searchIt}>
                <option>-- Select --</option>
                <option value="posts">Posts</option>
                <option value="comments">Comments</option>
                <option value="albums">Albums</option>
                <option value="photos">Photos</option>
                <option value="todos">To-dos</option>
                <option value="users">Users</option>
            </select>
        )
    }
})

// Finally the fun begins
ReactDOM.render(<App />, document.getElementById("app") )
