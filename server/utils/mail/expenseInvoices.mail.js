import nodemailer from "nodemailer";

export const sendExpenseInvoiceMail = async (
  payerEmail,
  payerName,
  recipientEmail,
  recipientName,
  expenseType,
  totalAmount,
  tax,
  grandTotal,
  paymentMethod,
  referenceNumber,
  description,
  paymentDate,
  branchName,
  branchPhoneNumber,
  branchAddress
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Ensure totalAmount, tax, and grandTotal are numbers
    const totalAmountNum = Number(totalAmount);
    const taxNum = Number(tax);
    const grandTotalNum = Number(grandTotal);

    // Email content setup
    const mailOptions = {
      from: process.env.EMAIL,
      to: [payerEmail, recipientEmail], // Send to both payer and recipient
      subject: `Expense Invoice - Ref No: ${referenceNumber}`, // Subject of the email
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
          <h2 style="text-align: center; color: #4CAF50;">Expense Invoice</h2>
          <hr style="border: 1px solid #ddd;">

          <h3 style="color: #4CAF50;">Branch Details</h3>
          <p><strong>Branch Name:</strong> ${branchName}</p>
          <p><strong>Branch Phone:</strong> ${branchPhoneNumber}</p>
          <p><strong>Branch Address:</strong> ${branchAddress}</p>

          <h3 style="color: #4CAF50;">Invoice Details</h3>
          <p><strong>Invoice Reference Number:</strong> ${referenceNumber}</p>
          <p><strong>Payment Date:</strong> ${new Date(
            paymentDate
          ).toLocaleString()}</p>
          <p><strong>Expense Type:</strong> ${expenseType}</p>
          <p><strong>Description:</strong> ${description}</p>

          <h3 style="color: #4CAF50;">Payer & Recipient Details</h3>
          <p><strong>Payer:</strong> ${payerName} (${payerEmail})</p>
          <p><strong>Recipient:</strong> ${recipientName} (${recipientEmail})</p>

          <h3 style="color: #4CAF50;">Payment Details</h3>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p><strong>Total Amount:</strong> RS ${totalAmountNum.toFixed(2)}</p>
          <p><strong>Tax (${taxNum}%):</strong> RS ${(
        (totalAmountNum * taxNum) /
        100
      ).toFixed(2)}</p>
          <p><strong>Grand Total:</strong> RS ${grandTotalNum.toFixed(2)}</p>

          <hr style="border: 1px solid #ddd;">
          <p style="text-align: center; color: #777;">Thank you for your business!</p>
          <p style="text-align: center; color: #777;"><strong>Ad Furniture Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `Expense invoice email sent to ${payerEmail} and ${recipientEmail}`
    );
  } catch (error) {
    console.error(`Error sending expense invoice email: ${error.message}`);
  }
};

// import nodemailer from "nodemailer";

// export const sendExpenseInvoiceMail = async (
//   payerEmail,
//   payerName,
//   recipientEmail,
//   recipientName,
//   expenseType,
//   totalAmount,
//   tax,
//   grandTotal,
//   paymentMethod,
//   referenceNumber,
//   description,
//   paymentDate,
//   branchName,
//   branchPhoneNumber,
//   branchAddress
// ) => {
//   try {
//     // Ensure totalAmount, tax, and grandTotal are numbers
//     totalAmount = Number(totalAmount);
//     tax = Number(tax);
//     grandTotal = Number(grandTotal);

//     // Check if the conversion was successful
//     if (isNaN(totalAmount) || isNaN(tax) || isNaN(grandTotal)) {
//       return console.error("Invalid numeric values");
//     }

//     // Extract country, province, and district from the branchAddress
//     const country = branchAddress?.country || "Not Provided";
//     const province = branchAddress?.province || "Not Provided";
//     const district = branchAddress?.district || "Not Provided";

//     // Create the email transport configuration using Gmail
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });

//     // Email content setup
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: payerEmail, // Send to payer email
//       subject: `Expense Invoice - Ref No: ${referenceNumber}`, // Subject of the email
//       html: `
//         <h2>Expense Invoice</h2>
//         <p><strong>Branch:</strong> ${branchName}</p>
//         <p><strong>Branch Phone:</strong> ${branchPhoneNumber}</p>
//         <p><strong>Branch Address:</strong> ${country}, ${province}, ${district}</p>
//         <p><strong>Payer:</strong> ${payerName} (${payerEmail})</p>
//         <p><strong>Recipient:</strong> ${recipientName} (${recipientEmail})</p>
//         <p><strong>Expense Type:</strong> ${expenseType}</p>
//         <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
//         <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
//         <p><strong>Grand Total:</strong> $${grandTotal.toFixed(2)}</p>
//         <p><strong>Payment Method:</strong> ${paymentMethod}</p>
//         <p><strong>Description:</strong> ${description}</p>
//         <p><strong>Invoice Reference Number:</strong> ${referenceNumber}</p>
//         <p><strong>Payment Date:</strong> ${new Date(
//           paymentDate
//         ).toLocaleString()}</p>
//         <hr />
//         <p>Thank you for your business!</p>
//         <p><strong>Ad Furniture Team</strong></p>
//       `,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log(`Expense invoice email sent to ${payerEmail}`);
//   } catch (error) {
//     console.error(`Error sending expense invoice email: ${error.message}`);
//   }
// };
