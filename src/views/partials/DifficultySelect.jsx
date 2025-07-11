import { Link } from 'react-router-dom';

import styles from '../../styles/DifficultySelect.module.css';

const DifficultySelect = () => {
  return (
    <>
    <h2>Choose Your difficulty</h2>
    <ul>
    <li>
      <Link to={'/where-is-waldo/easy'}>Easy</Link>
    </li>
    <li>
      <Link to={'/where-is-waldo/medium'}>Medium</Link>
    </li>
    <li>
      <Link to={'/where-is-waldo/hard'}>Hard</Link>
    </li>
    <li>
      <Link to={'/where-is-waldo/extra-hard'}>Extra Hard</Link>
    </li>
    </ul>
    </>
  )
};

export default DifficultySelect;