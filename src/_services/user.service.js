
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ username, password })
    };
    return fetch('http://localhost:3001/auth/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('http://localhost:3001/getUsers', requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' 
                },
        body: JSON.stringify(user)
    };
    return fetch('http://localhost:3001/register', requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`http://localhost:3001/update/${user._id}`, requestOptions).then(handleResponse);;
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Access-Control-Allow-Origin': '*' },
    };
    return fetch(`http://localhost:3001/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}