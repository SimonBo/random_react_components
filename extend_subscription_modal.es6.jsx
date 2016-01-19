var ExtendSubscriptionModal = React.createClass({
  render: function() {
    var subscription = this.props.selectedSubscription;
    var style = this.props.visible == true ? {display: 'block'} : {display: 'none'};
    return (
      <div className="modal react_modal" style={style}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Przedłuż subskrypcję</h4>
            </div>
            <div className="modal-body">
              <p>{subscription.name}</p>
              <p>Wybierz okres przedłużenia: <SponsorSubscriptionPeriodSelect handlePeriodChange={this.props.handlePeriodChange} /></p>
              <p>Całkowity koszt: {this.props.totalExtensionCost} zł</p>
              <button className="btn btn-success extend_subscription_btn" onClick={this.props.handleExtendSubscriptionConfirmation}>Przedłuż</button>
            </div>
            <div className="modal-footer">
              <button className='btn btn-primary' onClick={this.props.handleCloseModal}>Zamknij</button>
            </div>
          </div>
        </div>
        <div className='react_modal_backdrop' style={style}></div>
      </div>
    )
  }
})