import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GraphQLClient,gql } from 'graphql-request';
import BlogCard from '../components/BlogCard';

const graphcms = new GraphQLClient("https://api-eu-central-1.graphcms.com/v2/cl472djt32u1j01z3eg92gvb9/master");

const query = gql`
  query {
    posts {
      id,
      title,
      datePublished,
      slug,
      content {
        html
      }
      author {
        name,
        avatar {
          url
        }
      }
      coverPhoto {
        url,
      }
    }
  }
    `;

    export async function getStaticProps() {
      const {posts} = await graphcms.request(query);
      return {
        props: {
          posts,
        },
        revalidate: 10,
      }
    };

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard title={post.title} author={post.author} coverPhoto={post.coverPhoto} key={post.id} datePublished={post.datePublished} slug={post.slug} />
        ))}
      </main>

    </div>
  )
}
