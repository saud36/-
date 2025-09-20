
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPdf = async (elementRef: React.RefObject<HTMLDivElement>, fileName: string) => {
  const input = elementRef.current;
  if (!input) {
    console.error('PDF export failed: element not found');
    return;
  }

  try {
    const canvas = await html2canvas(input, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in points: 595.28 x 841.89
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;

    let imgWidth = pdfWidth;
    let imgHeight = imgWidth / ratio;
    
    // If the content is taller than the page, scale it to fit
    if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight * ratio;
    }

    // Center the image on the page
    const x = (pdfWidth - imgWidth) / 2;
    const y = 0; // Start from top

    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pdf.save(`${safeFileName}_cv.pdf`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('An error occurred while generating the PDF. Please try again.');
  }
};
