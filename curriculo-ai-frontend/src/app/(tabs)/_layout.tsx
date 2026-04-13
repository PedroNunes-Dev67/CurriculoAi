import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen name="cadastro" />
      <Tabs.Screen name="formacao" />
      <Tabs.Screen name="experiencia" />
      <Tabs.Screen name="etapa4" />
    </Tabs>
  );
}