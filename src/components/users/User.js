import React, {Fragment, useEffect, useContext } from 'react'
import Spiner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { Link } from "react-router-dom";
import GithubContext from '../../context/github/githubContext'

const User = ({ match }) => {
	const githubContext = useContext(GithubContext);
	const {loading, getUser, user, getUserRepos, repos } = githubContext;
	const {name, avatar_url, location, bio, blog, login, company, html_url, followers, following, public_repos, publick_gist, hireable} = user;

	useEffect(() => {
		getUser(match.params.login).then();
		getUserRepos(match.params.login).then();
		//eslint-disable-next-line
	}, []);

	if (loading) {
		return <Spiner />
	}
	return (
		<Fragment>
			<Link to={'/'} className='btn btn-light'>Back to Search</Link>
			Hireable: { '' }
			{ hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
			<div className="card grid-2">
				<div className="all-center">
					<img src={avatar_url}  className="round-img" style={{width: '150px'}} alt=''/>
					<h1>{name}</h1>
					<p>Location: {location}</p>
				</div>
				<div>
					{bio && <Fragment>
						<h3>Bio</h3>
						<p>{bio}</p>
					</Fragment>}
					<a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
					<ul>
						<li>
							{ login && <Fragment>
								<strong>Username: </strong>{login}
							</Fragment>}
						</li>
						<li>
							{ company && <Fragment>
								<strong>Company: </strong>{company}
							</Fragment>}
						</li>
						<li>
							{ blog && <Fragment>
								<strong>Website: </strong>{blog}
							</Fragment>}
						</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary">Followers: {followers}</div>
				<div className="badge badge-success">Following: {following}</div>
				<div className="badge badge-light">Public Repo: {public_repos}</div>
				<div className="badge badge-dark">Public Gist: {publick_gist}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	);
};

export default User
