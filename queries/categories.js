import gql from 'graphql-tag'

const CATEGORIES = gql`
query CATEGORIES {
  productCategories(first: 100, where: {hideEmpty: true, parent: 0, orderby: MENU_ORDER}) {
    nodes {
      count
      databaseId
      name
      slug
      image {
        sourceUrl
      }
      category_settings {
        mobilesaleimage {
          sourceUrl
        }
      }
      products(first: 3) {
        nodes {
          onSale
          slug
          image {
            sourceUrl
          }
        }
      }
      children(first: 100, where: {hideEmpty: true, orderby: MENU_ORDER}) {
        nodes {
          count
          slug
          name
          databaseId
          category_settings {
            mobilecategoryimage {
              sourceUrl
            }
          }
          products(first: 3) {
            nodes {
              slug
              image {
                sourceUrl
              }
            }
          }
          children(first: 100, where: {hideEmpty: true, orderby: MENU_ORDER}) {
            nodes {
              count
              slug
              name
              databaseId
            }
          }
        }
      }
    }
  }
}
`

export default CATEGORIES
