var SponsorSubscriptionPeriodSelect = React.createClass({
  render: function() {
    return (
      <select onChange={this.props.handlePeriodChange}>
        <option value="1">1 miesiąc</option>
        <option value="2">2 miesiące</option>
        <option value="3">3 miesiące</option>
      </select>
    )
  }
})