import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UploadImages from './components/image-upload.component';

function App() {
	return (
		<div className='container'>
			<h4>React Image Upload to Moralis</h4>
			<div className='content'>
				<UploadImages />
			</div>
		</div>
	);
}

export default App;
