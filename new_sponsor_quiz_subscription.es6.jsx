var NewSponsorQuizSubscription = React.createClass({
  getInitialState: function() {
    return {
      students: this.props.students,
      quiz_categories: this.props.quiz_categories,
      selectedStudents: [],
      selectedQuizCategories: [],
      sponsorPeriod: 1,
      userBalance: this.props.user_balance,
      sponsorModalTitle: '',
      sponsorModalContent: '',
      sponsorTransactionModalVisible: false,
      modalImagePath: this.props.modal_image_path
    }
  },

  checkIfCanSubmit: function() {
    if (this.state.selectedStudents.length > 0 && this.state.selectedQuizCategories.length > 0) {
      return true;
    } else {
      return false;
    };
  },

  handleToggleSelectStudent: function(i, student) {
    var selected_students = this.state.selectedStudents;
    var updatedSelectedStudents = this.state.selectedStudents.slice();
    var indexOfStudentInSelectedStudents = selected_students.indexOf(student)

    if (indexOfStudentInSelectedStudents != -1) {
      updatedSelectedStudents.splice(indexOfStudentInSelectedStudents, 1);
    } else {
      updatedSelectedStudents.push(student)
    };

    this.setState({ selectedStudents: updatedSelectedStudents });
  },

  handleToggleSelectQuizCategory: function(i, quiz_category) {
    var selected_quiz_categories = this.state.selectedQuizCategories;
    var updatedSelectedQuizCategories = this.state.selectedQuizCategories.slice();
    var indexOfQuizInSelectedQuizCategories = selected_quiz_categories.indexOf(quiz_category)

    if (indexOfQuizInSelectedQuizCategories != -1) {
      updatedSelectedQuizCategories.splice(indexOfQuizInSelectedQuizCategories, 1);
    } else {
      updatedSelectedQuizCategories.push(quiz_category)
    };

    this.setState({ selectedQuizCategories: updatedSelectedQuizCategories });
  },

  handleCreateSponsoredSubscriptions: function() {
    var selectedStudentsIds = [];
    $.each(this.state.selectedStudents, function(index, elem) {
      selectedStudentsIds.push(elem.id);
    });
    var selectedQuizCategoriesIds = [];
    $.each(this.state.selectedQuizCategories, function(index, elem) {
      selectedQuizCategoriesIds.push(elem.id);
    });
    var sponsorPeriod = this.state.sponsorPeriod;
    var self = this;
    $.post( "sponsor_quiz_subscriptions", { selected_students: selectedStudentsIds, selected_quiz_categories: selectedQuizCategoriesIds, sponsor_period_in_months: sponsorPeriod }, function() {
    })
      .done(function() {
        var successModalTitle = 'Dziękujemy za aktywację nowych ścieżek edukacyjnych'
        var successModalContent = 'Subskrypcje są aktywne, rodzice zostaną poinformowani o dostępie do nowych ścieżek edukacyjnych.'
        self.setState({selectedStudents: [], selectedQuizCategories: [], sponsorModalTitle: successModalTitle, sponsorModalContent: successModalContent, sponsorTransactionModalVisible: true});
      })
      .fail(function() {
        var successModalTitle = 'Wystąpił błąd'
        var successModalContent = 'Prosimy skontaktować się z administratorem.'
        self.setState({selectedStudents: [], selectedQuizCategories: [], sponsorModalTitle: successModalTitle, sponsorModalContent: successModalContent, sponsorTransactionModalVisible: true});
      })
      .always(function() {
    });
  },

  handlePeriodChange: function(event) {
    this.setState({sponsorPeriod: event.target.value});
  },

  render: function() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-8 col-xs-offset-2'>
            <SubscriptionSponsorSummary selectedQuizCategories={this.state.selectedQuizCategories}
              selectedStudents={this.state.selectedStudents} handleClick={this.handleCreateSponsoredSubscriptions}
            handlePeriodChange={this.handlePeriodChange} sponsorPeriod={this.state.sponsorPeriod} canSubmit={this.checkIfCanSubmit}
            userBalance={this.state.userBalance} />
          </div>
        </div>
        <div className="col-xs-6">
            <StudentsPanel students={this.state.students} selectedStudents={this.state.selectedStudents} handleToggleSelectStudent={this.handleToggleSelectStudent} selectedQuizCategories={this.state.selectedQuizCategories} />
        </div>
        <div className="col-xs-6">
          <QuizCategoryPanel quiz_categories={this.state.quiz_categories} selectedQuizCategories={this.state.selectedQuizCategories} handleToggleSelectQuizCategory={this.handleToggleSelectQuizCategory} selectedStudents={this.state.selectedStudents} />
        </div>
        <SponsorTransactionModal title={this.state.sponsorModalTitle} content={this.state.sponsorModalContent} visible={this.state.sponsorTransactionModalVisible} modalImagePath={this.state.modalImagePath} />
      </div>
    )
  }
});
