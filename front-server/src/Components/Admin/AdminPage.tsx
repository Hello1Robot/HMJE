import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLazyGetUserMyinfoQuery } from "../../Store/api";
import Loading from "../Common/Loading";
import AdminCuteImg from "./AdminCuteImg";

function AdminPage():JSX.Element {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [getUserMyinfo, {isLoading}]= useLazyGetUserMyinfoQuery()
  useEffect(()=> {
    getUserMyinfo(userId).unwrap().then((r)=> {
      if (!(r.data.isAdmin)) {
        navigate('/main')
      }
    })
  },[])
  return (
    <>
      {isLoading&&<Loading/>}
      <Outlet/>
      <AdminCuteImg/>
    </>
  )
}
export default AdminPage