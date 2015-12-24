OptionsPanel = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      user: Meteor.user()
    };
  },

  facebookLogout(e) {
    e.stopPropagation();
    ga('send', 'facebook-logout');
    Meteor.logout(function(err){
      if (err) {
        throw new Meteor.Error("Logout failed");
      }
    });
  },

  facebookLogin(e) {
    e.stopPropagation();
    ga('send', 'facebook-login');
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      }
    });
  },

  render() {
    var list;
    if(this.data.user) {
      list = (
        <ul className="options-list">
          <li data-target="high-scores">
            high scores
          </li>
          <li className="facebook-logout" onClick={this.facebookLogout}>
            logout with facebook
          </li>
          <li data-target="rules">
            how to play
          </li>
          <li data-target=" ">
            play the game
          </li>
        </ul>
      );
    } else {
      list = (
        <ul className="options-list">
          <li className="facebook-login" onClick={this.facebookLogin}>
            login with facebook
          </li>
          <li data-target="rules">
            how to play
          </li>
          <li className="no-color">
            <a data-target=" ">playing without signing in</a> means that your high scores won't be saved.
          </li>
        </ul>
      );
    }

    return (
      <div className="options-panel panel">
        {list}
      </div>
    );
  }
});