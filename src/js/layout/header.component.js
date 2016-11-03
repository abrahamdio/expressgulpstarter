class AppHeaderCtrl {
  constructor(AppConstants, Auth) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._Auth = Auth;
    this.loginBool = Auth.model.isLoggedInBool;
  }

  logOut(){
    this._Auth.logOut();
    this._Auth.isLoggedInBool = false;
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'layout/header.html'
};

export default AppHeader;
