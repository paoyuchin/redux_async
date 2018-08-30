import React, { Component } from "react";
import { connect } from "react-redux";
import { getRepos } from "./redux";

// App.js
export class App extends Component {
  state = { username: "tylerbuchea" };

  componentDidMount() {
    this.updateRepoList(this.state.username);
  }
  updateRepoList = username => {
    this.props.getRepos(username);
  };
  render() {
    return <div className="fontColor">
        <h2>Check Github</h2>
        <input type="text" value={this.state.username} onChange={e => this.setState(
              { username: e.target.value }
            )} />
        <button onClick={() => {
            this.updateRepoList(this.state.username);
          }}>
          Get user Repo
        </button>
        <ul>
          {this.props.repos.map((repo, index) => (
            <li className="liDecor" key={index}>
              <a href={repo.html_url} target="_blank">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>;
  }
}

// AppContainer.js
const mapStateToProps = (state, ownProps) => ({ repos: state.repos });
const mapDispatchToProps = { getRepos };
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
