import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import dynamic from "next/dynamic";

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

export default function NOCLOAN() {
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
            Sunteck Tower 2 Society
          </Text>

          <Text
            style={{ textAlign: "center", fontSize: "14px", margin: "1px 0px" }}
          >
            REGN. NO : 429048329049023490432
          </Text>

          <Text
            style={{ textAlign: "center", fontSize: "14px", margin: "1px 0px" }}
          >
            Tiwri Road
          </Text>

          <Text
            style={{ textAlign: "center", fontSize: "14px", margin: "1px 0px" }}
          >
            Naigaon East
          </Text>

          <Text
            style={{ textAlign: "right", fontSize: "14px", margin: "14px 0px" }}
          >
            Date: 18 Jan, 2024
          </Text>

          <Text
            style={{ textAlign: "left", fontSize: "14px", margin: "14px 0px" }}
          >
            To AUTHORISED_NAME,{"\n"}
            BANK_NAME,{"\n"}
            BANK_ADDRESS
          </Text>

          <Text
            style={{ textAlign: "left", fontSize: "14px", margin: "14px 0px" }}
          >
            Subject : NOC for Bank Loan
          </Text>
          <Text
            style={{ textAlign: "left", fontSize: "14px", margin: "4px 0px" }}
          >
            We, SOCIETY_NAME, hereby certify that:
          </Text>
          <View style={{ margin: "20px 0px" }}>
            <Text style={{ fontSize: "14px", marginLeft: "20px" }}>
              <Text style={{ fontWeight: "bold" }}>1. </Text>
              <Text>
                FLAT_NUMBER in ADDRESS_LINE_1, ADDRESS_LINE_2 has been allotted
                to OWNER_NAME
              </Text>
            </Text>
            {"\n"}
            <Text style={{ fontSize: "14px", marginLeft: "20px" }}>
              <Text style={{ fontWeight: "bold" }}>2. </Text>
              <Text>
                We hereby state and confirm that the building plan sanctioned
                under commencement certificate no CC_NUMBER dated CC_DATE shall
                not be altered / changed without the prior written consent of
                the flat purchaser.
              </Text>
            </Text>
            {"\n"}
            <Text style={{ fontSize: "14px", marginLeft: "20px" }}>
              <Text style={{ fontWeight: "bold" }}>3. </Text>
              <Text>
                That the total cost of the said flat as per the available sale
                agreement is Rs.FLAT_COST 
              </Text>
            </Text>
            {"\n"}
            <Text style={{ fontSize: "14px", marginLeft: "20px" }}>
              <Text style={{ fontWeight: "bold" }}>4. </Text>
              <Text>
                That title to the said land and the building thereon is clear,
                marketable, and free from all encumbrances and doubts.
              </Text>
            </Text>
            {"\n"}
            <Text style={{ fontSize: "14px", marginLeft: "20px" }}>
              <Text style={{ fontWeight: "bold" }}>5. </Text>
              <Text>
                We have not borrowed from any financial institution for the
                purchase of land or construction of the building and have not
                created and will not create any encumbrances on the flat
                allotted to them during the currency of the loan sanctioned / to
                be sanctioned by the Bank to them.
              </Text>
            </Text>
          </View>

          <Text
            style={{ textAlign: "left", fontSize: "14px", margin: "8px 0px" }}
          >
            We further stake and undertake to record the charge of the bank on
            the said flat in our register and further agree to inform and give
            proper notice to the Co-operative Housing Society or an Association
            of Apartment Owners as and when formed, about the said flat being
            mortgaged to your bank.
          </Text>
          <Text
            style={{ textAlign: "left", fontSize: "14px", margin: "16px 0px" }}
          >
            For society
          </Text>

          <Text
            style={{ textAlign: "left", fontSize: "14px", margin: "16px 0px" }}
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
      <div className="py-2">This is NOC - Bank Loan</div>

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
});
