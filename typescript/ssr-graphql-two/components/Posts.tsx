import React from 'react';
import { withApollo } from '../libs/apollo';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const ALL_CHARACTERS = gql`
	query getPosts {
		posts {
            id
            title
            content
		}
	}
`;


const Posts = () => {
	const { loading, error, data } = useQuery(ALL_CHARACTERS);
	if (error) return <h1>Error</h1>;
	if (loading) return <h1>Loading...</h1>;

	return (
		<>
			<h1> server side rendering :) </h1>
            <div>where is my reloading</div>
			<div>
				{data.posts.map((data) => (
					<ul key={data.id}>
						<li>{data.title} - {data.content}</li>
					</ul>
				))}
			</div>
		</>
	);
};

export default withApollo({ ssr: true })(Posts);

