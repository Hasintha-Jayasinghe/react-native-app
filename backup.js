if (getUser() !== null) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} else {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup or login" component={Prompt} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
