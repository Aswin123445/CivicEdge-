import { useDeleteEvidenceMutation, useFetchMembershipDetailQuery, useFetchMembershipEvidenceListQuery, useLeavegroupMutation, useSubmitEvidenceMutation, useUploadEvidenceMutation } from "../../services/citizen/group_service";
import { uploadToCloudinary } from "../../../../utils/cloudinary";
import { useState, useEffect } from "react";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { useNavigate } from "react-router-dom";
export default function useVolunteerMembershipDetail(id) {
  const navigate = useNavigate();
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [evidences, setEvidences] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);


  const {
    data: membershipDetail,
    isLoading: membershipDetailLoading,
    isFetching: membershipDetailFetching,
  } = useFetchMembershipDetailQuery(id);

  const [uploadEvidence,{isLoading:uploadEvidenceLoading}] = useUploadEvidenceMutation();

  const [deleteEvidence,{isLoading:deleteEvidenceLoading}] = useDeleteEvidenceMutation();

  const [submitEvidence,{isLoading:submitEvidenceLoading}] = useSubmitEvidenceMutation();

  const {
    data,
    isLoading: evidenceListLoading,
    isFetching: evidenceListFetching
  } = useFetchMembershipEvidenceListQuery(id);

  const [leavegroup,{isLoading:leavegroupLoading}] = useLeavegroupMutation(id);



  useEffect(() => {
    if (data?.results) {
      setEvidences(data.results);
    }
  }, [data]);

  const handleUpload = async (file) => {
    setIsFileUploading(true);
    try {
      const uploaded = await uploadToCloudinary(file);
      setEvidences((prev) => [...prev, uploaded]);
      await uploadEvidence({data:{file_url:uploaded?.secure_url,description:uploaded?.format},id}).unwrap();
      successToast({ title: "Action Successfull", description: "Evidence uploaded successfully" });
    } catch (error) {
      const message = extractErrorMessage(error); 
      errorToast({ title: "Image upload failed", description: message });
    } finally {
      setIsFileUploading(false);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await deleteEvidence(id).unwrap();
      successToast({ title: "Action Successfull", description: "Evidence deleted successfully" });
    } catch (error) {
      const message = extractErrorMessage(error); 
      errorToast({ title: "Image upload failed", description: message });
    }
  }
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitEvidence(id).unwrap();
      navigate(`/volunteer-army/group/${membershipDetail?.group_id}/`);
      successToast({ title: "Action Successfull", description: "Evidence submitted successfully" });
    } catch (error) {
      const message = extractErrorMessage(error); 
      errorToast({ title: "Submission failed", description: message });
    } finally {
      setSubmitting(false);
    }
    
  };

  const handleLeaveGroup = async (id) => {
    try {
      await leavegroup(id).unwrap();
      navigate(`/volunteer-army/groups`);
      successToast({ title: "Action Successfull", description: "Group left successfully" });
    } catch (error) {
      const message = extractErrorMessage(error); 
      errorToast({ title: "Submission failed", description: message });
    } finally {
      setSubmitting(false);
    }
  };
  return {
    membershipDetail,
    membershipDetailLoading,
    membershipDetailFetching,
    evidences,
    evidenceListLoading,
    evidenceListFetching,
    handleUpload,
    isFileUploading,
    setEvidences,
    uploadEvidenceLoading,
    handleDelete,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    handleLeaveGroup
  };
}