import React, { Component } from 'react'
import styled from 'styled-components'
import { users } from '/api/server'
import routes from '/router/routes'
import { setHref } from '/store/actions'
import { FormField } from '/components/styled/Form'
import { addNotification } from '/store/actions'
import { ERROR } from '/const/'
import { collect } from 'dop'
import Input from '/components/styled/Input'
import ButtonBig from '/components/styled/ButtonBig'
import {
	RightContainerPadding,
	RightHeader,
	RightContent
} from '/components/styled/Right'
import Div from '/components/styled/Div'
import H1 from '/components/styled/H1'
import Select from '/components/styled/Select'

export default class CreateUser extends Component {
  componentWillMount() {
		this.state = {
      displayName: '',
      email: '',
      password: '',
      role: '',
      input_error: '',
      loading: false
		}

		this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event, field) {
    const value = event.target.value.trim()
    this.setState({[field]: value})
	}

	handleSubmit(event) {
		event.preventDefault()
    const collector = collect()
    const { displayName, email, password, role } = this.state;
		if(displayName && email && password && role) {
      this.setState({loading: true});
      this.setState({input_error: ''})
			users.createUser({ displayName , email, password, role }).then(data => {
        setHref(routes.users())
        addNotification(data)
        this.setState({loading: false});
			}).catch(error => {
        this.setState({loading: false});
				addNotification(error, ERROR)
			});
		} else {
			this.setState({input_error: 'field is required'})
		}
		collector.emit()
	}

	render() {
		return React.createElement(CreateUserTemplate, {
			displayName: this.state.displayName,
			email: this.state.email,
			password: this.state.password,
			role: this.state.role,
			loading: this.state.loading,
			input_error: this.state.input_error,
			handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
		})
	}
}

function CreateUserTemplate({
  displayName,
  email,
  password,
  role,
  input_error,
  handleChange,
  handleSubmit,
  loading
}) {
	return (
		<RightContainerPadding>
      <RightHeader>
          <Div float="left">
              <H1>Create User</H1>
          </Div>
          <Div clear="both" />
      </RightHeader>
      { !loading 
        ? (<RightContent>
          <Container>
            <FormField>
              <Input
                placeholder="Username"
                width="100%"
                type="text"
                value={displayName}
                onChange={(e) => handleChange(e, 'displayName')} 
                error={input_error}
                invalid={input_error && displayName.length === 0}
              />
            </FormField>
            <FormField>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange(e, 'email')} 
                error={input_error}
                invalid={input_error && email.length === 0}
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
                onChange={(e) => handleChange(e, 'password')} 
                error={input_error}
                invalid={input_error && password.length === 0}
              />
            </FormField>
            <FormField>
              <Select
                width="100%"
                onChange={(e) => handleChange(e, 'role')}
                invalid={input_error && role.length === 0}
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
              </FormField>
            <FormField>
                <ButtonBig
                  width="100%"
                  onClick={handleSubmit}
                >
                  Create
                </ButtonBig>
            </FormField>
          </Container>
        </RightContent>)
        : <Center>Sending data...</Center>
      }
		</RightContainerPadding>
	)
}

const Container = styled.div`
  max-width: 550px;
  margin: 100px auto 0 auto;
  padding-top: 20px;
`
const Center = styled.div`
  text-align: center
`