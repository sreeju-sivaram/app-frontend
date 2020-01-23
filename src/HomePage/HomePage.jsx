import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import { userActions } from '../_actions';

class HomePage extends React.Component {

    constructor(){
        super();
        this.state = {
            show: false
        }
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
      };
    
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    handleChangePassword(formData) {
        const {currentPassword, newPassword, newPasswordRepeated} = formData;
        console.log('formData---', formData);
        // return (e) => this.props.updateUser(user);
      }

    rendorChangePasswordForm(user) {
        return (
            <div>
              <ChangePasswordForm user={user} onSubmit={this.handleChangePassword.bind(this)} />
              <button className="btn btn-primary form-group" onClick={()=> this.setState({show: false})}>Cancel</button>
            </div>
          );
    }

    handleUpdateUser(user) {
        this.setState({
            show: true
        })
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user._id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user._id)}>Delete</a></span>
                                }
                                {
                                   <span> - <a onClick={()=>this.handleUpdateUser(user)}>Update Password</a></span> 
                                }
                            </li>
                        )}
                    </ul>
                }
                {this.state.show && this.rendorChangePasswordForm()}
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    updateUser: userActions.update
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };