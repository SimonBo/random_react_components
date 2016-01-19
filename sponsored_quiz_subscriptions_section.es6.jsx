var SponsoredQuizSubscriptionsSection = React.createClass({
  render: function() {
    var self =this;
    var sponsoredQuizCategories = this.props.sponsoredSubscriptions.map(function(el, i) {
      return (<SponsoredQuizThumb subscription={el} handleExtendSubscription={self.props.handleExtendSubscription.bind(this, i, el)}
        handleExtendSubscriptionConfirmation={self.props.handleExtendSubscriptionConfirmation} />)
    });
    var childrensSponsoredSubscriptions = this.props.childrensSponsoredSubscriptions.map(function(el, i) {
      return (<SponsoredQuizThumb subscription={el} handleExtendSubscription={self.props.handleExtendSubscription.bind(this, i, el)}
        handleExtendSubscriptionConfirmation={self.props.handleExtendSubscriptionConfirmation} />)
    });

    var rowStyle = {marginLeft: 0, marginRight: 0};
    var hStyle = {marginLeft: 10};
    return (
      <div>
        <div className="row" style={rowStyle}>
          <h3 style={hStyle}>Twoje subskrypcje sponsorowane:</h3>
          {sponsoredQuizCategories}
        </div>
        <div className="row" style={rowStyle}>
          <h3 style={hStyle}>Subskrypcje sponsorowane przez innych użytkowników:</h3>
          {childrensSponsoredSubscriptions}
        </div>
      </div>
    )
  }
})