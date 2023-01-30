import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "./constants/styles";
import Allexpenses from "./screens/Allexpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpense from "./screens/RecentExpense";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpenseOverview = () => {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				headerTintColor: "#fff",
				tabBarStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon="add"
						size={24}
						color={tintColor}
						onPress={() => {
							navigation.navigate("ManageExpense");
						}}
					/>
				),
			})}
		>
			<BottomTabs.Screen
				name="RecentExpense"
				options={{
					title: "Recent Expenses",
					tabBarLabel: "Recent",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="hourglass" size={size} color={color} />
					),
				}}
				component={RecentExpense}
			/>
			<BottomTabs.Screen
				options={{
					title: "All Expenses",
					tabBarLabel: "All Expenses",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" size={size} color={color} />
					),
				}}
				name="AllExpenses"
				component={Allexpenses}
			/>
		</BottomTabs.Navigator>
	);
};
export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: {
								backgroundColor: GlobalStyles.colors.primary500,
							},
							headerTintColor: "white",
						}}
					>
						<Stack.Screen
							name="ExpenseOverview"
							options={{ headerShown: false }}
							component={ExpenseOverview}
						/>
						<Stack.Screen
							name="ManageExpense"
							component={ManageExpense}
							title="Manage Expense"
							options={{
								presentation: "modal",
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
