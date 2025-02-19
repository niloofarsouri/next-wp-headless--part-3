const baseUrl = process.env.WORDPRESS_URL;

import { gql, GraphQLClient } from "graphql-request";


const client = new GraphQLClient(`${baseUrl}/graphql`)


export async function getCategories() {

  const query = gql`
    query getCategory {
        categories(first:100){
            nodes{
                 id
                name
                slug
            }
        }
    }
    `;

  const data = await client.request(query)
  return data.categories.nodes;
}





export async function getAllPosts(
  searchValue = '',
  searchCategory = '',
  params = { before: null, after: null }
) {

  const postQuery = gql`
    query getAllPosts {
      posts(before: "", after: "") {
        nodes {
          date
          excerpt(format: RENDERED)
          id
          title
          slug

          categories {
            nodes {
              slug
              name
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
    `;

  const dataPosts = await client.request(postQuery, params)
  return {
    nodes: dataPosts.posts.nodes,
    pageInfo: dataPosts.posts.pageInfo,
    ...(searchValue && { searchValue }),
    ...(searchCategory && { searchCategory })

  }
}



export async function getPostBySlug() {
  const postSlugQuery = gql`
    query MyQuery2 {
      post(id: "", idType: DATABASE_ID) {
        id
        title
        content
        date
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
    `

  const data = await client.request(postSlugQuery)
  return data.post;
}