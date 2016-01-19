var ExtendSubscriptionSummaryModal = React.createClass({
  render: function() {
    var success = this.props.extensionSuccessful == true
    var title = success ? 'Operacja zakończona pomyślnie' : 'Wystąpił błąd'
    var content = success ? 'Subskrypcja została przedłużona' : 'Nie udało się przedłużyć subskrypcji. Spóbuj ponownie.'
    var style = this.props.visible == true ? {display: 'block'} : {display: 'none'};

    return (
      <div className="modal react_modal" style={style}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <p>{content}</p>
            </div>
            <div className="modal-footer">
              <a href='/sponsor_quiz_subscriptions' className="btn btn-primary">Zamknij</a>
            </div>
          </div>
        </div>
        <div className='react_modal_backdrop' style={style}></div>
      </div>
    )
  }
})