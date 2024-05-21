import {
	//ApolloClient,
	//InMemoryCache,
	//ApolloProvider,
	useQuery,
	gql,
} from "@apollo/client";

const USERS = gql`
  query GetUsers {
    users {
      id
      usrName
      loginName
      dadDesignation{
		designationAbbr
		}
    }
  }
`;


function Users() {
	const { loading, error, data } = useQuery(USERS);
	if (loading) return <p>Loading...</p>;
	if (error) {
		console.log(error);
		return <p>Error :(</p>;
	}
	console.log(data);
	return data.users.map(({ id, usrName, loginName, dadDesignation }) => (
		<div key={id}>
			<p>
			
				{id} : {usrName} {loginName} {dadDesignation.designationAbbr}
			</p>
		</div>
	));
}

export default Users;
