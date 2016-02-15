TechAngularTest.controller('rssFeedController', ['$scope','rssFeedService','$sce','$mdDialog', '$mdMedia',function($scope, rssFeedService,$sce,$mdDialog, $mdMedia) {
    // Call the async method and then do stuff with what is returned inside our own then function

    $scope.feedData=[];
    var activefeed=localStorage.getItem("history")===null||localStorage.getItem("history")===""?"":localStorage.getItem("history").split(",")[localStorage.getItem("history").split(",").length-1];
    $scope.feeds=localStorage.getItem("history")===null||localStorage.getItem("history")===""?[]:localStorage.getItem("history").split(",");
    $scope.currentFeed={
        text:""
    };

    $scope.selectFeed=function(url)
    {
        activefeed=url;
        rssFeedService.async(url,function(d) {
            $scope.feedData = d;
            $scope.$apply();
        });
    };

    $scope.getfeeds=function()
    {
     
        return $scope.feeds.slice().reverse();
    };

    $scope.getactivefeed=function(url)
    {
        return url === activefeed?"md-primary":"";
    };

    $scope.translatecontent=function(htmlCode)
    {
        return $sce.trustAsHtml(htmlCode);
    };

    $scope.addFeed=function()
    {
        var index=$scope.feeds.indexOf($scope.currentFeed.text);
        if(index<0) {
            $scope.feeds.push($scope.currentFeed.text);
        }
        $scope.selectFeed($scope.currentFeed.text);
        $scope.currentFeed.text="";

        localStorage.setItem("history", $scope.feeds.join(","));
// Retrieve


       // console.log($scope.currentFeed.text);
    };

    $scope.removeFeed=function(feedurl)
    {


        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this from history?')
            .textContent('This will permanently remove this item from your history')
            .ok('Confirm')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
            var index=$scope.feeds.indexOf(feedurl);
            $scope.feeds.splice(index,1);

            if(activefeed === feedurl)
            {
                activefeed="";
                $scope.feedData=[];
            }

            localStorage.setItem("history", $scope.feeds.join(","));

        }, function() {

        });

    };

    $scope.launchwindow=function(launchurl)
    {
        window.open(launchurl);
    }


    if(activefeed!=="")
    {
      //  $scope.selectFeed(activefeed);
    }


}]);