import React from 'react';
import Posts from '../components/Posts';

const IndexPage = () => {
	return (
		<>
			<h1> server side rendering :) </h1>
            <div>where is my reloading, nop nop</div>
			<div>
                <Posts />
			</div>
		</>
	);
};

export default IndexPage;
