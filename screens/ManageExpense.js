import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import LoadingOverLay from "../components/UI/LoadingOverlay";
import {
	deleteExpenseBackend,
	storeExpense,
	updateExpenseBackend,
} from "../utils/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
	const { expenses } = useContext(ExpenseContext);
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

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

	const deleteExpenseHandler = async () => {
		deleteExpense(editExpenseId);
		setIsSubmitting(true);
		await deleteExpenseBackend(editExpenseId);
		setIsSubmitting(false);
		navigation.goBack();
	};

	const cancelHandler = () => {
		navigation.goBack();
	};

	const confirmHandler = async (expenseData) => {
		if (isEditing) {
			setIsSubmitting(true);
			try {
				updateExpense(editExpenseId, expenseData);
				await updateExpenseBackend(editExpenseId, expenseData);
			} catch (error) {
				setError("Could not fetch expenses!!!");
			}
			setIsSubmitting(false);
		} else {
			setIsSubmitting(true);

			try {
				const id = await storeExpense(expenseData);
				addExpense({ ...expenseData, id });
			} catch (error) {
				setError("Could not fetch expenses!!!");
			}

			setIsSubmitting(false);
		}
		navigation.goBack();
	};

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} />;
	}

	if (isSubmitting) {
		return <LoadingOverLay />;
	}

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
