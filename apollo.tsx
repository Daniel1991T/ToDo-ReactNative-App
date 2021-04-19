import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage  from '@react-native-community/async-storage'

const URI = 'http://10.0.2.2:4000/' // this URL should be set depending on the platform you run the application

const httpLink = createHttpLink({
  uri: URI
})

const authLink = setContext( async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token || '',
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache: new InMemoryCache()
})