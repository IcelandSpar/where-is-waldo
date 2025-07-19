import styles from '../../styles/SubmitMsg.module.css';

const SubmitMsg = ({setSubmitResultMsg ,submitResultMsg}) => {
  const handleCloseBtn = (e) => {
    e.preventDefault();
    setSubmitResultMsg(null)
  }
  return (
    <div className={styles.msgCont}>
      <button onClick={handleCloseBtn} type='button'>X</button>
      <p>{submitResultMsg.message}</p>
    </div>
  )
};

export default SubmitMsg;