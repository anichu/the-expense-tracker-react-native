import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput.js/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

const RecentExpense = () => {
	const { expenses } = useContext(ExpenseContext);
	const recentExpenses = expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);
		return expense.date > date7DaysAgo;
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
