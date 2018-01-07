export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
	const res = await api.get('/users');

	dispatch({
		type: FETCH_USERS,
		payload: res
	});
};

export const FETCH_CUURENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
	const res = await api.get('/current_user');

	dispatch({
		type: FETCH_CUURENT_USER,
		payload: res
	});
};