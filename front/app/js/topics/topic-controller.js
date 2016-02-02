'use strict';

module.exports = function($scope, $location, $stateParams, TopicService, ActionService, AuthService, AppSettings) {
  $scope.topic = {};
  $scope.backendUrl = AppSettings.backendUrl;
  console.log('start');
  TopicService.topic($stateParams.topic)
    .then(function(data) {
      console.log('partial loaded');
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
    });


    $scope.upVoteAction = function(id, index) {
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

    $scope.downVoteAction = function(id, index) {
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

    $scope.voteFailed = function(index, error) {
      let topic = $scope.topic.actions[index];

      switch (error.status) {
        case 401:
          console.log('You must be logged in to do that.');
          break;
        default:
          console.log('Something bad happened. 😭😭😭');
      }
    };
};