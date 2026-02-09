const LogoHeader = ({logo ,classname,classname2 = ''}) => (
  <div className={`flex items-center mt-auto h-24 w-72 ${classname}`}>
    <img src={logo} alt="CivicEdge Logo" className={`${classname2}`} />
  </div>
);
export default LogoHeader;