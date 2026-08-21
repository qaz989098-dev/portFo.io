export default function TrainingDetailModal({ training, onClose }) {
  if (!training?.detail) return null;

  const { trainingInfo, traineeInfo } = training.detail;

  return (
    <div className="modal" role="presentation" onClick={onClose}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="training-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal__header">
          <h3 id="training-modal-title" className="modal__title">
            훈련결과
          </h3>
          <button type="button" className="modal__close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </header>

        <div className="modal__body">
          <section className="detail-table-section">
            <h4 className="detail-table-section__title">훈련 정보</h4>
            <dl className="detail-table">
              {trainingInfo.map(({ label, value }) => (
                <div key={label} className="detail-table__row">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {traineeInfo?.length > 0 && (
            <section className="detail-table-section">
              <h4 className="detail-table-section__title">훈련생 정보</h4>
              <dl className="detail-table">
                {traineeInfo.map(({ label, value }) => (
                  <div key={label} className="detail-table__row">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
