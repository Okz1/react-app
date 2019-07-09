import React, { Fragment } from 'react';
import Search from "../users/Search";
import UsersList from "../users/UsersList";

const Home = () =>  (
	<Fragment>
		<Search />
		<UsersList />
	</Fragment>
);

export default Home;