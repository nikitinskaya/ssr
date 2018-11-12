import React, { Component } from 'react'

class Grid extends Component {
    constructor(props) {
        super(props)

        let repos
        if (__isBrowser__) {
            repos = window.__INITIAL_DATA__
            delete window.__INITIAL_DATA__
        } else {
            repos = props.staticContext.data
        }

        this.state = {
            repos,
            loading: repos ? false : true,
        }

        this.fetchRepos = this.fetchRepos.bind(this);
    }

    fetchRepos(lang) {
        this.setState(() => ({
            loading: true,
        }))

        this.props.fetchInitialData(lang)
            .then((repos) => this.setState(() => ({
                repos,
                loading: false
            })))
    }

componentWillReceiveProps(nextProps) {
        const { match } = this.props;

        if (nextProps.match.params.id !== match.params.id ) {
            this.fetchRepos(nextProps.match.params.id)
        }
}

    render() {
        const { repos, loading } = this.state
        if (loading) {
            return (
                <h1>LOADING</h1>
            )
        } else {
            return (

                <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {repos.map(({ name, owner, stargazers_count, html_url }) => (
                        <li key={name} style={{ margin: 30 }}>
                            <ul>
                                <li><a href={html_url}>{name}</a></li>
                                <li>@{owner.login}</li>
                                <li>{stargazers_count} stars</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )
        }
    }
}

export default Grid
