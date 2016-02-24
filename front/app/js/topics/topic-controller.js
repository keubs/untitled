'use strict';

module.exports = function($scope, $location, $stateParams, TopicService,
                          ActionService, AuthService, AppSettings, $uibModal) {

  $scope.topic = {};
  $scope.backendUrl = AppSettings.backendUrl;
  $scope.isLoggedIn = AuthService.isLoggedIn();

  TopicService.topic($stateParams.topic)
    .then(function(data) {
      for (var attr in data) {
        $scope.topic[attr] = data[attr];
      }

      TopicService.topic_actions($stateParams.topic)
        .then(function(data){
          $scope.topic.actions = data;
        }, function(error){
          console.log(error);
        });
    }, function(error) {
      console.log(error);
      $location.path('/');
    });


    $scope.upVoteAction = function(index) {
      let action = $scope.topic.actions[index];
      if (action.isUpVoted) {
        ActionService.clearVote(action.id, action.isUpVoted)
          .then(function() {
            action.isUpVoted = false;
            action.isDownVoted = false;
            action.score--;
          },
          function(error) {
            $scope.voteFailed(index, error);
          });
      } else {
        ActionService.upVote(action.id)
          .then(function() {
            action.isUpVoted = true;
            action.isDownVoted = false;
            action.score++;
          },
          function(error) {
            $scope.voteFailed(index, error);
          });
      }

    };

    $scope.downVoteAction = function(index) {
      let action = $scope.topic.actions[index];

      if (action.isDownVoted) {
        ActionService.clearVote(action.id, !action.isDownVoted)
          .then(function() {
            action.isDownVoted = false;
            action.isUpVoted = false;
            action.score++;
          },
          function(error) {
            $scope.voteFailed(index, error);
          });
      } else {
        ActionService.downVote(action.id)
          .then(function() {
            action.isDownVoted = true;
            action.isUpVoted = false;
            action.score--;
          },
          function(error) {
            $scope.voteFailed(index, error);
          });
      }
    };


    $scope.isUpVoted = function($actionIndex) {
      let action = $scope.topic.actions[$actionIndex];
      return $scope.isLoggedIn && action.isUpVoted;
      // return AuthService.isLoggedIn() && TopicService.isUpVoted(topic.id);
    };

    $scope.isDownVoted = function($actionIndex) {
      let action = $scope.topic.actions[$actionIndex];
      return $scope.isLoggedIn && action.isDownVoted;
      // return AuthService.isLoggedIn() && TopicService.isDownVoted(topic.id);
    };

    $scope.voteFailed = function(index, error) {

      switch (error.status) {
        case 401:
          console.log('You must be logged in to do that.');
          break;
        default:
          console.log('Something bad happened. 😭😭😭');
      }
    };


    /*===========================================
    =            Action Submit Modal            =
    ===========================================*/
    $scope.submitAction = function(){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'submit-action.html',
        controller: 'ActionCtrl',
        size: 'lg',
      });
    };
    /*=====  End of Action Submit Modal  ======*/

};
