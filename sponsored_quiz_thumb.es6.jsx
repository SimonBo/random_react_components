var SponsoredQuizThumb = React.createClass({
  render: function() {
    var subscription = this.props.subscription;
    console.log(subscription.extended_by_user_id);
    if (subscription.extended_by_user_id == null) {
      var action = (<button className="btn btn-success" onClick={this.props.handleExtendSubscription}>Przedłuż subskrypcję</button>);
    } else {
      var action = (<p>Subskrycja została przedłużona przez rodzica.</p>);
    };
    return (
          <div className="col-xs-3">
            <div className='thumbnail extend_sponsored_subscription_thumb' >
              <div className="caption">
                <h3>{subscription.name}</h3>
                <p><span className='sponsor_quiz_thumb_info_label'>Dziecko:</span> {subscription.student_full_name}</p>
                <p><span className='sponsor_quiz_thumb_info_label'>Koszt:</span> {subscription.subscription_cost} zł</p>
                <p><span className='sponsor_quiz_thumb_info_label'>Wygasa dnia:</span> {subscription.sponsored_to}</p>
                {action}
              </div>
            </div>
          </div>
    )
  }
})

