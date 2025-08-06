const LogoHeader = ({logo ,classname}) => (
  <div className={`flex items-center mt-auto h-24 w-72 ${classname}`}>
    <img src={logo} alt="CivicEdge Logo" className="" />
  </div>
);
export default LogoHeader;