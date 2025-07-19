import styles from '../../styles/SubmitMsg.module.css';

const SubmitMsg = ({setSubmitResultMsg ,submitResultMsg}) => {
  const handleCloseBtn = (e) => {
    e.preventDefault();
    setSubmitResultMsg(null)
  }
  return (
    <div className={styles.msgCont}>
      <div className={styles.buttonMsgCont}>
        <button className={styles.exitBtn} onClick={handleCloseBtn} type='button'>X</button>
        <p>{submitResultMsg.message}</p>
      </div>
      <div className={styles.timeBarCont}>
        <div className={styles.greyTimeBar}></div>
        <div className={styles.timeBar}></div>
      </div>
    </div>
  )
};

export default SubmitMsg;