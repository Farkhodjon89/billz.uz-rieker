import gql from 'graphql-tag'

const COLORS = gql`
  query COLORS {
    paColors(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
        slug
      }
    }
  }
`
export default COLORS
