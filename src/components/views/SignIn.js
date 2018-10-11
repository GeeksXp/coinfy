import React, { Component } from 'react'
import styled from 'styled-components'
import { FormField } from '/components/styled/Form'
import Input from '/components/styled/Input'
import ButtonBig from '/components/styled/ButtonBig'
import { auth } from '/api/server'
import state from '/store/state'
import { addNotification } from '/store/actions'
import { ERROR } from '/const/'
import { collect } from 'dop'
import { setHref}  from '/store/actions'
import routes from '/router/routes'


export default class SignIn extends Component {
	
	componentWillMount() {
		this.state = {
			input_error: ''
		}

		this.handleChangeEmail = this.handleChangeEmail.bind(this)
		this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChangeEmail(event) {
		const value = event.target.value.trim()
		state.user.email = value
	}

	handleChangePassword(event) {
		const value = event.target.value.trim()
		state.user.password = value
	}
	
	handleSubmit(event) {
		event.preventDefault()
		const collector = collect()
		if(state.user.email && state.user.password) {
			this.setState({input_error: ''})

			auth.signIn(state.user.email, state.user.password).then(displayName => {
				setHref(routes.home())
				addNotification(`Welcome ${displayName}`)
			}).catch(error => {
				addNotification(error, ERROR)
			});
		} else {
			this.setState({input_error: 'field is required'})
		}
		collector.emit()
	}

	render() {
		return React.createElement(SignInTemplate, {
			email: state.user.email,
			password: state.user.password,
			input_error: this.state.input_error,
			handleChangeEmail: this.handleChangeEmail,
			handleChangePassword: this.handleChangePassword,
			handleSubmit: this.handleSubmit
		})
	}
}

function SignInTemplate({
	email,
	password,
	input_error,
	handleChangeEmail,
	handleChangePassword,
	handleSubmit
}) {
	return (
		<Container>
			<FormField>
				<Input
					placeholder="Email"
					value={email ? email: ''}
					onChange={handleChangeEmail} 
					error={input_error}
					invalid={input_error && (typeof email === 'undefined' || email.length === 0)}
					width="100%"
					type="text"
				/>
			</FormField>
			<FormField>
				<Input
					placeholder="Password"
					width="100%"
					type="password"
					value={password ? password: ''}
					onChange={handleChangePassword} 
					error={input_error}
					invalid={input_error && (typeof password === 'undefined' || password.length === 0)}
				/>
			</FormField>
			<FormField>
					<ButtonBig
						width="100%"
						onClick={handleSubmit}
					>
						Sign in
					</ButtonBig>
			</FormField>
		</Container>
	)
}

const Container = styled.div`
  max-width: 550px;
	margin: 100px auto 0 auto;
	padding-top: 20px;
`