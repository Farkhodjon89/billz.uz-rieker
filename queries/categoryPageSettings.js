import gql from 'graphql-tag'

const PAGESETTINGS = gql`
  query PAGESETTINGS($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      category_settings {
        bannerone {
          image {
            sourceUrl
          }
          brand {
            sourceUrl
          } 
          link
          subtitle
          title
        }
        bannerthree {
          brand {
            sourceUrl
          }
          image {
            sourceUrl
          }
          link
          title
        }
        bannertwo {
          image {
            sourceUrl
          }
          
          link
          title
        }
        popularCategories {
          image {
            sourceUrl
          }
          link
          title
        }
        slider {
          image {
            sourceUrl
          }
          buttontitle
          link
          subtitle
          title
        }
      }
    }
  }
`
export default PAGESETTINGS
