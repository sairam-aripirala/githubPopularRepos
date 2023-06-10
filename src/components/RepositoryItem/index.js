// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, avatarUrl, issuesCount, forksCount, starsCount} = repoDetails

  return (
    <li className="git-repo-card-container">
      <img src={avatarUrl} alt={name} className="repo-avatar" />
      <h1 className="repo-name">{name}</h1>
      <p className="stars-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="card-icon"
        />
        {starsCount} stars
      </p>
      <p className="stars-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="card-icon"
        />
        {forksCount} forks
      </p>
      <p className="stars-count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="card-icon"
        />
        {issuesCount} open issues
      </p>
    </li>
  )
}

export default RepositoryItem
