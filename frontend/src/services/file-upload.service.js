import http from '../http-common';
import axios from 'axios';

class FileUploadService {
	upload(file, onUploadProgress) {
		console.log('CURRENT FILE => ', file);
		let formData = new FormData();

		formData.append('image', file);
		const BASE_URL = 'http://localhost:9001';
		return axios.post(BASE_URL + '/api/images/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress,
		});
	}
}

export default new FileUploadService();
