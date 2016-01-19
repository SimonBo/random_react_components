var StudentThumb = React.createClass({
  render: function() {
    var warnings = this.props.warning.map(function(warning, i) {
      return (<h5 className='sponsor_warning'>{warning}</h5>)
    });
    return (
          <div className="col-xs-4">
            <div className={this.props.classes} onClick={this.props.wrapperDivOnClick}>
              <img src={this.props.student.avatar_url} alt="student_picture" />
              <div className="caption">
                <h3>{this.props.student.first_name} {this.props.student.last_name}</h3>
                <h5>{this.props.student.age} lat</h5>
                {warnings}
              </div>
            </div>
          </div>
    )
  }
})