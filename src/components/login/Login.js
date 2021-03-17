import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './../utils/Commons';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
	const json = JSON.stringify({userName: username.value, password: password.value});
    axios.post('http://localhost:8080/team/signin', json, {
	  headers: {
	    // Overwrite Axios's automatically set Content-Type
	    'Content-Type': 'application/json'
	  }
	}).then(response => {
	console.log(response);
	
      setLoading(false);
		console.log(response.data.team_no);
      setUserSession(response.data.team_no, response.data.team_name);

      //props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
	// if (error.response.status === 401) setError('UnAuthorized Access');
    });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;