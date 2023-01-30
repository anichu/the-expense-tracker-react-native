import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
	const { expenses } = useContext(ExpenseContext);
	const { deleteExpense, addExpense, updateExpense } =
		useContext(ExpenseContext);
	const editExpenseId = route?.params?.expenseId;
	const isEditing = !!editExpenseId;

	const selectedExpense = expenses.filter(
		(expense) => expense.id === editExpenseId
	)[0];

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	const deleteExpenseHandler = () => {
		deleteExpense(editExpenseId);
		navigation.goBack();
	};

	const cancelHandler = () => {
		navigation.goBack();
	};
	const confirmHandler = (expenseData) => {
		if (isEditing) {
			updateExpense(editExpenseId, expenseData);
		} else {
			addExpense(expenseData);
		}
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<View style={{ marginVertical: 10 }}>
				<ExpenseForm
					onCancel={cancelHandler}
					onSubmit={confirmHandler}
					submitButtonLabel={isEditing ? "Update" : "Add"}
					defaultValues={selectedExpense}
				/>
			</View>

			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						onPress={deleteExpenseHandler}
						color={GlobalStyles.colors.error500}
						size={36}
					/>
				</View>
			)}
		</View>
	);
};

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
});
