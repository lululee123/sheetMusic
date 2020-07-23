import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FormAuth from 'components/molecules/FormAuth';

import { initialState } from 'models/auth';

const stories = storiesOf('molecules/FormAuth', module);

stories.add('with type login', () => (
	<FormAuth
		type="login"
		openModal={action('openModal')}
		closeModal={action('closeModal')}
		updateForm={action('updateForm')}
		Signup={action('Signup')}
		loginFacebook={action('loginFacebook')}
		loginGoogle={action('loginGoogle')}
		Login={action('Login')}
		Forget={action('Forget')}
		auth={initialState}
	/>
));

stories.add('with type signup', () => (
	<FormAuth
		type="signup"
		openModal={action('openModal')}
		closeModal={action('closeModal')}
		updateForm={action('updateForm')}
		Signup={action('Signup')}
		loginFacebook={action('loginFacebook')}
		loginGoogle={action('loginGoogle')}
		Login={action('Login')}
		Forget={action('Forget')}
		auth={initialState}
	/>
));

stories.add('with type reset password', () => (
	<FormAuth
		type="resetPassword"
		openModal={action('openModal')}
		closeModal={action('closeModal')}
		updateForm={action('updateForm')}
		Signup={action('Signup')}
		loginFacebook={action('loginFacebook')}
		loginGoogle={action('loginGoogle')}
		Login={action('Login')}
		Forget={action('Forget')}
		auth={initialState}
	/>
));

stories.add('with type verify', () => (
	<FormAuth
		type="verify"
		openModal={action('openModal')}
		closeModal={action('closeModal')}
		updateForm={action('updateForm')}
		Signup={action('Signup')}
		loginFacebook={action('loginFacebook')}
		loginGoogle={action('loginGoogle')}
		Login={action('Login')}
		Forget={action('Forget')}
		auth={initialState}
	/>
));

stories.add('with type forget', () => (
	<FormAuth
		type="forget"
		openModal={action('openModal')}
		closeModal={action('closeModal')}
		updateForm={action('updateForm')}
		Signup={action('Signup')}
		loginFacebook={action('loginFacebook')}
		loginGoogle={action('loginGoogle')}
		Login={action('Login')}
		Forget={action('Forget')}
		auth={initialState}
	/>
));
