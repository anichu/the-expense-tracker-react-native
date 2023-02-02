import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
	{
		id: "e1",
		description: "A pair of shoes",
		amount: 59.99,
		date: new Date("2022-12-19"),
	},
	{
		id: "e2",
		description: "A pair of trousers",
		amount: 89.99,
		date: new Date("2022-01-19"),
	},
	{
		id: "e3",
		description: "Some bananas",
		amount: 9.99,
		date: new Date("2022-03-19"),
	},
	{
		id: "e4",
		description: "A book",
		amount: 10.9,
		date: new Date("2022-04-19"),
	},
	{
		id: "e5",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-10-19"),
	},
	{
		id: "e6",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-10-19"),
	},
	{
		id: "e7",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-10-19"),
	},
	{
		id: "e8",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-10-19"),
	},
	{
		id: "e9",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-10-19"),
	},
	{
		id: "e10",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-10-19"),
	},
	{
		id: "e11",
		description: "Another book",
		amount: 18.59,
		date: new Date("2022-10-19"),
	},
];

export const ExpenseContext = createContext({
	expenses: [],
	deleteExpense: (id) => {},
	setExpenses: (expenses) => {},
	addExpense: ({ description, amount, date }) => {},
	updateExpense: (id, { description, amount, date }) => {},
});

const expenseReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			const id = new Date().toString() + Math.random().toString();
			return [{ ...action.payload }, ...state];
		case "UPDATE":
			const updateableExpenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.id
			);
			const updateableExpense = state[updateableExpenseIndex];
			const updatedItem = {
				...updateableExpense,
				...action.payload.data,
			};
			const updatedExpense = [...state];
			updatedExpense[updateableExpenseIndex] = updatedItem;
			return updatedExpense;
		case "SET":
			const inverted = action.payload.reverse();
			return inverted;
		case "DELETE":
			return state.filter((expense) => expense.id !== action.payload);
		default:
			return state;
	}
};

const ExpensesContextProvider = ({ children }) => {
	const [expensesState, dispatch] = useReducer(expenseReducer, []);
	function addExpense(expensesData) {
		dispatch({
			type: "ADD",
			payload: expensesData,
		});
	}

	function updateExpense(id, expensesData) {
		dispatch({
			type: "UPDATE",
			payload: {
				id,
				data: expensesData,
			},
		});
	}
	function setExpenses(expenses) {
		dispatch({
			type: "SET",
			payload: expenses,
		});
	}
	function deleteExpense(id) {
		dispatch({
			type: "DELETE",
			payload: id,
		});
	}

	const value = {
		expenses: expensesState,
		addExpense: addExpense,
		deleteExpense: deleteExpense,
		updateExpense: updateExpense,
		setExpenses: setExpenses,
	};

	return (
		<ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
	);
};

export default ExpensesContextProvider;
