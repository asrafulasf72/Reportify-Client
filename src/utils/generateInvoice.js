import jsPDF from "jspdf";

export const generateInvoicePDF = (payment) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  // Header
  doc.setFontSize(22);
  doc.text("Reportify Invoice", 40, 50);

  doc.setFontSize(12);
  doc.text(`Invoice ID: ${payment._id || "N/A"}`, 40, 80);
  doc.text(`Name: ${payment.displayName || payment.email}`, 40, 100);
  doc.text(`Email: ${payment.email}`, 40, 120);
  doc.text(`Payment Type: ${payment.type}`, 40, 140);
  doc.text(
    `Amount Paid: ${payment.amount} ${payment.currency.toUpperCase()}`,
    40,
    160
  );
  doc.text(
    `Date: ${new Date(payment.createdAt).toLocaleString()}`,
    40,
    180
  );

  doc.setLineWidth(0.5);
  doc.line(40, 200, 550, 200); // horizontal line

  // Footer
  doc.setFontSize(10);
  doc.text(
    "Thank you for using Reportify! This is a system-generated invoice.",
    40,
    220
  );

  // Save
  doc.save(`Invoice_${payment._id || payment.email}.pdf`);
};
