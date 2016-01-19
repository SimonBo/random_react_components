var SubscriptionsSponsoredByMe = React.createClass({
  getInitialState: function() {
    return {
      current_user: this.props.current_user,
      sponsoredSubscriptions: this.props.sponsored_subscriptions,
      extendSubscriptionModalVisible: false,
      selectedSubscription: {},
      totalExtensionCost: 0,
      sponsorPeriod: 1,
      extendSubscriptionSummaryModalVisible: false,
      extensionSuccessful: false,
      childrensSponsoredSubscriptions: this.props.childrens_sponsored_subscriptions
    }
  },

  handleExtendSubscription: function(i, subscription) {
    var extensionCost = parseInt(subscription.subscription_cost) * this.state.sponsorPeriod;
    this.setState({extendSubscriptionModalVisible: true, selectedSubscription: subscription, totalExtensionCost: extensionCost});
  },

  handleCloseModal: function() {
    this.setState({extendSubscriptionModalVisible: false, selectedSubscription: {}, sponsorPeriod: 1, totalExtensionCost: 0});
  },

  handlePeriodChange: function(event) {
    var new_period = event.target.value;
    var extensionCost = parseInt(this.state.selectedSubscription.subscription_cost) * new_period;
    this.setState({sponsorPeriod: new_period, totalExtensionCost: extensionCost});
  },

  handleExtendSubscriptionConfirmation: function() {
    var self = this;
    $.post( "sponsor_quiz_subscriptions/" + this.state.selectedSubscription.id + "/extend", { selected_subscription: this.state.selectedSubscription, sponsor_period: this.state.sponsorPeriod, user_id: this.state.current_user.id }, function() {
    })
      .done(function() {
        self.handleSuccessfulSubscriptionExtension();
      })
      .fail(function() {
        self.handleSuccessfulFailedExtension();
      })
      .always(function() {
    });
  },

  handleSuccessfulSubscriptionExtension: function() {
    this.setState({extendSubscriptionModalVisible: false, selectedSubscription: {}, sponsorPeriod: 1, totalExtensionCost: 0, extendSubscriptionSummaryModalVisible: true, extensionSuccessful: true});
  },

  handleSuccessfulFailedExtension: function() {
    this.setState({extendSubscriptionModalVisible: false, selectedSubscription: {}, sponsorPeriod: 1, totalExtensionCost: 0, extendSubscriptionSummaryModalVisible: true, extensionSuccessful: false});
  },

  render: function() {
    return (
      <div className="panel panel-default orange_square_border" id='quiz_categories'>
        <div className="panel-body">
          <SponsoredQuizSubscriptionsSection sponsoredSubscriptions={this.state.sponsoredSubscriptions} handleExtendSubscription={this.handleExtendSubscription} childrensSponsoredSubscriptions={this.state.childrensSponsoredSubscriptions} />
          <ExtendSubscriptionModal visible={this.state.extendSubscriptionModalVisible} handleCloseModal={this.handleCloseModal}
          selectedSubscription={this.state.selectedSubscription} totalExtensionCost={this.state.totalExtensionCost} handlePeriodChange={this.handlePeriodChange}
          handleExtendSubscriptionConfirmation={this.handleExtendSubscriptionConfirmation} />
          <ExtendSubscriptionSummaryModal visible={this.state.extendSubscriptionSummaryModalVisible} extensionSuccessful={this.state.extensionSuccessful} />
        </div>
      </div>
      )
  }
})