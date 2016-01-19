var ModalHeader = React.createClass({
  render: function () {
    return (
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4>{this.props.title}</h4>
      </div>
    )
  }
});

var ModalBody = React.createClass({
  render: function () {
    return (
      <div className="modal-body">
        <p>{this.props.content}</p>
      </div>
    )
  }
});

var ModalFooter = React.createClass({
  render: function () {
    console.log(this.props.footerContent)
    if (this.props.footerContent === undefined) {
      var footerContent = (<button type="button" className="btn btn-success" data-dismiss="modal">Zamknij</button>);
    } else {
      var footerContent = this.props.footerContent;
    };
    var footerContent
    return (
      <div className="modal-footer">
        {footerContent}
      </div>
    )
  }
});

var Modal = React.createClass({
  render: function () {
    return (<div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <ModalHeader title={this.props.title} />
            <ModalBody content={this.props.content} />
            <ModalFooter />
          </div>
        </div>
      </div>)
  }
});