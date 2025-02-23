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
  searchValue,
  searchCategory,
  params = { before: null, after: null }
) {
  const hasSearchValue = searchValue && searchValue.trim() !== '';
  const hasSearchCategory = searchCategory && searchCategory.trim() !== '';
  const isPrevious = !!params.before;

  const variableDefinition = [
    isPrevious ? '$before: String' : '$after: String',
    hasSearchValue ? '$search: String' : '',
    hasSearchCategory ? '$categories: String' : '',
  ].filter(Boolean).join(', ')

  const whereConditions = [
    hasSearchValue ? 'search: $search' : '',
    hasSearchCategory ? 'categories: $categories' : '',
  ].filter(Boolean);

  const whereClause = whereConditions.length > 0 ?
    `where: {${whereConditions.join(',')}}`
    : '';

  const postQuery = gql`
    query getAllPosts(${variableDefinition}) {
      posts(${isPrevious ? 'before: $before' : 'after: $after'},
            ${whereClause}
      ) {
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
      : { after: params.after }),
    // searchValue,
    // searchCategory

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