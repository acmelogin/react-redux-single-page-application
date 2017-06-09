import React from 'react';
import { connect } from 'react-redux';
import userManager from '../../utils/userManager';

class MainPage extends React.Component {

  // display the current user
  showUserInfoButtonClick = (event) => {
    event.preventDefault();
    alert(JSON.stringify(this.props.user, null, 2));
  }

  // log out
  onLogoutButtonClicked = (event) => {
    event.preventDefault();
    userManager.removeUser(); // removes the user data from sessionStorage
    const id_token = this.props.user.id_token;
    const realmId = 'myrealm';
    const post_logout_redirect_uri = window.location.href + '#/abc';
    window.location.href = `https://portal.acmelogin.com/auth/realms/${realmId}/protocol/openid-connect/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${post_logout_redirect_uri}`;
  }

  render() {

    const profile = (this.props.user || {}).profile || {};
    const name = profile.name || profile.preferred_username || 'Mister Unknown';

    return (
      <div style={styles.root}>
        <div style={styles.title}>
          <h3>Welcome, {name}!</h3>
        </div>
        <button onClick={this.showUserInfoButtonClick}>Show user info</button>
        <button onClick={this.onLogoutButtonClicked}>Logout</button>
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    flex: '1 0 auto',
  },
  list: {
    listStyle: 'none',
  },
  li: {
    display: 'flex',
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
