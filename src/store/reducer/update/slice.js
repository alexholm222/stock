import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	updateBalance: 0,
	updateSuppliers: 0,
	updateContracts: 0,
	updatePayers: 0,
};
const updateSlice = createSlice({
	name: 'update',
	initialState,

	reducers: {
		setUpdateBalance(state) {
			state.updateBalance = state.updateBalance + 1;
		},

		setUpdateSuppliers(state) {
			state.updateSuppliers = state.updateSuppliers + 1;
		},

		setUpdateContracts(state) {
			state.updateContracts = state.updateContracts + 1;
		},

		setUpdatePayers(state) {
			state.updatePayers = state.updatePayers + 1;
		},
	},
});

export const {
	setUpdateBalance,
	setUpdateSuppliers,
	setUpdateContracts,
	setUpdatePayers
} = updateSlice.actions;

export default updateSlice.reducer;
