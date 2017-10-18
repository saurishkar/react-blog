import React,{ Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class NavbarSub extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Navbar>
				<Nav>
					<NavItem eventKey={2.1} href="#"> Users</NavItem>
					<NavItem eventKey={2.2} href="#"> Books</NavItem>
					<NavItem eventKey={2.3} href="#"> Videos</NavItem>
					<NavItem eventKey={2.4} href="#"> More..</NavItem>
				</Nav>
			</Navbar>
		);
	}
}

export default NavbarSub;