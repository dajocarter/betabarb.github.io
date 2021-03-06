angular.module('mboa').controller('PreTestController', function($scope, Problems) {
  $pageTitle = "Pre-Test";

  $scope.problems = Problems;

  $scope.submitForm = function() {
    $scope.submitted = true;
    var keys = ['one', 'two', 'three', 'four', 'five'];

    for (var i = 0; i < $scope.problems.length; i++) {
      var problem = $scope.problems[i];
      for (var j = 0; j < problem.options.length; j++) {
        var choice = problem.options[j];
        if (choice['chosen']) {
          firebase.database().ref('responses').child(keys[i]).child('total').transaction(function(count) {
            return count + 1;
          });
          firebase.database().ref('responses').child(keys[i]).child(choice.choice).transaction(function(count) {
            return count + 1;
          });
        }
      }
    }
  };
});

angular.module('mboa').controller('CaseController', function($scope) {
  /************ GRADE THE TABLE *************/
  /************ Night in the ER => pg 3 *************/
  $('td input').bind('click', function() {
    console.log("hello");
    var answers = ["high", "low", "normal", "normal"];
    var index = $(this).attr('name');
    if ($('input:radio[name=' + index + ']:checked').val() === answers[index]) {
      $('input:radio[name=' + index + ']').parent().removeClass();
      $(this).parent().addClass('correct');
    } else {
      $('input:radio[name=' + index + ']').parent().removeClass();
      $(this).parent().addClass('wrong');
    }
  });

  /************ GRADE THE MULTIPLE CHOICE QUESTION *************/
  /************ A Mysterious Mass => ans secondary *************/
  $('#multChoice input').bind('click', function() {
    var answer = "A";
    $('#multChoice label').removeClass('correct wrong');
    if ($(this).val() === answer) {
      $(this).parent().addClass('correct');
    } else {
      $(this).parent().addClass('wrong');
    }
  });
});

angular.module('mboa').controller('RefsController', function($scope, $stateParams, References) {
  var caseName = $stateParams.caseName;
  $scope.caseName = caseName;
  $scope.pageTitle = caseName + " | References";
  $scope.refs = References[caseName].refs;
  $scope.creds = References[caseName].creds;
});

angular.module('mboa').controller('ModalInstanceController', function ($scope, $uibModalInstance, hint) {
  $scope.hint = hint;
  $scope.close = function () {
    $uibModalInstance.close();
  };
});

angular.module('mboa').controller('fileUploadController', function($scope, $stateParams, $timeout) {
  var auth = firebase.auth();
  var databaseRef = firebase.database().ref();
  var storageRef = firebase.storage().ref();

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var metadata = {
      'contentType': file.type
    };
    storageRef.child('images/' + $stateParams.caseName + '/' + file.name).put(file, metadata).then(function(snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log(snapshot.metadata);

      var newImgKey = databaseRef.child('images/' + $stateParams.caseName).push({
        url: snapshot.metadata.downloadURLs[0],
        fullPath: snapshot.metadata.fullPath,
        name: snapshot.metadata.name,
        size: snapshot.metadata.size,
        type: snapshot.metadata.type,
      }).then(function(snapshot) {
        console.log('saved image to database', snapshot);
      }).catch(function(error) {
        console.log('error saving img data to db', error);
      });

      var url = snapshot.metadata.downloadURLs[0];
      console.log('File available at', url);

      switch($stateParams.caseName) {
        case 'a-night-in-the-er':
          $('#ner-gallery').collapse('show');
        break;

        case 'the-suspicious-lesion':
          $('#tsl-gallery').collapse('show');
        break;

        case 'a-mysterious-mass':
          $('#amm-gallery').collapse('show');
        break;
      }

    }).catch(function(error) {
      console.error('Upload failed:', error);
    });
  }

  var images = [];
  databaseRef.child('images/' + $stateParams.caseName).on('child_added', function(snapshot) {
    images.push(snapshot.val());
    $timeout(function() {
      $scope.images = images;
    });
  });

  $scope.$watch('images', function(newValue, oldValue) {
    $timeout(function() {
      $('.popup-gallery').each(function() {
        $(this).magnificPopup({
          delegate: '.image',
          type: 'image',
          gallery: {
            enabled: true
          },
          titleSrc: function(item) {
            return item.el.attr('title');
          }
        });
      });
    });
  });

  window.onload = function() {
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.getElementById('file').disabled = true;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log('Anonymous user signed-in.', user);
        document.getElementById('file').disabled = false;
      } else {
        console.log('There was no anonymous session. Creating a new anonymous user.');
        // Sign the user in anonymously since accessing Storage requires the user to be authorized.
        auth.signInAnonymously();
      }
    });
  }
});