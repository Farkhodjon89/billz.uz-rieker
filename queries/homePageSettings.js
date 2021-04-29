import gql from "graphql-tag";

const HOMESETTINGS = gql`
  query HOMESETTINGS {
    themeGeneralSettings {
      global_settings {
        slider {
          image {
            sourceUrl
          }
          link
          subtitle
          title
        }
        popularCategories {
          image {
            sourceUrl
          }
          link
          title
        }
      }
    }
    paBrands {
      nodes {
        brands_settings {
          image {
            sourceUrl
          }
        }
        name
      }
    }
  }
`;
export default HOMESETTINGS;
