import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from '../../styles/PlayerNameForm.module.css';

const PlayerNameForm = () => {
  const playerNameInputRef = useRef(null);

  const navigate = useNavigate();

  const { playerId } = useParams();

  const submitPlayerNameHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('playerName', playerNameInputRef.current.value);
    formData.append('playerId', playerId);
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/submit-player-name`, {
      method: 'PUT',
      body: new URLSearchParams(formData)
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      navigate('/');
    });

  }


  return (
    <form className={styles.playerNameForm} >
      <div className={styles.formLabelAndInput}>
        <label htmlFor="playerName">Player Name:</label>
        <input className={styles.formInput} ref={playerNameInputRef} type="text" id="playerName" name="playerName" defaultValue={'Anon'}/>
      </div>
      <button onClick={submitPlayerNameHandler} className={styles.enterPlayerNameBtn} type="button">Submit Name</button>
    </form>
  )
};

export default PlayerNameForm;