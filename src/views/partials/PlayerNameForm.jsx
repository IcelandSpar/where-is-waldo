import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from '../../styles/PlayerNameForm.module.css';

const PlayerNameForm = () => {
  const playerNameInputRef = useRef(null);
  const [ formErr, setFormErr ] = useState(null);

  const navigate = useNavigate();

  const { playerId } = useParams();

  const submitPlayerNameHandler = (e) => {
    e.preventDefault();
    setFormErr(null);
    const formData = new FormData();
    formData.append('playerName', playerNameInputRef.current.value);
    formData.append('playerId', playerId);
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/submit-player-name`, {
      method: 'PUT',
      body: new URLSearchParams(formData)
    })
    .then((res) => res.json())
    .then((res) => {
      if(!res.errors) {
        navigate('/');
      } else if(res.errors.errors) {
        setFormErr([...res.errors.errors]);

      }
    })
    .catch((err) => {
      console.error(err);
    })

  }


  return (
    <form onSubmit={submitPlayerNameHandler} className={styles.playerNameForm} >
      {formErr == null ? null : (
        <div className={styles.errCont}>
        <h4 className={styles.fixErrorsHeading}>Please Fix the Errors</h4>
      <ul className={styles.errorUl}>
        {formErr.map((errMsg, indx) => <li key={indx}>{errMsg.msg}</li>)}
      </ul>
      </div>
      )}

      <div className={styles.formLabelAndInput}>
        <label htmlFor="playerName" className={styles.enterNameLabel}>Enter Your Name</label>
        <input className={styles.formInput} ref={playerNameInputRef} type="text" id="playerName" name="playerName" defaultValue={'Anon'} autoFocus/>
      </div>
      <button onClick={submitPlayerNameHandler} className={styles.enterPlayerNameBtn} type="button">Submit Name</button>
    </form>
  )
};

export default PlayerNameForm;