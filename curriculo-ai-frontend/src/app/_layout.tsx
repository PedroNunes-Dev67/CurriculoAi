import { Stack } from "expo-router";
import { CurriculoDataProvider } from "../context/curriculo-data-context";
import { UserProfileProvider } from "../context/user-profile-context";

export default function Layout() {
  return (
    <UserProfileProvider>
      <CurriculoDataProvider>
        <Stack initialRouteName="login" screenOptions={{ headerShown: false }} />
      </CurriculoDataProvider>
    </UserProfileProvider>
  );
}