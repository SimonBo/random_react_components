var SponsorTransactionModal = React.createClass({
  render: function() {
    var style = this.props.visible == true ? {display: 'block'} : {display: 'none'};
    return (
      <div className="modal react_modal" style={style} id='sponsor_modal'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              <p>{this.props.content}</p>
              <img src={this.props.modalImagePath} className='sponsor_modal_image' />
            </div>
            <div className="modal-footer">
              <a href='/sponsor_quiz_subscription' className='btn btn-success'>Zamknij</a>
            </div>
          </div>
        </div>
        <div className="react_modal_backdrop" style={style}></div>
      </div>
    )
  }
});