import React, { Component } from 'react';
import UploadService from '../services/file-upload.service';

export default class UploadImages extends Component {
	constructor(props) {
		super(props);
		this.selectFile = this.selectFile.bind(this);
		this.upload = this.upload.bind(this);

		this.state = {
			currentFile: undefined,
			previewImage: undefined,
			progress: 0,
			message: '',
		};
	}

	selectFile(event) {
		this.setState({
			currentFile: event.target.files[0],
			previewImage: URL.createObjectURL(event.target.files[0]),
			progress: 0,
			message: '',
		});
	}

	upload() {
		this.setState({
			progress: 0,
		});

		UploadService.upload(this.state.currentFile, (event) => {
			this.setState({
				progress: Math.round((100 * event.loaded) / event.total),
			});
		})
			.then((response) => {
				this.setState({
					message: `<b>Image uploded ! Please visit </b></br> <a href='${response.data.data}' target="_blank">${response.data.data}</a>`,
				});
			})

			.catch((err) => {
				this.setState({
					progress: 0,
					message: 'Could not upload the image! due to ' + err,
					// currentFile: undefined,
				});
			});
	}

	render() {
		const { currentFile, previewImage, progress, message } = this.state;

		return (
			<div>
				<div className='row'>
					<div className='col-8'>
						<label className='btn btn-default p-0'>
							<input type='file' accept='image/*' onChange={this.selectFile} />
						</label>
					</div>

					<div className='col-4'>
						<button className='btn btn-success btn-sm' onClick={this.upload}>
							Upload
						</button>
					</div>
				</div>

				{currentFile && (
					<div className='progress my-3'>
						<div
							className='progress-bar progress-bar-info progress-bar-striped'
							role='progressbar'
							aria-valuenow={progress}
							aria-valuemin='0'
							aria-valuemax='100'
							style={{ width: progress + '%' }}>
							{progress}%
						</div>
					</div>
				)}

				{previewImage && (
					<div>
						<img className='preview' src={previewImage} alt='' />
					</div>
				)}

				{message && (
					<div dangerouslySetInnerHTML={{ __html: message }} />
					// <div className='alert alert-secondary mt-3' role='alert'>
					// 	dangerouslySetInnerHTML={{ __html: message }}
					// 	{/* {message} */}
					// </div>
				)}
			</div>
		);
	}
}
