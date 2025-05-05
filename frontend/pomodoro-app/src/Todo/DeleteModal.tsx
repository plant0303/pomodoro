import React from 'react'
import style from '../css/Todo/DeleteModal.module.scss'

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className={style.popupOverlay}>
      <div className={style.popupBox}>
        <p>정말 삭제하시겠습니까</p>
        <div className={style.popupBtn}>
          <button onClick={onConfirm}>삭제</button>
          <button>취소</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal
