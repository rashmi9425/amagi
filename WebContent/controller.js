/**
 * This controller file is created By Rashmi Verma (2016)
 */

app.controller("spotsAPIController", function($scope, $http, $filter) {
	$scope.filteredTodos = [], $scope.currentPage = 1, $scope.numPerPage = 10,
			$scope.maxSize = 5;


	//$sceDelegateProvider.resourceUrlWhitelist(['https://amagi.herokuapp.com/**']);
	
	var orderBy = $filter('orderBy');
	$scope.queryBy = "";
	
	$scope.halt = false;
	$scope.invokeService = function() {

		$scope.url = "https://amagi.herokuapp.com/ui-test/api/v1/spots";
		// Calling API to fetch data
		$http.get($scope.url).success(function(output) {
			$scope.response = output;
          //  console.log(output);
			$scope.halt = true;
			$scope.items2 = $scope.response;

			$scope.fillTableColumns();
			$scope.pagination();
		});

	};
	$scope.invokeService();
	// Add table columns
	$scope.fillTableColumns = function() {
		$scope.tableColumns = [];

		var response = $scope.response[0];

		for ( var i in response) {
			$scope.tableColumns.push(i);

		}

	}

	$scope.order = function(predicate) {
		$scope.predicate = predicate;
		$scope.reverse = !$scope.reverse;
		$scope.response = orderBy($scope.response, predicate, $scope.reverse);
		$scope.pagination();
	};

	
	$scope.displayHistory=function(value){
		if(value!=null)
		   $scope.history=localStorage.getItem(value);
		   else
			   $scope.history="null"; 
		  // if(data!=null)
		 //  $scope.historyArray = data.split(" ");
		
	//	$scope.isCollapsed=!$scope.isCollapsed;
	}
	
	$scope.addHistory = function(search) {
		//var data=localStorage.getItem($scope.queryBy);
		
		if(search!=null)
			localStorage.setItem($scope.queryBy, search);
	//	   localStorage.setItem($scope.queryBy, data+" "+search);
		
	}
	$scope.pagination = function() {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin
				+ $scope.numPerPage;
		if($scope.response!=null)
		$scope.filteredTodos = $scope.response.slice(begin, end);
	}
	

	$scope.$watch('query', function(value){
		
		var search = value;
		var field=$scope.queryBy;
		
		
		 if (field === "aired_at") {
			 $scope.response = $filter('filter')($scope.items2, {
				 aired_at : search
				});
		} else if (field === "client_name") {
			$scope.response = $filter('filter')($scope.items2, {
				client_name : search
			});
		} else if (field === "channel_name") {
			$scope.response = $filter('filter')($scope.items2, {
				channel_name : search
			});
		} else if (field === "city_name") {
			$scope.response = $filter('filter')($scope.items2, {
				city_name : search
			});
		} else if (field === "campaign_name") {
			$scope.response = $filter('filter')($scope.items2, {
				campaign_name : search
			});
		} else if (field === "brand_name") {
			$scope.response = $filter('filter')($scope.items2, {
				brand_name : search
			});
		}
		// $scope.displayHistory();
		 //if($scope.response!=null)
		//	 $scope.addHistory(search);
		$scope.pagination();
	});
	

	
	$scope.$watch('currentPage + numPerPage', function() {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin
				+ $scope.numPerPage;

		if($scope.response!=null)
		$scope.filteredTodos = $scope.response.slice(begin, end);
	});
	
	$scope.$watch('queryBy',function(){
		//$scope.clear();
		$scope.response=$scope.items2
		$scope.pagination();
	
	});

	 $scope.cal=function(dt){
			var dt1=dt;
			var convDate=$filter('date')(dt1,'yyyy-MM-dd');
			$scope.response = $filter('filter')($scope.items2, {
				 aired_at : convDate
				})
			$scope.pagination();
		};
	
	//$scope.dt=null;
	$scope.today = function() {
	    $scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.clear = function() {
	    $scope.dt = null;
	  };

	  $scope.open1 = function() {
	    $scope.popup1.opened = true;
	  };

	  $scope.open2 = function() {
	    $scope.popup2.opened = true;
	  };

	  $scope.setDate = function(year, month, day) {
	    $scope.dt = new Date(year, month, day);
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	 

	  $scope.popup1 = {
	    opened: false
	  };

	  $scope.popup2 = {
	    opened: false
	  };

	
	 

});


app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    
    'https://amagi.herokuapp.com/**'
  ])
  
});