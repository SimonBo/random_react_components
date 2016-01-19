var StudentsPanel = React.createClass({
  render: function() {
    var findOne = function (haystack, arr) {
        return arr.some(function (v) {
            return haystack.indexOf(v) >= 0;
        });
    };

    var element = this;
    var selectedStudents = this.props.selectedStudents;
    var selectedQuizCategories = this.props.selectedQuizCategories;
    var allowedGendersForCurrentQuizSelection = selectedQuizCategories.map(function(el, i) {return el.gender;}).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    var minAge = selectedQuizCategories.map(function(el, i) {return el.min_age;}).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    var maxAge = selectedQuizCategories.map(function(el, i) {return el.max_age;}).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    var selectedQuizCategoriesIds = selectedQuizCategories.map(function(el, i) { return el.id });

    var studentsPanel = this.props.students.map(function(student, index) {
      var isSelectedStudent = selectedStudents.indexOf(student) == -1 ? false : true
      var classes = 'thumbnail sponsor_thumbnail ';
      if (isSelectedStudent == true) {
        classes += 'selected '
      };
      var setWarningTooltip = false;
      var warning = [];

      var enableThumb = true;
      var student_gender = student.gender;
      var student_age = parseInt(student.age);

      if (allowedGendersForCurrentQuizSelection == ["none"] || allowedGendersForCurrentQuizSelection == []) {
        enableThumb = true;
      } else if (allowedGendersForCurrentQuizSelection.indexOf('man') != -1 && student_gender == 'woman'){
        enableThumb = false;
        warning.push('Ścieżka nieodpowiednia dla dziecka tej płci. ');
      } else if (allowedGendersForCurrentQuizSelection.indexOf('woman') != -1 && student_gender == 'man'){
        enableThumb = false;
        warning.push('Ścieżka nieodpowiednia dla dziecka tej płci. ');
      };

      if (minAge.filter(function(value){
        return parseInt(value) > student_age}).length > 0) {
         enableThumb = false;
         warning.push('Ścieżka nieodpowiednia dla dziecka w tym wieku. ');
       } else if (maxAge.filter(function(value) {return parseInt(value) < student_age;}).length > 0) {
        enableThumb = false;
        warning.push('Ścieżka nieodpowiednia dla dziecka w tym wieku. ');
      };

      if (findOne(student.active_subscriptions, selectedQuizCategoriesIds) == true) {
         enableThumb = false;
         warning.push('Dziecko jest już przypisane do tej ścieżki. ');
      };

      if (enableThumb == true) {
        var wrapperDivOnClick = element.props.handleToggleSelectStudent.bind(this, index, student);
      } else {
        classes += 'disabled ';
        var wrapperDivOnClick = '';
      };

      if (enableThumb == true) {
        return (
          <StudentThumb student={student} classes={classes} wrapperDivOnClick={wrapperDivOnClick} warning={warning} />
        )
      };
    });

  var undefinedCount = studentsPanel.reduce(function(n, val) {
      return n + (val === undefined);
  }, 0);
  if (undefinedCount == studentsPanel.length) {
    studentsPanel = (<h4 className="text-center sponsor_panel_header">Brak dzieci odpowiednich dla wybranej ścieżki.</h4>);
  };

    if (this.props.selectedStudents.length > 0) {
      var panelHeader = (<div className='text-center'><i className="fa fa-check-circle-o sponsor_panel_check text-success"></i></div>)
    } else {
      var panelHeader = (<h3 className='text-center sponsor_panel_header'>Wybierz dzieci:</h3>)
    };

    return (
      <div className="panel panel-default orange_square_border" id='students_to_sponsor'>
        <div className="panel-body">
          {panelHeader}
          {studentsPanel}
        </div>
      </div>

    )
  }
});