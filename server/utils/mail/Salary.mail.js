import nodemailer from "nodemailer";

export const sendSalaryMail = async (
  staffData,
  branchData,
  baseSalary,
  bonus,
  overTime,
  deductions,
  totalSalary,
  paymentMethod,
  salaryDateFrom,
  salaryDateTo
) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: staffData.email,
      subject: `Salary Invoice - Ref No: ${staffData._id}`,
      html: `
        <h2>Salary Invoice</h2>
        <p>Dear ${staffData.fullName},</p>
        <p>Here is your salary breakdown for the period from ${new Date(
          salaryDateFrom
        ).toLocaleDateString()} to ${new Date(
        salaryDateTo
      ).toLocaleDateString()}:</p>
        <ul>
          <li>Base Salary: $${baseSalary}</li>
          <li>Bonus: $${bonus}</li>
          <li>Overtime: $${overTime}</li>
          <li>Deductions: $${deductions}</li>
          <br>
          <li>Total Salary: $${totalSalary}</li>
        </ul>
        <p>Payment Method: ${paymentMethod}</p>
        <p>Thank you for your hard work!</p>
        <p>Best regards,</p>
        <p>${branchData.branchName}</p>
      `,
    };

    await transport.sendMail(mailOptions);
    console.log("Salary email sent successfully.");
  } catch (error) {
    console.error(`Error in sendSalaryMail: ${error.message}`);
    throw error;
  }
};

// import nodemailer from "nodemailer";
// export const sendSalaryMail = async (
//     staffData,
//     branchData,
//     baseSalary,
//     bonus,
//     overTime,
//     deductions,
//     totalSalary,
//     paymentMethod
//   ) => {
//     try {
//       const transport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL,
//           pass: process.env.PASSWORD,
//         },
//       });

//       const mailOptions = {
//         from: process.env.EMAIL,
//         to: staffData.email,
//         subject: `Salary Invoice - Ref No: ${staffData._id}`,
//         html: `
//           <h2>Salary Invoice</h2>
//           <p>Dear ${staffData.fullName},</p>
//           <p>Here is your salary breakdown for this month:</p>
//           <ul>
//             <li>Base Salary: $${baseSalary}</li>
//             <li>Bonus: $${bonus}</li>
//             <li>Overtime: $${overTime}</li>
//             <li>Deductions: $${deductions}</li>
//             <li>Total Salary: $${totalSalary}</li>
//           </ul>
//           <p>Payment Method: ${paymentMethod}</p>
//           <p>Thank you for your hard work!</p>
//           <p>Best regards,</p>
//           <p>${branchData.branchName}</p>
//         `,
//       };

//       await transport.sendMail(mailOptions);
//       console.log("Salary email sent successfully.");
//     } catch (error) {
//       console.error(`Error in sendSalaryMail: ${error.message}`);
//       throw error;
//     }
//   };
