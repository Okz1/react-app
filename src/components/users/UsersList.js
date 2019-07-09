import React, { useContext } from 'react';
import Useritem from "./Useritem";
import Spinneer from '../layout/Spinner'
import GitHubContext from '../../context/github/githubContext'

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
};

const UsersList = () =>{
	const gitHubContext = useContext(GitHubContext);

	const {loading, users} = gitHubContext;

	if(loading) {
	 return	<Spinneer />
	} else {
		return (
			<div style={userStyle}>
				{users.map(user => (
					<Useritem key={user.id} user={user}/>
				))}
			</div>
		);
	}
};

export default UsersList;
