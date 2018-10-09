import React, { Component } from 'react'
import styled from 'styled-components'

export default class Users extends Component {

	render() {
		return React.createElement(UsersTemplate)
	}
}

function UsersTemplate() {
	return (
		<Container>
			<h1>Page only for admin</h1>
		</Container>
	)
}

const Container = styled.div`
  max-width: 550px;
	margin: 0 auto;
	padding-top: 20px;
`