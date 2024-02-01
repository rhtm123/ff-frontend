import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useState } from "react";

import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

// Dynamically import PDFViewer
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  {
    ssr: false,
  }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFDownloadLink),
  {
    ssr: false,
  }
);

export default function Nominee({ flatMember, isOwner }) {
  const { authSociety } = useAuth();
  //  console.log(flatMember);
  // console.log(isOwner);
  console.log(authSociety);

  const [formData, setFormData] = useState({
    nominationId: "",
    nomineeName: "",
    witnessName1: "",
    witnessName2: "",
    witnessAddress1: "",
    witnessAddress2: "",
  });

  const [nominationList, setNominationList] = useState([]);

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const PDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text
            style={{
              margin: "4px 0px",
              textAlign: "center",
              fontSize: "16px",
              textTransform: "uppercase",
            }}
          >
            {authSociety?.name}
          </Text>

          <Text
            style={{ textAlign: "center", fontSize: "14px", margin: "1px 0px" }}
          >
            REGN. NO : {authSociety?.registrationNumber}
          </Text>

          <Text
            style={{ textAlign: "center", fontSize: "14px", margin: "1px 0px" }}
          >
            {authSociety?.address?.address1}
          </Text>

          <Text
            style={{ textAlign: "center", fontSize: "14px", margin: "1px 0px" }}
          >
            {authSociety?.address?.address2}
          </Text>

          <View style={styles.table}>
            <Text style={styles.tableColumn1}>No. NOMINATION_ID</Text>
            <Text style={styles.tableColumn2}>
              <Text style={{ textAlign: "center" }}>ORIGINAL</Text>
              {"\n"}
              <Text style={{ textAlign: "center", marginTop: "10px" }}>
                {" "}
                FORM OF NOMINATION{" "}
              </Text>
              {"\n"}
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  justifyContent: "space-evenly",
                }}
              >
                (Under the Bye-Law Nos.32)
              </Text>
              {"\n"}
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  justifyContent: "space-evenly",
                }}
              >
                TO BE FURNISHED IN DUPLICATE (APPLICABLE FOR SINGLE / MORE THAN
                ONE NOMINEES AND MINOR NOMINEES)
              </Text>
            </Text>
            <Text style={styles.tableColumn1} align="right">
              Form No. 14
            </Text>
          </View>

          <Text style={styles.content}>
            To,
            {"\n"}
            The Secretary,
            {"\n"}
            {authSociety?.name}
            {"\n"}
            {authSociety?.address?.address1}
            {"\n"}
            {authSociety?.address?.address2}
          </Text>

          <Text style={{ fontSize: "16px" }}>
            {"\n"}
            Sir/Madam,
          </Text>

          <View style={styles.ol}>
            <Text
              style={{ textAlign: "left", fontSize: "14px", margin: "4px 0px" }}
            >
              1. I {flatMember?.memberId?.name}, am the member of the{" "}
              <Text style={{ fontWeight: "bold" }}>{authSociety?.name}</Text>,
              having address at {authSociety?.address?.address1},{" "}
              {authSociety?.address?.address2}.
            </Text>
            <Text
              style={{ textAlign: "left", fontSize: "14px", margin: "0px 0px" }}
            >
              2. I hold the Share Certificate No.{" "}
              <Text style={{ fontWeight: "bold" }}>SHARE_SERIAL_NUMBER</Text>{" "}
              dated <Text style={{ fontWeight: "bold" }}>SHARE_ISSUE_DATE</Text>{" "}
              fully paid up shares of Rupees{" "}
              <Text style={{ fontWeight: "bold" }}>SHARE_PER_AMOUNT</Text> each,
              bearing number from{" "}
              <Text style={{ fontWeight: "bold" }}>SHARE_START_NUMBER</Text> to{" "}
              <Text style={{ fontWeight: "bold" }}>SHARE_END_NUMBER</Text>
              (both inclusive), issued by the said society to me.
            </Text>
            <Text
              style={{ textAlign: "left", fontSize: "14px", margin: "4px 0px" }}
            >
              3. I also hold the {flatMember?.flatId?.name} admeasuring
              TOTAL_AREA in the said Society.
            </Text>
            <Text
              style={{
                textAlign: "left",
                fontSize: "14px",
                margin: "4px 0px",
              }}
            >
              4. As provided under Rule 25 of the Maharashtra Co-op. Societies
              Rules, 1961, I hereby nominate the person/s whose particulars are
              as given below :
            </Text>
            <Text
              style={{
                textAlign: "left",
                fontSize: "14px",
                margin: "1px 18px",
              }}
            >
              Nomination List: {formData.nomineeName || "NOMINEE_NAME"}
            </Text>
          </View>

          <Text style={styles.content}>
            <Text style={{ fontSize: "14px", margin: "20px 0px" }}>
              {"\n"}
              As provided under Section 30 of the Maharashtra Co-operative
              Societies Act, 1960, and the Bye-Laws No. 34 of the Society, I
              state that on my death the share mentioned above and my interest
              in the flat, the details of which are given above, should be
              transferred to{" "}
              <Text style={{ fontWeight: "bold" }}>
                Mr/Ms {formData.nomineeName || "NOMINEE_NAME"}
              </Text>
              , the first named nominee, on his/her complying with the
              provisions of the Bye-laws of the Society regarding requirements
              of admission to membership and on furnishing -Indemnity Bond,
              along with the application for membership, indemnifying the
              society against any claims made to the said shares and my interest
              in the said flat by the other nominee/nominees.
              {"\n\n"}* Indemnity Bond is not required to be furnished in case
              of a single nominee.
            </Text>
          </Text>

          <View style={styles.witnessTable}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.witnessCell}>
                <Text align="left" fontWeight="bold">
                  1.<Text>{formData.witnessName1 || "WITNESS_NAME_1"}</Text>
                  {"\n"}
                  <Text>{formData.witnessAddress1 || "WITNESS_ADDRESS_1"}</Text>
                </Text>

                <Text
                  align="right"
                  fontWeight="bold"
                  style={{ marginTop: "32px" }}
                >
                  Signature of Witness
                </Text>
              </View>
              <View style={styles.witnessCell}>
                <Text align="left" fontWeight="bold">
                  2.<Text>{formData.witnessName2 || "WITNESS_NAME_2"}</Text>
                  {"\n"}
                  <Text align="centre" marginLeft="4px">
                    {formData.witnessAddress2 || "WITNESS_ADDRESS_2"}
                  </Text>
                </Text>
                <Text
                  align="right"
                  fontWeight="bold"
                  style={{ marginTop: "32px" }}
                >
                  Signature of Witness
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={{ textAlign: "left", fontSize: "14px", margin: "16px 0px" }}
          >
            <Text align="left" fontWeight="bold">
              Place:
            </Text>
            {authSociety?.name}
          </Text>

          <Text
            style={{ textAlign: "left", fontSize: "14px", margin: "16px 0px" }}
          >
            Received the Nomination in Duplicate
          </Text>

          <Text
            style={{ textAlign: "left", fontSize: "14px", marginTop: "48px" }}
          >
            Hon. Secretary
          </Text>
        </View>
      </Page>
    </Document>
  );

  const downloadFile = () => {
    const blobUrl = URL.createObjectURL(
      <BlobProvider document={<PdfGenerator />} fileName="sample.pdf">
        {({ url }) => (
          <a href={url} target="_blank" rel="noopener noreferrer">
            Click Here
          </a>
        )}
      </BlobProvider>
    );

    window.open(blobUrl, "_blank");
  };

  return (
    <div className="grid grid-cols-2">
      <div className="py-2">
        This is Nominee
        {/* Input Form */}
        <form>
          <div className="mb-4">
            <label htmlFor="nomineeName" className="block text-sm font-medium ">
              Nominee Name
            </label>
            <input
              type="text"
              id="nomineeName"
              name="nomineeName"
              value={formData.nomineeName}
              onChange={(e) => handleInputChange("nomineeName", e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="witnessName1"
              className="block text-sm font-medium "
            >
              Witness Name 1
            </label>
            <input
              type="text"
              id="witnessName1"
              name="witnessName1"
              value={formData.witnessName1}
              onChange={(e) =>
                setFormData({ ...formData, witnessName1: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="witnessAddress1"
              className="block text-sm font-medium "
            >
              Witness Address 1
            </label>
            <input
              type="text"
              id="witnessAddress1"
              name="witnessAddress1"
              value={formData.witnessAddress1}
              onChange={(e) =>
                setFormData({ ...formData, witnessAddress1: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="witnessName2"
              className="block text-sm font-medium "
            >
              Witness Name 2
            </label>
            <input
              type="text"
              id="witnessName2"
              name="witnessName2"
              value={formData.witnessName2}
              onChange={(e) =>
                setFormData({ ...formData, witnessName2: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="witnessAddress2"
              className="block text-sm font-medium "
            >
              Witness Address 2
            </label>
            <input
              type="text"
              id="witnessAddress2"
              name="witnessAddress2"
              value={formData.witnessAddress2}
              onChange={(e) =>
                setFormData({ ...formData, witnessAddress2: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        </form>
      </div>

      <div children="py-2">
        <PDFDownloadLink document={<PDF />} fileName="sample.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <button className="btn btn-sm mb-2">Download</button>
            )
          }
        </PDFDownloadLink>

        <PDFViewer width="100%" height="400">
          <PDF />
        </PDFViewer>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    padding: 20, // Set margin for all pages
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  textCenter: {
    textCenter: "center",
  },
  table: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
  },
  tableColumn1: {
    width: "20%",
    borderCollapse: "collapse",
    border: "1px solid #000",
    padding: 10,
    fontSize: "14",
  },
  nominationList: {
    marginLeft: 20,
    marginTop: 5,
  },

  tableColumn2: {
    width: "60%",
    borderCollapse: "collapse",
    border: "1px solid #000",
    padding: 5,
    fontSize: "14",
  },
  content: {
    marginBottom: 10,
    fontSize: "14",
    marginTop: 20,
  },
  ol: {
    marginLeft: 20,
    marginTop: 20,
  },
  witnessTable: {
    display: "flex",
    flexDirection: "row",
    borderCollapse: "collapse",
    width: "100%",
    marginTop: 20,
    fontSize: "14",
    display: "flex",
  },
  witnessCell: {
    border: "1px solid #000",
    padding: 10,
  },
});
