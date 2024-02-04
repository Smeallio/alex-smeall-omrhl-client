import "./ConfirmModal.scss";

const ConfirmModal = ({ message, cancel, confirm }) => (
    <div className="modal">
      <div className="modal__content">
        <p>{message}</p>
        <button className="modal__cancel" onClick={cancel}>Cancel</button>
        <button className="modal__confirm" onClick={confirm}>Confirm</button>
      </div>
    </div>
  );

  export default ConfirmModal;