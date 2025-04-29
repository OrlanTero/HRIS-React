# API Context

This directory contains context providers for the application, including the ApiContext which centralizes all API calls.

## ApiContext

The ApiContext provides a centralized way to manage API calls throughout the application. It handles:

1. Base URL configuration
2. Authentication token management
3. Standard HTTP methods (GET, POST, PUT, etc.)
4. Error handling

### Configuration

The API base URL is configured in the `.env` file:

```
REACT_APP_API_URL=http://localhost:5000
```

You can change this URL in the `.env` file to point to a different API server.

### Usage

To use the ApiContext in your components:

```jsx
import { useApi } from '../contexts/ApiContext';

const MyComponent = () => {
  const api = useApi();
  
  const fetchData = async () => {
    try {
      // GET request
      const response = await api.get('/api/endpoint');
      
      // POST request
      const newItem = await api.post('/api/endpoint', { data: 'value' });
      
      // PUT request
      await api.put(`/api/endpoint/${id}`, { data: 'updated' });
      
      // DELETE request
      await api.delete(`/api/endpoint/${id}`);
    } catch (error) {
      console.error('API error:', error);
    }
  };
  
  return (
    // Your component JSX
  );
};
```

### Benefits

1. **Centralized Configuration**: Change the API URL in one place
2. **Authentication Management**: Auth tokens are automatically included in requests
3. **Consistent Error Handling**: Standardized approach to API errors
4. **Reduced Code Duplication**: No need to set up headers and configs in every component

### Advanced Usage

The ApiContext also provides access to the underlying axios instance for advanced use cases:

```jsx
// Access the raw axios instance
const response = await api.client.request({
  method: 'get',
  url: '/custom/endpoint',
  params: { query: 'value' }
});

// Dynamically change the base URL (for switching environments)
api.setBaseUrl('https://new-api-url.com');
``` 