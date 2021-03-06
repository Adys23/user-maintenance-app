import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User, Hobby } from '../types/types';

const axiosInstance: AxiosInstance = axios.create({
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
		const response: AxiosResponse<Hobby[]> = await axiosInstance.get('/hobby');
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getUser = async (
	userId: string
): Promise<User | undefined> => {
	try {
		const response: AxiosResponse<User> = await axiosInstance.get(
			`/user/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const updateUser = async (user: User): Promise<void | undefined> => {
	try {
		await axiosInstance.post(`/user/${user.id}`, user);
	} catch (error) {
		console.error(error);
	}
};

export const deleteUser = async (
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

export const deleteUsers = async (
	userIds: string[]
): Promise<boolean | undefined> => {
	try {
		const response: AxiosResponse = await axiosInstance.delete('/user', {
			data: userIds,
		});
		return 200 <= response.status && 300 > response.status;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const restoreUsers = async (deletedUserIds: string[]): Promise<boolean | undefined> => {
	try {
		const response: AxiosResponse = await axiosInstance.post('/user/restore', deletedUserIds);
		return 200 <= response.status && 300 > response.status;
	} catch (error) {
		console.log(error);
		return false;
	}
};
