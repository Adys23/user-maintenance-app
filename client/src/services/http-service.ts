import axios, { AxiosResponse } from 'axios';
import { User, Hobby } from '../types/types';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080',
	timeout: 1000,
});

export const getUsersList = async (): Promise<User[] | undefined> => {
	try {
		const response: AxiosResponse<User[]> = await axiosInstance.get('/user');
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getHobbiesList = async (): Promise<Hobby[] | undefined> => {
	try {
		const response: AxiosResponse<Hobby[]> = await axiosInstance.get('/hobbies');
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getSingleUser = async (userId:string): Promise<User | undefined> => {
	try {
		const response: AxiosResponse<User> = await axiosInstance.get(`/user/${userId}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteSingleUser = async (
	userId: string
): Promise<boolean | undefined> => {
	try {
		const response: AxiosResponse = await axiosInstance.delete(
			`/user/${userId}`
		);
		return 200 <= response.status && 300 > response.status;
	} catch (error) {
		console.log(error);
		return false;
	}
};
