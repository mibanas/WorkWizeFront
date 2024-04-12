export const login = async (userData: { email: string, password: string }) => {
        const response = await fetch('http://localhost:3002/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
          
      return response

  };