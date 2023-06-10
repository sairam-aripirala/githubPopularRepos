import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, onChangeTabId} = props
  const {id, language} = languageDetails

  const tabShift = () => {
    onChangeTabId(id)
  }

  const activeClass = isActive ? 'active' : ''
  return (
    <li className="language-tab-item">
      <button
        className={`language-btn ${activeClass}`}
        type="button"
        onClick={tabShift}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
