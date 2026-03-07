import { AppButton } from '@/shared/components/common';

export default function Dashboard() {
    const handleLogin = () =>{
        console.log("Hello world");
    }
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the admin page</p>
            <p>jghjghkehgjkherk</p>
            <AppButton variant="danger" onPress={handleLogin}>
                      Sample
            </AppButton>
        </div>
    );
}