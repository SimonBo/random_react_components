var SubscriptionSponsorSummary = React.createClass({


  render: function() {
    var totalCost = 0;
    $.each(this.props.selectedQuizCategories, function() {
      totalCost += parseInt(this.subscription_cost);
    });
    totalCost = totalCost * this.props.selectedStudents.length * parseInt(this.props.sponsorPeriod);

    var userBalance = parseInt(this.props.userBalance);
    var canSubmit = this.props.canSubmit();
    if (canSubmit == true && totalCost <= userBalance) {
      var button = (<button className="btn btn-success" onClick={this.props.handleClick}>Zatwierdź</button>)
    } else {
      var button = (<button className="btn btn-success disabled">Zatwierdź</button>)
    };

    var warnings = [];
    if (totalCost > userBalance) {warnings.push('Niewystarczająca ilość środków na koncie.')};
    if (this.props.selectedQuizCategories.length == 0) {warnings.push('Wybierz przynajmniej jedną ścieżkę edukacyjną.')};
    if (this.props.selectedStudents.length == 0) {warnings.push('Wybierz przynajmniej jedno dziecko.')};
    var warningsSection = warnings.map(function(elem, index) {
      return (<h5 className='sponsor_warning'>{elem}</h5>);
    })

    return (
      <ul className="media-list contrast padding_2">
        <div className="media text-center padding_2 media-bordered">
          <h4>Ilość studentów: {this.props.selectedStudents.length}</h4>
          <h4>Ilość subskrypcji: {this.props.selectedQuizCategories.length}</h4>
          <h4>Okres subskrypcji:&nbsp;
            <SponsorSubscriptionPeriodSelect handlePeriodChange={this.props.handlePeriodChange} />
          </h4>
          <h4>Całkowity koszt: {totalCost}</h4>
          {button}
          {warningsSection}
        </div>
      </ul>
    )
  }
})