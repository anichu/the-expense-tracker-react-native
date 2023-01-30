import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
	const { amount, description, date, id } = itemData.item;
	return (
		<ExpenseItem
			amount={amount}
			id={id}
			date={date}
			description={description}
		/>
	);
}

const ExpensesList = ({ expenses }) => {
	return (
		<View>
			<FlatList
				data={expenses}
				keyExtractor={(item) => item.id}
				renderItem={renderExpenseItem}
			/>
		</View>
	);
};

export default ExpensesList;

const styles = StyleSheet.create({});
