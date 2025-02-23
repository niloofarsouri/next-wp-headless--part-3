export async function getAllPosts(
    searchValue = '',
    searchCategory = '',
    params = { before: null, after: null }
) {
    const hasSearchValue = searchValue && searchValue.trim() !== '';
    const hasSearchCategory = searchCategory && searchCategory.trim() !== '';
    const isPrevious = !!params.before;

    // const variableDefinitions = [
    //     '$perpage: Int!',
    //     isPrevious ? '$before: String' : '$after: String',
    //     hasSearchValue ? '$search: String' : '',
    //     hasSearchCategory ? '$categorySlug: String' : '',
    // ].filter(Boolean).join(',');

    // const whereConditions = [
    //     hasSearchValue ? 'search: $search' : '',
    //     hasSearchCategory ? 'categoryName: $categorySlug' : '',
    // ].filter(Boolean);

    // const whereClause = whereConditions.length > 0 ?
    //     `where: {${whereConditions.join(',')}}`
    //     : '';

    const query = gql`
        query GetPosts(${variableDefinitions}) {
            posts(
                ${isPrevious ? 'last: $perPage' : 'first: $perPage'},
                ${isPrevious ? 'before: $before' : 'after: $after'},
                // ${whereClause}
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
        }`;

    const variables = {
        perPage: 10,
        ...(isPrevious
            ? { before: params.before }
            : { after: params.after }
        )
    };

    if (hasSearchValue) {
        variables.search = searchValue;
    }

    if (hasSearchCategory) {
        variables.categorySlug = searchCategory;
    }

    const dataPosts = await client.request(query, variables);
    return {
        nodes: dataPosts.posts.nodes,
        pageInfo: dataPosts.posts.pageInfo,
        ...(searchValue && { searchValue }),
        ...(searchCategory && { searchCategory })
    };
}

