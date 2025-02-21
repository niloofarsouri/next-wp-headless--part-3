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
  const hasSearchValue = searchValue && searchValue.trim() !== '';
  const hasSearchCategory = searchCategory && searchCategory.trim() !== '';
  const isPrevious = !!params.before;

  const postQuery = gql`
    query getAllPosts($after: String = "", $before: String = "") {
      posts(before: $before, after: $after) {
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


  const variabels = {
    ...(isPrevious
      ? { before: params.before }
      : { after: params.after })
  }

  if (hasSearchValue) {
    variabels.search = searchValue;
  }

  if (hasSearchCategory) {
    variabels.categories = searchCategory;
  }

  const dataPosts = await client.request(postQuery, variabels)
  return {
    nodes: dataPosts.posts.nodes,
    pageInfo: dataPosts.posts.pageInfo,
    ...(searchValue && { searchValue }),
    ...(searchCategory && { searchCategory })

  }
}



export async function getPostBySlug(slug) {
  const postSlugQuery = gql`
    query postSlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
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
  const variabels = { slug }
  const data = await client.request(postSlugQuery, variabels)
  return data.post;
}