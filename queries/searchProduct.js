import gql from 'graphql-tag'

const SEARCHPRODUCT = gql`
query SEARCHPRODUCT($first: Int, $categories: [String], $search: String) {
  products(first: $first, where: {status: "publish", categoryIn: $categories, search: $search}) {
    pageInfo {
      endCursor
      hasNextPage
    }
    nodes {
      databaseId
      slug
      image {
        sourceUrl
      }
    }
  }
}

`
export default SEARCHPRODUCT
