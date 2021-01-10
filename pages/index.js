import Link from 'next/link'

const Index = () => (
  <div>
    <h1>
      Hello world
    </h1>
    <h2>
      Next.js
    </h2>
    <Link href="/about">
      <a>About</a>
    </Link>
    <Link href="/users">
      <a>Users</a>
    </Link>
  </div>
);

export default Index;
