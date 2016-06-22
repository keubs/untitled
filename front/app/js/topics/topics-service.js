'use strict';

/**
 * @ngInject
 */
function TopicService($q, $http, AppSettings, AddressService) {
  var service = {};

  service.get = function(tag) {

    var deferred = $q.defer();
    var url = '';
    if(tag) {
      url = AppSettings.apiUrl + '/topics/tag/' + tag + '/';
    } else {
      url = AppSettings.apiUrl + '/topics/?order_by=score';
    }
    $http.get(url)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.topic = function(id) {
    var deferred = $q.defer();


    $http.get(AppSettings.apiUrl + '/topics/' + id)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.topic_actions = function(id) {
    var deferred = $q.defer();

    $http.get(AppSettings.apiUrl + '/topics/' + id + '/actions/')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

      return deferred.promise;
  };

  service.new = function(topic) {
    var deferred = $q.defer();
    AddressService.submit(topic.address)
      .then(function(data){
        topic.address = data.id;
        $http.post(AppSettings.apiUrl + '/topics/' + 'submit', topic)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(err, status) {
            console.log(err, status);
            deferred.reject({err, status});
          });
      }, function(error){
        console.log(error);
      });

    return deferred.promise;
  };

  service.find = function(topicId) {
    console.log(topicId);
  };

  service.delete = function(topicId) {
    console.log(topicId);
  };

  service.addComment = function(topicId, comment) {
    console.log(topicId, comment);
  };

  service.deleteComment = function(topicId, comment) {
    console.log(topicId, comment);
  };

  service.og = function(url) {
    var deferred = $q.defer();
    $http.post(AppSettings.apiUrl + '/getopengraph/', {url: url})
      .success(function(data) {
        console.log(data);
        deferred.resolve(data);
      })
      .error(function(err, status) {
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.upVote = function(topicId) {
    console.log('upVote', topicId);

    var deferred = $q.defer();

    $http.post(AppSettings.apiUrl + '/topics/' + topicId + '/rate/1')
      .success(function(data) {
        console.log(data);
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.downVote = function(topicId) {
    console.log('downVote', topicId);

    var deferred = $q.defer();

    $http.post(AppSettings.apiUrl + '/topics/' + topicId + '/rate/-1')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.clearVote = function(topicId) {
    console.log('clearVote', topicId);

    var deferred = $q.defer();

    $http.post(AppSettings.apiUrl + '/topics/' + topicId + '/rate/0')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  return service;
}

module.exports = TopicService;
