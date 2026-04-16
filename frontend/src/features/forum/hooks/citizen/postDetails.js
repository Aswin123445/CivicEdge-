import { usePostDetailsQuery } from "../../services/citizen/forumServices";
import { useSelector } from "react-redux";
import  { useState, useEffect} from "react";

export default function usePostDetailsHook(id) {
  const email = useSelector((state) => state.auth.user);


  const {
    data: post,
    isLoading: postLoading,
    isFetching: postFetching,
  } = usePostDetailsQuery(id);
  const user = post?.user;
  useEffect(() => {
    if (user?.email) {
      setIsOwnPost(email === user.email);
    }
  }, [email, user]);
  const [isOwnPost, setIsOwnPost] = useState(email === user?.email);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  return {
    post,
    postLoading,
    postFetching,
    isOwnPost,
    user,
    email,
    isModalOpen,
    setIsModalOpen,
    isCommentModalOpen,
    setIsCommentModalOpen
  };
}
