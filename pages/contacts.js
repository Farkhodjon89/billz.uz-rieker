import Layout from "../components/Layout";
import { StaticDataSingleton } from "../utils/staticData";
import CONTACTS from "../queries/contacts";
import client from "../apollo/apollo-client";
import Contacts from "../components/Contacts/contacts";
import SectionTitle from "../components/SectionTitle";
import Breadcrumbs from "../components/Breadcrumbs";
import { HeadData } from "../components/Head";

const ContactsPage = ({ categories, contacts }) => {
  const path = [
    {
      name: "Главная",
      link: "/",
    },
    {
      name: "Контакты/Магазины",
      link: "/contacts",
    },
  ];
  return (
    <>
      <HeadData title={"Контакты"} pageUrl="/contancts" />
      <Layout categories={categories}>
        <div className="container">
          <Breadcrumbs path={path} />
          <SectionTitle title="Контакты/Магазины" />
          <Contacts contacts={contacts} />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);

  const categories = staticData.getRootCategories();

  const constacts = await client.query({
    query: CONTACTS,
    fetchPolicy: "no-cache",
  });

  return {
    props: {
      contacts: constacts.data.paBrands.nodes,
      categories: categories.allCategories,
    },
    revalidate: 60,
  };
}

export default ContactsPage;
