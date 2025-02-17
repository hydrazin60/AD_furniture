export const createNewCustomer = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const branchId = req.params.branchId;
    const {
      fullName,
      companyName,
      companyWebsite,
      companySocialMediaLink,
      phoneNumber,
      email,
      customerCategory,
      description,
      address,
      paymentType,
      note,
    } = req.body;
  } catch (err) {
    console.log(` Error in createNewCustomer: ${err}`);
    return res.status(400).json({
      success: false,
      error: true,
      message: `Error in createNewCustomer: ${err.message}`,
    });
  }
};
