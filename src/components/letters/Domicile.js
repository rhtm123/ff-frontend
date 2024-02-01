import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';

// Dynamically import PDFViewer
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFViewer), {
  ssr: false,
});

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFDownloadLink), {
  ssr: false,
});


export default function Domicile( {flatMember, isOwner} ) {


  const { authSociety } = useAuth();
   console.log("domicile", flatMember);
  // console.log(isOwner);
  //  console.log(authSociety);

    const PDF = () =>   <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ margin:"4px 0px", textAlign:"center", fontSize:"16px", textTransform:"uppercase" }}>
        {authSociety?.name}
        </Text>

        <Text style={{ textAlign:"center", fontSize:"14px", margin:"1px 0px" }}>
            REGN. NO : {authSociety?.registrationNumber}
        </Text>

        <Text style={{ textAlign:"center", fontSize:"14px", margin:"1px 0px" }}>
        {authSociety?.address?.address1}
        </Text>

        <Text style={{ textAlign:"center", fontSize:"14px", margin:"1px 0px" }}>
        {authSociety?.address?.address2}
        </Text>

        <Text style={{ textAlign:"right", fontSize:"14px", margin:"1px 0px" }}>
            Date: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        </Text>
        

        <Text style={{ textAlign:"center", fontSize:"20px", margin:"10px 0px" }}>
        TO WHOMSOEVER IT MAY CONCERN
        </Text>


        <Text style={{ textAlign:"left", fontSize:"14px", margin:"4px 0px" }}>
        This is to certify that{' '} <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '14px' }}>{flatMember?.memberId?.name}</Text>{' '}, who is a bonafide owner of a property in our society located at {authSociety?.address?.address1}, since {' '}{new Date(flatMember?.possessionDate).toLocaleDateString('en-US')}
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