import jsPDF from "jspdf";
import type { Booking } from "@/contexts/AppStateContext";

export const downloadInvoicePdf = (booking: Booking) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = margin;

  // Header band
  doc.setFillColor(37, 99, 235); // primary blue
  doc.rect(0, 0, W, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("HomeGenie", margin, 45);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Trusted home services, on demand", margin, 65);

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", W - margin, 50, { align: "right" });

  y = 130;
  doc.setTextColor(20, 20, 20);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`Invoice #₹{booking.id.toUpperCase()}`, margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ₹{booking.paidAt || booking.createdAt}`, W - margin, y, { align: "right" });

  y += 30;
  // Two-column billed-to / provider
  doc.setFont("helvetica", "bold");
  doc.text("Billed To", margin, y);
  doc.text("Service Provider", W / 2, y);
  doc.setFont("helvetica", "normal");
  y += 16;
  doc.text(booking.customerName, margin, y);
  doc.text(booking.providerName, W / 2, y);
  y += 14;
  doc.text(booking.customerPhone, margin, y);
  doc.text(booking.providerPhone, W / 2, y);
  y += 14;
  doc.text(doc.splitTextToSize(booking.customerAddress, W / 2 - margin - 10), margin, y);

  y += 50;
  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y - 14, W - 2 * margin, 24, "F");
  doc.setFont("helvetica", "bold");
  doc.text("Description", margin + 10, y + 2);
  doc.text("Qty", W - margin - 180, y + 2);
  doc.text("Rate", W - margin - 110, y + 2);
  doc.text("Amount", W - margin - 10, y + 2, { align: "right" });

  y += 30;
  doc.setFont("helvetica", "normal");
  doc.text(`${booking.service} (₹{booking.category})`, margin + 10, y);
  doc.text("1", W - margin - 180, y);
  doc.text(`₹₹{booking.amount.toFixed(2)}`, W - margin - 110, y);
  doc.text(`₹₹{booking.amount.toFixed(2)}`, W - margin - 10, y, { align: "right" });

  y += 18;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, W - margin, y);
  y += 18;

  doc.text("Subtotal", W - margin - 110, y);
  doc.text(`₹₹{booking.amount.toFixed(2)}`, W - margin - 10, y, { align: "right" });
  y += 16;
  doc.text("Extra Charges", W - margin - 110, y);
  doc.text("₹0.00", W - margin - 10, y, { align: "right" });
  y += 8;
  doc.line(W - margin - 200, y, W - margin, y);
  y += 18;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Total Paid", W - margin - 110, y);
  doc.text(`₹₹{booking.amount.toFixed(2)}`, W - margin - 10, y, { align: "right" });

  y += 40;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Payment Method: Wallet", margin, y);
  doc.text(`Status: PAID`, margin, y + 14);
  doc.text(`Booked: ₹{booking.date} at ₹{booking.time}`, margin, y + 28);

  // Footer
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, 760, W - margin, 760);
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("Thank you for choosing HomeGenie!", W / 2, 778, { align: "center" });
  doc.text("support@homegenie.com  •  +1-800-HOMEGENIE", W / 2, 792, { align: "center" });

  doc.save(`invoice-₹{booking.id}.pdf`);
};
