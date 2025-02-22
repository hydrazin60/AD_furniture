import crypto from "crypto";
import nodemailer from "nodemailer";
import Worker from "../../../models/user/worker/worker.models.js";
import bcrypt from "bcrypt";
import cloudinary from "../../../utils/cloudnary.js";
const MAIN_ADMIN_EMAIL =
  process.env.MAIN_ADMIN_EMAIL || "pandeyjiban2005@gmail.com";  

const uploadProfilePic = async (file) => {
  try {
    const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: "profilePic",
    });
    return cloudResponse.secure_url;
  } catch (uploadErr) {
    console.error("Cloudinary Upload Error:", uploadErr);
    throw new Error("Failed to upload profile picture");
  }
};

export const AdminRegister = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, address } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !address) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required",
      });
    }
    const existingAdmin = await Worker.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `Admin with email ${email} or phone number ${phoneNumber} already exists`,
      });
    }

    let profilePicURI = null;
    if (req.file) {
      profilePicURI = await uploadProfilePic(req.file);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await Worker.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      address,
      role: "Pending",
      profilePic: profilePicURI,
    });

    admin.verificationToken = crypto.randomBytes(32).toString("hex");
    await admin.save();
    setTimeout(async () => {
      const updatedAdmin = await Worker.findOne({ email: admin.email });
      if (updatedAdmin && updatedAdmin.verificationToken) {
        updatedAdmin.verificationToken = "";
        await updatedAdmin.save();
      }
    }, 20 * 60 * 1000);
    await RequestAdminVerification(email, admin.verificationToken);

    const { password: _, ...adminData } = admin.toObject();
    res.status(201).json({
      success: true,
      error: false,
      message: `${fullName} registered successfully. Waiting for admin approval.`,
      data: adminData,
    });
  } catch (err) {
    console.error(`Error in AdminRegister:`, err);
    res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while registering admin",
    });
  }
};

export const RequestAdminVerification = async (
  newAdminEmail,
  verificationToken
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.PASSWORD, // Your email password (use app password for Gmail)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: MAIN_ADMIN_EMAIL, // Only the main admin gets the email
    subject: "Admin Verification Request",
    text: `A new user (${newAdminEmail}) has requested Admin access.\n\nIf you approve, click the following link to verify them:\nhttp://localhost:4000/api/v1/ad_furniture/admin/auth/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification request sent to main admin.");
  } catch (error) {
    console.error(
      `Error in sending verification request email: ${error.message}`
    );
  }
};

export const VerifyAdmin = async (req, res) => {
  const token = req.params.token;
  try {
    const admin = await Worker.findOne({ verificationToken: token });

    if (!admin) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid verification token",
      });
    }
    admin.isVerified = true;
    admin.role = "Admin";
    admin.verificationToken = null;
    await admin.save();

    res.status(200).json({
      success: true,
      error: false,
      message: "Admin verified successfully",
      data: admin,
    });
  } catch (err) {
    console.error("Error in VerifyAdmin:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "An error occurred while verifying the admin",
    });
  }
};
