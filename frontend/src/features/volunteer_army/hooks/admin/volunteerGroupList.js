import { useState, useEffect, useRef } from "react";
import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import {
  useActivateAdminGroupMutation,
  useArchiveAdminGroupMutation,
  useCreateAdminGroupMutation,
  useFetchAdminGroupListQuery,
  useUpdateAdminGroupMutation,
} from "../../services/admin/groupService";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";

export default function useVolunteerGroupList() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const status = urlSearchParams?.searchParams.get("status") || "";
  const {
    data,
    isLoading: groupisLoading,
    isFetching: groupisFetching,
  } = useFetchAdminGroupListQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    status: status,
  });
  const groupData = data?.results || [];
  const metrix = {
    total: data?.count,
    active_count: data?.active_count,
    archive_count: data?.archive_count,
  };
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };

  const [updateGroup, { isLoading: updateGroupLoading }] =
    useUpdateAdminGroupMutation();

  const [createGroup, { isLoading: createGroupLoading }] =
    useCreateAdminGroupMutation();

  const [activateGroup, { isLoading: activateGroupLoading }] =
    useActivateAdminGroupMutation();

  const [archiveGroup,{isLoading:archiveGroupLoading}] = useArchiveAdminGroupMutation();
  const handleCreateSubmit = async (data) => {
    try {
      await createGroup(data).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Group created successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Image upload failed", description: message });
    }
  };
  const handleActivate = async (group) => {
    try {
      await activateGroup(group?.id).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Group activated successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Action Failed", description: message });
    }
  };


  const handleArchive = async(group) => {
    try {
      await archiveGroup(group?.id).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Group archived successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Action Failed", description: message });
    }
  };

  const handleUpdate = async (group) => {
    try {
      await updateGroup(group).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Group updated successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Action Failed", description: message });
    } finally {
      setEditModalOpen(false);
    }
  }
  const onEditClose = () => setEditModalOpen(false);
  return {
    groupData,
    groupisLoading,
    groupisFetching,
    pagination,
    handleCreateSubmit,
    createGroupLoading,
    isModalOpen,
    setModalOpen,
    handleActivate,
    activateGroupLoading,
    activeDropdown,
    setActiveDropdown,
    dropdownRef,
    handleArchive,
    archiveGroupLoading,
    metrix,
    handleUpdate,
    onEditClose,
    isEditModalOpen,
    setEditModalOpen,
    activeGroup,
    setActiveGroup
  };
}
