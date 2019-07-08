import React from 'react';
import Useritem from "./Useritem";
import Spinneer from '../layout/Spinner'
import PropTypes from 'prop-types';

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
};

const UsersList = ({ users, loading }) =>{
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

UsersList.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default UsersList;
