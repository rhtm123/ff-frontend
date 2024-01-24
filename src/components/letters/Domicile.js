import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import dynamic from 'next/dynamic';

// Dynamically import PDFViewer
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFViewer), {
  ssr: false,
});

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFDownloadLink), {
  ssr: false,
});


export default function Domicile() {


    const PDF = () =>   <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ margin:"4px 0px", textAlign:"center", fontSize:"16px", textTransform:"uppercase" }}>
            Sunteck Tower 2 Society
        </Text>

        <Text style={{ textAlign:"center", fontSize:"14px", margin:"1px 0px" }}>
            REGN. NO : 429048329049023490432
        </Text>

        <Text style={{ textAlign:"center", fontSize:"14px", margin:"1px 0px" }}>
            Tiwri Road
        </Text>

        <Text style={{ textAlign:"center", fontSize:"14px", margin:"1px 0px" }}>
            Naigaon East
        </Text>

        <Text style={{ textAlign:"right", fontSize:"14px", margin:"1px 0px" }}>
            Date: 18 Jan, 2024
        </Text>
        

        <Text style={{ textAlign:"center", fontSize:"20px", margin:"10px 0px" }}>
        TO WHOMSOEVER IT MAY CONCERN
        </Text>


        <Text style={{ textAlign:"left", fontSize:"14px", margin:"4px 0px" }}>
        This is to certify that APPLIER_NAME, RELATION_WITH_OWNER of OWNER_NAME, who is a bonafide member of our society and staying at OWNER_ADDRESS, since SINCE_STAYING_DATE
        </Text>

        <Text style={{ textAlign:"left", fontSize:"14px", margin:"4px 0px" }}>
        This certificate is issued to HIM_HER on HIS_HER request to enable HIM_HER to apply for domicile certificate.
        </Text>


        <Text style={{ textAlign:"left", fontSize:"14px", margin:"16px 0px" }}>
        For society
        </Text>
        
        <Text style={{ textAlign:"left", fontSize:"14px", margin:"16px 0px" }}>
        Hon. Secretary
        </Text>

       
      </View>
    </Page>
  </Document>

    const downloadFile = () => {
        const blobUrl = URL.createObjectURL(
          <BlobProvider document={<PdfGenerator />} fileName="sample.pdf">
            {({ url }) => <a href={url} target="_blank" rel="noopener noreferrer">Click Here</a>}
          </BlobProvider>
        );
    
        window.open(blobUrl, '_blank');
      };

    return (
        <div className="grid grid-cols-2">
            <div className='py-2'>
                This is Domicile
            </div>


            <div children="py-2">
                <PDFDownloadLink document={<PDF />} fileName="sample.pdf">
                    {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 
                    <button className='btn btn-sm mb-2'>Download</button>
                    }
                    
                </PDFDownloadLink>

                <PDFViewer width="100%" height="400">
                    <PDF />
                </PDFViewer>

            </div>

        </div>
    )
}

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#eeeeee',
      padding: 20, // Set margin for all pages
  
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    textCenter: {
        textCenter: "center"
    }

  });