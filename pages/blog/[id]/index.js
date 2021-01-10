import { useRouter } from 'next/router';
import axios from "axios";

const Blog = ({ blog }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Post: {id}</h1>
      <div>
        {blog.title}
      </div>
    </div>
  )
};

export async function getStaticPaths() {
  const blogIds = [1, 2, 3, 4, 5];
  const paths = blogIds.map(id => `/blog/${id}`);

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  const { data: blog } = response;

  return {
    props: {
      blog,
    },
  }
}

export default Blog;
