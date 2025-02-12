import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);
	const [text, setText] = useState('');

	const onChange = (event) => setText(event.target.value);

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			alertContext.setAlert('Pls enter text', 'light');
		} else {
			githubContext.searchUser(text);
			setText('');
		}
	};

		return (
			<div>
				<form onSubmit={onSubmit} className="form">
					<input type="text" name='text' placeholder="Search User" value={text} onChange={onChange}/>
					<input type="submit" className='btn btn-dark btn-block'/>
				</form>
				{ githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button> }
			</div>
		);
};

export default Search;