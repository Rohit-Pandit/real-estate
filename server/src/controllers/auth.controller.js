import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

let generatedOTP = null;
let otpExpiresAt = null;


const  sendOTP = async (req, res) => {

    try {

        const { mobileNumber } = req.body;

        if(!mobileNumber){
            return res.status(400).json({
                message:"Mobile number is required",
                success:false
            });
        }

        const adminMobileNumber = process.env.ADMIN_MOBILE_NUMBER;
        if(mobileNumber !== adminMobileNumber){
            return res.status(403).json({
                message:"Unauthorized mobile number",
                success:false
            });
        }
        generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        otpExpiresAt = Date.now() + 5 * 60 * 1000;

        return res.status(200).json({
            message:"OTP sent successfully",
            success:true,
            otp:generatedOTP
        });
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            success:false
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const {otp} = req.body;
        if(!otp){
            return res.status(400).json({
                message:"OTP is required",
                success:false
            });
        }
        if(otp !== generatedOTP){
            return res.status(400).json({
                message:"Invalid OTP",
                success:false
            });
        }
        if(Date.now() > otpExpiresAt){
            return res.status(400).json({
                message:"OTP has expired",
                success:false
            });
        }
        const token = jwt.sign(
            { admin: true },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie("adminToken", token, {
        httpOnly: true,
        secure: false,       // set to false if testing on localhost without HTTPS
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
        });

        generatedOTP = null;
        otpExpiresAt = null;

        return res.status(200).json({
            message:"OTP verified successfully",
            success:true,
            token
        });


        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            success:false
        });
        
    }
};

const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
}

export { sendOTP,verifyOTP, logoutAdmin};