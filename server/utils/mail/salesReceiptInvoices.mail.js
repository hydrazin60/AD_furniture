import nodemailer from "nodemailer";

export const sendSalesReceiptInvoiceMail = async (
  customerEmail,
  customerName,
  recipientEmail,
  recipientName,
  salesReceiptNumber,
  paymentDate,
  paymentMethod,
  products,
  totalAmount,
  tax,
  grandTotal,
  branchName,
  branchPhoneNumber,
  branchAddress
) => {
  try {
    // Create the email transport configuration using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Format the list of products
    const formattedProducts = products
      .map(
        (product) => `
        <tr>
          <td>${product.productName}</td>
          <td>${product.quantity}</td>
          <td>RS ${product.unitPrice.toFixed(2)}</td>
           <td>RS ${product.discount.toFixed(2)}</td>
          <td>RS ${product.totalPrice.toFixed(2)}</td>
        </tr>
      `
      )
      .join("");
    console.log(branchAddress, "add>>");
    let adresses = branchAddress.map((items) => items);
    console.log(adresses, "add");

    // Email content setup
    const mailOptions = {
      from: process.env.EMAIL,
      to: [customerEmail, recipientEmail], // Send to both customer and recipient
      subject: `Sales Receipt Invoice - Ref No: ${salesReceiptNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
          <h2 style="text-align: center; color: #4CAF50;">Sales Receipt Invoice</h2>
          <hr style="border: 1px solid #ddd;">
          <h3 style="color: #4CAF50;">Branch Details</h3>
          <p><strong>Branch Name:</strong> ${branchName}</p>
          <p><strong>Branch Phone:</strong> ${branchPhoneNumber}</p>
          <p><strong>Branch Address:</strong>  ${
            branchAddress[0].province
          } province , ${branchAddress[0].district} district , ${
        branchAddress[0].municipality
      } municipality </p>
          <h3 style="color: #4CAF50;">Invoice Details</h3>
          <p><strong>Sales Receipt Number:</strong> ${salesReceiptNumber}</p>
          <p><strong>Payment Date:</strong> ${new Date(
            paymentDate
          ).toLocaleString()}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>

          <h3 style="color: #4CAF50;">Customer & Recipient Details</h3>
          <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
          <p><strong>Recipient:</strong> ${recipientName} (${recipientEmail})</p>

          <h3 style="color: #4CAF50;">Product Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Unit Price</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">discount/offer</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total Price</th>
 
              </tr>
            </thead>
            <tbody>
              ${formattedProducts}
            </tbody>
          </table>

          <h3 style="color: #4CAF50;">Payment Details</h3>
          <p><strong>Total Amount:</strong> RS ${totalAmount.toFixed(2)}</p>
          <p><strong>Tax (${tax}%):</strong> RS ${(
        (totalAmount * tax) /
        100
      ).toFixed(2)}</p>
          <p><strong>Grand Total:</strong> RS ${grandTotal.toFixed(2)}</p>

          <hr style="border: 1px solid #ddd;">
          <p style="text-align: center; color: #777;">Thank you for your business!</p>
          <p style="text-align: center; color: #777;"><strong>Ad Furniture Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${customerEmail} and ${recipientEmail}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw error;
  }
};
