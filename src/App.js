import React, { Component } from "react";
import { connect } from "react-redux";
import { getRepo } from "./redux";

// App.js

export class App extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = { username: "paoyuchin" };
  }
  componentDidMount() {
    this.updateRepoList(this.state.username);
  }
  updateRepoList(username) {
    this.props.getRepo(username);
  }
  render() {
    return (
      <div>
        <h2>Get {this.state.username} Repo</h2>
        <input
          type="text"
          value={this.state.username}
          onChange={e => {
            this.setState({ username: e.target.value });
          }}
        />
        <button onClick={() => this.updateRepoList(this.state.username)}>
          Send
        </button>
        <ul>
          {this.props.reposData.map((currentValue, index) => (
            <li key={index}>
              <a href={currentValue.html_url} target="_blank">
              {currentValue.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// AppContainer.js

const mapStateToProps = state => (
  {
    reposData: state.repos
  });

const mapDispatchToProps = { getRepo };

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
//smart container
