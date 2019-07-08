import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({showClear, clearUsers, showAlert }) => {
	const githubContext = useContext(GithubContext);
	const [text, setText] = useState('');

	const onChange = (event) => setText(event.target.value);

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			showAlert('Pls enter text', 'light');
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
				{ showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> }
			</div>
		);
};

Search.propTypes = {
	clearUsers: PropTypes.func.isRequired,
	showAlert: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
};

export default Search;