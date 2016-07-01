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
    }),

    onSearchResult: function(data) {
        // Use react.addons.update instead
        this.setState({result: data})
    },

    render: function() {
        return (
            <div>
                <Search onSearchResult={ this.onSearchResult } />
                <div>
                    {
                        // use lodash here
                        this.state.result.map(function(item, index) {
                            return (
                                <div key={ index }>
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

/**
 * The search component.
 *
 * Should be broken out into its own file
 */
const Search = React.createClass({
    searchIt: function() {
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
                <button type="button" onClick={ this.searchIt }>Search</button>
            </div>
        )
    }
})

// Finally the fun begins
ReactDOM.render(<App />, document.getElementById("app") )
