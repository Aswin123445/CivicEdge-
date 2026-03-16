import axios from "axios";

const handleDownload = async (id,access_token) => {
  try {

    const response = await axios.get(
      `/api/v1/civic/execute/solver/field-verification-report-pdf/${id}/`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const blob = response.data;

    return blob

  } catch (err) {
    throw err;
  }
};

export default handleDownload;