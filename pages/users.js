import Link from 'next/link'
import axios from 'axios';

const Users = ({ users }) => {
  const userList = users.map(user => (
    <li key={user.id}>
      {user.username}
    </li>
  ));

  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <ul>
      {userList}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  const { data: users } = response;

  return {
    props: {
      users,
    },
  }
}

export default Users;
