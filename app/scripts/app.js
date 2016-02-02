//Prepare document
$(document).ready(function() {

////create array to store tasks
  var listo = [];

// newTaskForm is hidden when the document loads
  $('#newTaskForm').hide();

//constructor for task creating
    var Task = function(task) {
    	this.task = task;
    	this.id = 'new';

// function to save tasks to array
    var addTask = function(task) {
    	if(task) {  //if task exists/ is truthy
    		task = new Task(task);
    		listo.push(task);

        $('#newItemInput').val('');

    		$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

    	}

// our New button will hide and show the input form at the same time
    	$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    };

// event that calls the addTask function when we click the saveNewItem button
    $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });

// function to move tasks between list status
      var advanceTask = function(task) {
        var modified = task.innerText.trim()
        for (var i = 0; i < listo.length; i++) {
          if (listo[i].task === modified) {
            if (listo[i].id === 'new') {
              listo[i].id = 'inProgress';
            } else if (listo[i].id === 'inProgress') {
              listo[i].id = 'archived';
            } else {
              listo.splice(i, 1);
            }
            break;
          }
        }
        task.remove();
      };

// can open the new task form with the newListItem button
    //Opens form
      $('#newListItem').on('click', function () {
          $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
      });

// can close the new task form with the Cancel button
      //closes form
      $('#cancel').on('click', function (e) {
          e.preventDefault();
          $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
      });

// allows us to change the status of an item from 'new' to 'inProgress'
      $(document).on('click', '#item', function(e) {
      	e.preventDefault();

// set a variable called task so that we can access the 'this' keyword to
//pass it into another function and change it's ID to the string 'inProgress'
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';

// gives ability to move the actual list item
        $('#currentList').append(this.outerHTML);
      });

// move the items from 'inProgress' to 'archived'
      $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
      });

// way to delete the items on the list by passing a task into the advanceTask function without a new id
      $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
      });

});
