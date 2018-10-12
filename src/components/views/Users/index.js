import React, { Component } from 'react'
import styled from 'styled-components'
import { users } from '/api/server'
import routes from '/router/routes'
import { setHref } from '/store/actions'
import IconTrash from 'react-icons/lib/md/delete'
import IconEdit from 'react-icons/lib/md/mode-edit'
import {
	RightContainerPadding,
	RightHeader,
	RightContent
} from '/components/styled/Right'
import Div from '/components/styled/Div'
import H1 from '/components/styled/H1'
import ButtonBig from '/components/styled/ButtonBig'
import { addNotification } from '/store/actions'
import state from '/store/state'

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

		this.deleteUser = this.deleteUser.bind(this)
	}

	deleteUser(id) {
		const res = confirm('Are you sure?')
		if(res) {
			this.setState({loading: true});
			if(state.user.id !== id) {
				users.deleteUser(id).then(data => {
					addNotification(data)
					const dataUsers = this.state.users.filter(item => {
						return item.id !== id
					})
					this.setState({
						users: dataUsers,
						loading: false
					});
				})
			}
			addNotification("You can\'t delete this user", ERROR)
			this.setState({loading: false});
		}
	}


	render() {
		return React.createElement(UsersTemplate, {
			users: this.state.users,
			loading: this.state.loading,
			deleteUser: this.deleteUser
		})
	}
}

function UsersTemplate({ users, loading, deleteUser }) {
	return (
		<RightContainerPadding>
			<RightHeader>
					<Div float="left">
							<H1>Users</H1>
					</Div>
					<RightHeaderButtonBlock>
						<ButtonBig
							onClick={() => setHref(routes.createUser())}
						>
							Create user
						</ButtonBig>
					</RightHeaderButtonBlock>
					<Div clear="both" />
			</RightHeader>
			<RightContent>
			{	!loading
				? (	<div class="limiter">
							<div class="container-table100">
								<div class="wrap-table100">
									<div class="table100">
										<table>
											<thead>
												<tr class="table100-head">
													<th class="column1">№</th>
													<th class="column2">Name</th>
													<th class="column3">Email</th>
													<th class="column4" colspan="3">Role</th>
												</tr>
											</thead>
											<tbody>
												{users.map((item, index) => (
													<tr>
														<td class="column1">{index+1}</td>
														<td class="column2">{item.displayName}</td>
														<td class="column3">{item.email}</td>
														<td class="column4">{item.role}</td>
														<td class="column5"><IconEdit onClick={() => setHref(routes.editUser({id: item.id}))} size={25} color="green" /></td>
														<td class="column6">{state.user.id !== item.id && <IconTrash onClick={() => deleteUser(item.id)} size={25} color="red" />}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>)
					: <Center>Loading...</Center>
				}
			</RightContent>
		</RightContainerPadding>
	)
}

const RightHeaderButtonBlock = styled.div`
	width: 100px;
	float: right;
`
const Center = styled.div`
	text-align: center
`