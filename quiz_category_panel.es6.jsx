var QuizCategoryPanel = React.createClass({

  render: function() {
    var findOne = function (haystack, arr) {
      return arr.some(function (v) {
          return haystack.indexOf(v) >= 0;
      });
    };
    var element = this;
    var selectedQuizCategories = this.props.selectedQuizCategories;
    var selectedStudents = this.props.selectedStudents;
    var selectedQuizCategories = this.props.selectedQuizCategories;
    var allowedGendersForCurrentStudentSelection = selectedStudents.map(function(el, i) {return el.gender;}).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    var minAge = selectedQuizCategories.map(function(el, i) {return el.min_age;}).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    var maxAge = selectedQuizCategories.map(function(el, i) {return el.max_age;}).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    var selectedStudentsAges = selectedStudents.map(function(el, i) {return el.age});
    var lowestSelectedStudentAge = Math.min(...selectedStudentsAges);
    var highestSelectedStudentAge = Math.max(...selectedStudentsAges);
    var selectedStudentsActiveSubscriptionsIds = [].concat.apply([], selectedStudents.map(function(el, i) {return el.active_subscriptions}));


    var quizzesPanel = this.props.quiz_categories.map(function(quizCategory, index) {
      var isSelectedQuizCategory = selectedQuizCategories.indexOf(quizCategory) == -1 ? false : true
      var quizCategoryGender = quizCategory.gender;
      var quizMinAge = quizCategory.min_age;
      var quizMaxAge = quizCategory.max_age;

      switch (quizCategoryGender) {
        case 'man':
          var formattedGender = 'chłopców';
          break;
        case 'woman':
          var formattedGender = 'dziewcząt';
          break;
        default:
          var formattedGender = 'wszystkich';
          break;
      };




      var enableThumb = true;
      var warning = [];

      if (allowedGendersForCurrentStudentSelection == ["none"] || allowedGendersForCurrentStudentSelection == []) {
        enableThumb = true;
      } else if (allowedGendersForCurrentStudentSelection.indexOf('man') != -1 && quizCategoryGender == 'woman'){
        enableThumb = false;
        warning.push('Ścieżka nieodpowiednia dla dziecka tej płci. ');
      } else if (allowedGendersForCurrentStudentSelection.indexOf('woman') != -1 && quizCategoryGender == 'man'){
        enableThumb = false;
        warning.push('Ścieżka nieodpowiednia dla dziecka tej płci. ');
      };



      if (parseInt(quizMinAge) > lowestSelectedStudentAge) {
         enableThumb = false;
         warning.push('Ścieżka nieodpowiednia dla dziecka w tym wieku. ');
       } else if (parseInt(quizMaxAge) < highestSelectedStudentAge) {
        enableThumb = false;
        warning.push('Ścieżka nieodpowiednia dla dziecka w tym wieku. ');
      };



      if (selectedStudentsActiveSubscriptionsIds.length > 0 && findOne(selectedStudentsActiveSubscriptionsIds, [quizCategory.id]) == true) {
         enableThumb = false;
         warning.push('Dziecko jest już przypisane do tej ścieżki. ');
      };

      var classes = 'thumbnail sponsor_thumbnail ';
      if (enableThumb == true) {
        var wrapperDivOnClick = element.props.handleToggleSelectQuizCategory.bind(this, index, quizCategory);
      } else {
        classes += 'disabled ';
        var wrapperDivOnClick = '';
      };

      if (isSelectedQuizCategory == true) {
        classes += 'selected'
      };
      var forAge = `${quizMinAge} - ${quizMaxAge}`;

      if (enableThumb == true) {
        return (
          <QuizCategoryThumb quizCategory={quizCategory} forAge={forAge} classes={classes} wrapperDivOnClick={wrapperDivOnClick} formattedGender={formattedGender} warning={warning} />
          )
      };
    });


  var undefinedCount = quizzesPanel.reduce(function(n, val) {
      return n + (val === undefined);
  }, 0);
  if (undefinedCount == quizzesPanel.length) {
    quizzesPanel = (<h4 className="text-center sponsor_panel_header">Brak odpowiednich ścieżek edukacyjnych.</h4>);
  };

    if (this.props.selectedQuizCategories.length > 0) {
      var panelHeader = (<div className='text-center'><i className="fa fa-check-circle-o sponsor_panel_check text-success"></i></div>)
    } else {
      var panelHeader = (<h3 className='text-center sponsor_panel_header'>Wybierz ścieżki edukacyjne:</h3>)
    };

    return (
      <div className="panel panel-default orange_square_border" id='quiz_categories'>
        <div className="panel-body">
          {panelHeader}
          {quizzesPanel}
        </div>
      </div>
      )
  }
});