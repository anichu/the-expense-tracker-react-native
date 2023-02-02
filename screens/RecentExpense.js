import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput.js/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays, getFormateDate } from "../utils/date";
import { fetchExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpense = () => {
	const { expenses, setExpenses } = useContext(ExpenseContext);
	const [error, setError] = useState("");
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		async function getExpenses() {
			setIsFetching(true);
			try {
				const fetchExpenses = await fetchExpense();
				setExpenses(fetchExpenses);
			} catch (error) {
				setError("Could not fetch expenses!!!");
			}
			setIsFetching(false);
		}
		getExpenses();
	}, []);

	function errorHandler() {
		setError(null);
	}

	if (error && !isFetching) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	const recentExpenses = expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);
		let date1 = new Date(date7DaysAgo).getTime();
		let date2 = new Date(expense.date).getTime();
		console.log(date2 > date1);
		return date2 > date1 && date2 <= today;
	});
	return (
		<ExpensesOutput
			expensesPeriod="Last 7 days"
			fallBack="there is no recent expense"
			expenses={recentExpenses}
		/>
	);
};

export default RecentExpense;

const styles = StyleSheet.create({});
