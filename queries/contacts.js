import gql from 'graphql-tag'

const CONTACTS = gql`
query CONTACTS {
  paBrands {
    nodes {
      name
      brands_settings {
        address
        facebook
        instagram
        telegram
        mapLink
        officeid
        phones {
          phone
        }
        image {
          sourceUrl
        }
      }
    }
  }
}

`
export default CONTACTS
