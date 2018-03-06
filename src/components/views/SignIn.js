import React, { Component } from 'react'
import styled from 'styled-components'
import styles from '/const/styles'
import dataUsers from '../../const/users'
import {FormField} from '/components/styled/Form'
import Input from '/components/styled/Input'
import ButtonBig from '/components/styled/ButtonBig'
import {signIn} from '../../utils/auth'
import state from '../../store/state'

export default class SignIn extends Component {
	
	componentWillMount() {

    this.state = {
			login: '',
			password: '',
			input_error: '',
			access_error: '',
		}

		this.handleChangeLogin = this.handleChangeLogin.bind(this)
		this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleChangeLogin(event) {
		const value = event.target.value.trim()
		this.setState({login: value})
	}

	handleChangePassword(event) {
		const value = event.target.value.trim()
		this.setState({password: value})
	}
	
	handleSubmit(event) {
		event.preventDefault()
	
		if(this.state.login.length > 0 && this.state.password.length > 0) {
			
			this.setState({input_error: ''})
			let result = dataUsers.filter((data) => {
				return this.validateAccess(data)
			})

			if(result.length) {
				signIn(JSON.stringify(result))
			} else {
				this.setState({access_error: 'Invalid login or password. Please try again.'})
			}
		} else {
			this.setState({input_error: 'field is required'})
		}
	}

	validateAccess(data) {
		if(data.login == this.state.login && data.password == btoa(this.state.password)) {
			return true
		}
		return false
	}
	
	render() {
		return React.createElement(SignInTemplate, {
			login: this.state.login,
			password: this.state.password,
			input_error: this.state.input_error,
			access_error: this.state.access_error,
			handleChangeLogin: this.handleChangeLogin,
			handleChangePassword: this.handleChangePassword,
			handleSubmit: this.handleSubmit
		})
	}
}

function SignInTemplate({
	login,
	password,
	input_error,
	access_error,
	handleChangeLogin,
	handleChangePassword,
	handleSubmit
}) {
	return (
		<Container>
			<FormField>
				<Error>{access_error}</Error>
				<Input
					placeholder="Login"
					value={login}
					onChange={handleChangeLogin} 
					error={input_error}
					invalid={input_error && login.length == 0}
					width="100%"
					type="text"
				/>
			</FormField>
			<FormField>
				<Input
					placeholder="Password"
					width="100%"
					type="password"
					value={password}
					onChange={handleChangePassword} 
					error={input_error}
					invalid={input_error && password.length == 0}
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
const Error = styled.div `
	color: ${styles.color.error};
	font-size: 15px;
	padding: 10px;
`