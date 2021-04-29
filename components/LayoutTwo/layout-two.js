import HeaderTwo from "../HeaderTwo";
import FooterTwo from "../FooterTwo";

const LayoutTwo = ({ children }) => (
  <>
    <HeaderTwo />
    {children}
    <FooterTwo />
  </>
);
export default LayoutTwo;
