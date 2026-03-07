import { AppText, AppButton, AppInput, AppCard, VStack } 
  from '@/shared/components/common'
import { useDispatch } from 'react-redux'

// import { loginUser } from '@/features/auth/authSlice'

function Users() {
  const dispatch = useDispatch()

  const handleLogin = () => {
    // dispatch(loginUser({ email: 'test@test.com', password: '123456' }))
    console.log("Hellow world");
  }

  return (
    <VStack f={1} jc="center" ai="center" padding="$4">
      <AppCard width="100%" maxWidth={400} gap="$3">
        <AppText variant="h2">Login</AppText>

        <AppInput placeholder="Email" />
        <AppInput placeholder="Password" secureTextEntry />

        <AppButton onPress={handleLogin}>
          Login
        </AppButton>
      </AppCard>
    </VStack>
  )
}

export default Users
