import './SigninPage.css';
import React from "react";
import {ReactComponent as Logo} from '../components/svg/logo.svg';
import { Link } from "react-router-dom";

// [TODO] Authenication
import { signIn } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';

export default function SigninPage() {

  const [cognitoErrors, setCognitoErrors] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState('');

  // async function signIn({ username, password }) {
  //   try {
  //     const { isSignedIn, nextStep } = await signIn({ username, password });
  //   } catch (error) {
  //     console.log('error signing in', error);
  //   }
  // }
  async function setupCurrentSession() {
    try {
      let session = (await fetchAuthSession()) ?? {};
      console.log(session)

    } catch (err) {
      console.log(err);
    }
  }

  const onsubmit = async (event) => {
    setCognitoErrors('')
    event.preventDefault();
    console.log(email)
    //await currentAuthenticatedUser()
    // Auth.signIn(username, password)
    await signIn({ username: email, password: password })
      .then(async user => {
        console.log(user)
        await setupCurrentSession()
        //localStorage.setItem("access_token", user.signInUserSession.accessToken.jwtToken)
        window.location.href = "/"
      })
      .catch(error => {
        if (error.code == 'UserNotConfirmedException') {
          window.location.href = "/confirm"
        }
        setCognitoErrors(error.message)
      });

    return false
  }
  // const onsubmit = async (event) => {
  //   event.preventDefault();
  //   setErrors('')
  //   console.log('onsubmit')
  //   if (Cookies.get('user.email') === email && Cookies.get('user.password') === password){
  //     Cookies.set('user.logged_in', true)
  //     window.location.href = "/"
  //   } else {
  //     setErrors("Email and password is incorrect or account doesn't exist")
  //   }
  //   return false
  // }

  const email_onchange = (event) => {
    setEmail(event.target.value);
  }
  const password_onchange = (event) => {
    setPassword(event.target.value);
  }

  let el_errors;
  if (cognitoErrors){
    el_errors = <div className='errors'>{cognitoErrors}</div>;
  }

  return (
    <article className="signin-article">
      <div className='signin-info'>
        <Logo className='logo' />
      </div>
      <div className='signin-wrapper'>
        <form 
          className='signin_form'
          onSubmit={onsubmit}
        >
          <h2>Sign into your Cruddur account</h2>
          <div className='fields'>
            <div className='field text_field username'>
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={email_onchange} 
              />
            </div>
            <div className='field text_field password'>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={password_onchange} 
              />
            </div>
          </div>
          {el_errors}
          <div className='submit'>
            <Link to="/forgot" className="forgot-link">Forgot Password?</Link>
            <button type='submit'>Sign In</button>
          </div>

        </form>
        <div className="dont-have-an-account">
          <span>
            Don't have an account?
          </span>
          <Link to="/signup">Sign up!</Link>
        </div>
      </div>

    </article>
  );
}