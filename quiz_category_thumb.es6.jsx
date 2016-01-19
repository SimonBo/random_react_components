var QuizCategoryThumb = React.createClass({
  render: function() {
    var warnings = this.props.warning.map(function(warning, i) {
      return (<h5 className='sponsor_warning'>{warning}</h5>)
    });
    return (
          <div className="col-xs-4">
            <div className={this.props.classes} onClick={this.props.wrapperDivOnClick}>
              <div className="caption">
                <h3>{this.props.quizCategory.name}</h3>
                <p><span className='sponsor_quiz_thumb_info_label'>Koszt:</span> {this.props.quizCategory.subscription_cost}</p>
                <p><span className='sponsor_quiz_thumb_info_label'>Dla {this.props.formattedGender} w wieku {this.props.forAge} lat.</span></p>
                {warnings}
              </div>
            </div>
          </div>
    )
  }
});

