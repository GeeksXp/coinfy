import React, { Component } from 'react'
import styled from 'styled-components'
import { users } from '/api/server'

export default class Users extends Component {

	componentWillMount() {
		this.state = {
			loading: false,
			users: {}
		}
		this.setState({loading: true});
		users.getAllUsers().then(data => {
			this.setState({
				users: data,
				loading: false
			});
		})
	}
	componentWillUnmount() {
		this.observer.destroy()
	}

	shouldComponentUpdate() {
		//	return false
	}


	render() {
		return React.createElement(UsersTemplate, {
			users: this.state.users,
			loading: this.state.loading
		})
	}
}

function UsersTemplate({ users, loading }) {
	return (
		<Container>
			<h1>Page only for admin</h1>
			{	!loading
					? (<ul>
					{users.map(user => (
						<li>{user.username}</li>
					))}
				</ul>)
				: <p>Loading...</p>
			}
		</Container>
	)
}

const Container = styled.div`
  max-width: 550px;
	margin: 0 auto;
	padding-top: 20px;
`