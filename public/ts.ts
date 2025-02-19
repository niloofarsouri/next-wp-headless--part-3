export async function getAllPosts(
    searchValue: string = '',
    searchCategory: string = '',
    params: { before?: string | null; after?: string | null } = {}
): Promise<{
    posts: Post[],
    pageInfo: {
        startCursor: string | null,
        endCursor: string | null,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
    }
}> {
    const hasSearchValue = searchValue && searchValue.trim() !== '';
    const hasSearchCategory = searchCategory && searchCategory.trim() !== '';
    const isPrevious = !!params.before;

    const variableDefinitions = [
        '$perpage: Int!',
        isPrevious ? '$before: String' : '$after: String',
        hasSearchValue ? '$search: String' : '',
        hasSearchCategory ? '$categorySlug: String' : '',
    ].filter(Boolean).join(',');

    const whereConditions = [
        hasSearchValue ? 'search: $search' : '',
        hasSearchCategory ? 'categoryName: $categorySlug' : '',
    ].filter(Boolean);

    const whereClause = whereConditions.length > 0 ?
        `where: {${whereConditions.join(',')}}`
        : '';

    const query = gql`
                    query GetPosts($(variableDefinitions)){
                        posts(
                            ${isPrevious ? 'last: $perPage' : 'first: $perPage'},
                            ${isPrevious ? 'before: $before' : 'after: $after'},
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
                        }`
    const variabels: any = {
        perPage: 10,
        ...(isPrevious
            ? { before: params.before }
            : { aftre: params.after }
        )
    };

    if (hasSearchValue) {
        variables.search = searchValue;
    }

    if (hasSearchCategory) {
        variables.categorySlug = categories;
    }

    const dataPosts: {
        posts: {
            nodes: Post[],
            pageInfo: {
                startCursor: string | null,
                endCursor: string | null,
                hasNextPage: boolean,
                hasPreviousPage: boolean,
            }
        }
    } = await client.request(query, variabels)
    return {
        nodes: dataPosts.posts.nodes,
        pageInfo: dataPosts.posts.pageInfo,
        ...(searchValue && { searchValue }),
        ...(searchCategory && { searchCategory })
    }
}