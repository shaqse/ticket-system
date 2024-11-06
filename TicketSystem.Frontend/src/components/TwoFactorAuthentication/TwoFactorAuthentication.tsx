import { useForm } from '@mantine/form';
import {
  Group,
  Button,
  Text,
  Space,
  Paper,
  PaperProps,
  Stack,
  Box,
  TextInput,
} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './TwoFactorAuthentication.css';

type FormValues = {
  username: string,
  verificationCode: string
}

export function TwoFactorAuthentication(props: PaperProps) {
  const location = useLocation();
  const { username, qrCodeImageUrl } = location.state as any;
  const form = useForm({
    initialValues: {
      username: username,
      verificationCode: ""
    },
    validate: {
      verificationCode: (val) => (val.length !== 6 ? 'Verification code should be 6 characters' : null),
    },
  });

  const handleVerify = async (twoFactorAuthDetails: FormValues) => {
    const twoFactorAuthApiEndpoint = "http://localhost:5000/2fa/validate";
    try {
      const apiResponse = await axios.post(twoFactorAuthApiEndpoint, twoFactorAuthDetails);
      const twoFactorAuthData = apiResponse.data;
      console.log(twoFactorAuthData.message);
      window.location.href = '/';
    }
    catch (error) {
      console.error(error);
    } 
  };

  return (
    <div className="authentication-form-container">
      <Paper className="authentication-form-paper" radius="md" p="xl" withBorder {...props}>
        <Link to="/two-factor-authentication">
          <img 
            src="https://www.threatcenter.se/css/images/logo-tpc.svg" 
            alt="Logo" 
            style={{ width: '100px', height: 'auto', display: 'block', margin: '20px auto' }} 
          />
        </Link>
        <Space h="lg" />
        <Text size="lg" fw={500}>
          Set up Two-Factor Authentication
        </Text>
        <p>Scan the QR code with your Authenticator app:</p>
        <img src={qrCodeImageUrl} alt="QR Code" />
        <form onSubmit={form.onSubmit(handleVerify)}>
          <Stack>
            <TextInput
                required
                label="Enter the verification code from your Authenticator app"
                placeholder="Verification Code"
                value={form.values.verificationCode}
                onChange={(event) => form.setFieldValue('verificationCode', event.currentTarget.value)}
                error={form.errors.verificationCode && 'Verification code should be 6 characters'}
                radius="md"
              />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Box />
            <Button type="submit" radius="xl">
              Validate
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}

export default TwoFactorAuthentication;