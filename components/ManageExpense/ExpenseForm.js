import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormateDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
	onCancel,
	onSubmit,
	submitButtonLabel,
	defaultValues,
}) => {
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues?.amount?.toString() : "",
			isValid: true,
		},
		date: {
			value: defaultValues ? getFormateDate(defaultValues.date) : "",
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues?.description : "",
			isValid: true,
		},
	});

	function inputChangeHandler(name, value) {
		setInputs((prev) => {
			return {
				...prev,
				[name]: {
					value,
					isValid: true,
				},
			};
		});
	}

	const submitHandler = () => {
		const expenseData = {
			amount: +inputs.amount.value,
			date: new Date(inputs.date.value),
			description: inputs.description.value,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid = expenseData.date.toString() !== "Invalid Date";
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			// Alert.alert("Invalid Input", "Please check your input values");
			setInputs((currInputs) => {
				return {
					amount: {
						value: currInputs.amount.value,
						isValid: amountIsValid,
					},
					date: {
						value: currInputs.date.value,
						isValid: dateIsValid,
					},
					description: {
						value: currInputs.description.value,
						isValid: descriptionIsValid,
					},
				};
			});
			return;
		}

		onSubmit(expenseData);
	};

	const formIsValid =
		!inputs.amount.isValid ||
		!inputs.date.isValid ||
		!inputs.description.isValid;

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input
					style={styles.rowInput}
					label="Amount"
					textInputConfig={{
						KeyboardType: "decimal-pad",
						onChangeText: (value) => inputChangeHandler("amount", value),
						value: inputs.amount.value,
					}}
					invalid={!inputs.amount.isValid}
				/>

				<Input
					style={styles.rowInput}
					label="Date"
					textInputConfig={{
						placeholder: "YYYY-MM-DD",
						maxLength: 10,
						onChangeText: (value) => inputChangeHandler("date", value),
						value: inputs.date.value,
					}}
					invalid={!inputs.date.isValid}
				/>
			</View>

			<Input
				label="Description"
				textInputConfig={{
					multiline: true,
					// autoCorrect:false default is true
					onChangeText: (value) => inputChangeHandler("description", value),
					value: inputs.description.value,
				}}
				invalid={!inputs.description.isValid}
			/>
			{formIsValid && (
				<Text style={styles.errorText}>
					Invalid Input -please check your entered data!
				</Text>
			)}
			<View style={styles.buttons}>
				<Button style={styles.button} mode="flat" onPress={onCancel}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={submitHandler}>
					{submitButtonLabel}
				</Button>
			</View>
		</View>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	form: {
		marginTop: 20,
	},
	inputsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowInput: {
		flex: 1,
	},
	title: {
		fontWeight: "bold",
		fontSize: 18,
		color: "white",
		textAlign: "center",
		marginVertical: 40,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
		textAlign: "center",
	},
	errorText: {
		textAlign: "center",
		color: GlobalStyles.colors.error500,
	},
});
