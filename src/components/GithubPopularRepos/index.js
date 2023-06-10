import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    gitReposList: [],

    status: statusConstants.initial,
  }

  componentDidMount() {
    this.setState({status: statusConstants.inProgress})
    this.getGitRepos()
  }

  getSuccessView = () => {
    const {gitReposList} = this.state
    return (
      <ul className="git-repos-list-container">
        {gitReposList.map(each => (
          <RepositoryItem repoDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  getLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  getGitRepos = async () => {
    const {activeTabId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(githubReposApiUrl)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        avatarUrl: each.avatar_url,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
      }))

      this.setState({
        gitReposList: updatedData,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  onChangeTabId = id => {
    this.setState(
      {activeTabId: id, status: statusConstants.inProgress},
      this.getGitRepos,
    )
  }

  render() {
    const {activeTabId, status} = this.state

    let content
    switch (status) {
      case statusConstants.inProgress:
        content = this.getLoaderView()
        break
      case statusConstants.success:
        content = this.getSuccessView()
        break
      case statusConstants.failure:
        content = this.getFailureView()
        break
      default:
        content = null
        break
    }

    return (
      <div className="bg-container">
        <h1 className="main-bg-heading">Popular</h1>
        <ul className="language-tabs-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageDetails={each}
              isActive={activeTabId === each.id}
              onChangeTabId={this.onChangeTabId}
              key={each.id}
            />
          ))}
        </ul>
        {/* {this.getContent(status)} */}
        {content}
      </div>
    )
  }
}

export default GithubPopularRepos
