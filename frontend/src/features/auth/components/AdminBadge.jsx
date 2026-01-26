import adminbadge from '../../../assets/adminbadge.png';

const AdminBadge = () => {
    return (
        <div className="flex justify-start h-28 w-32 absolute right-64 bottom-72 ">
          <img
            src={adminbadge}
            alt="Rotated"
            className="w-32 h-32 rotate-[-39deg] pb-4"
          />
        </div>
    )
}
export default AdminBadge