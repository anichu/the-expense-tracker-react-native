import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput.js/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";

const Allexpenses = () => {
	const { expenses } = useContext(ExpenseContext);
	return <ExpensesOutput expensesPeriod="Last 7 days" expenses={expenses} />;
};

export default Allexpenses;

const styles = StyleSheet.create({});
