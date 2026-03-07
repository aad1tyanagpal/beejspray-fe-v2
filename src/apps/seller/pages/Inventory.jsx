import { AppText, AppButton, AppInput, AppCard, VStack } 
  from '@/shared/components/common'
import { useDispatch } from 'react-redux'

// import { loginUser } from '@/features/auth/authSlice'

function Inventory() {
  const dispatch = useDispatch()

  const handleInventory = () => {
    // dispatch(loginUser({ email: 'test@test.com', password: '123456' }))
    console.log("Hellow world");
  }

  return (
    <VStack f={1} jc="center" ai="center" padding="$4">
      <AppCard width="100%" maxWidth={400} gap="$3">
        <AppText variant="h2">Login</AppText>

        <AppInput placeholder="Entry name of Item" />
        <AppInput placeholder="Entry aditional details..."  />

        <AppButton onPress={handleInventory}>
          Add Inventory
        </AppButton>
      </AppCard>
    </VStack>
  )
}

export default Inventory
