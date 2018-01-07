import { FETCH_CUURENT_USER } from '../actions';

export default (state = null, action) => {
	switch(action.type) {
		case FETCH_CUURENT_USER:
			return action.payload.data || false;
		default:
			return state;
	}
}