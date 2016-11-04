function ShowAuthed(Auth){
	'ngInject';

	return{
		restrict: 'A',
		link: function(scope, element, attrs){
			scope.Auth = Auth;
			
			scope.$watch('Auth.isLoggedInBool', function(val){
				if(val){
					if (attrs.showAuthed === 'true'){
						element.css({display:'inherit'})
					}
					else {
						element.css({display: 'none'})
					}
				
				} else {
					if(attrs.showAuthed === 'true'){
						element.css({display: 'none'})
					} else {
						element.css({display: 'inherit'})
					}
				}

			});
		}
	}
}

export default ShowAuthed;