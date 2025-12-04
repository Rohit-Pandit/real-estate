import Lead from "../models/lead.model.js";
import ExcelJS from "exceljs";




const createLead=async(req,res)=>{

    try{

        const {name,email,phone,address,message,interested}=req.body;

        if(!name || !phone){
            return res.status(400).json({message:"Name and Phone are required"});
        }

        const lead = await Lead.create({
            name,
            email,
            phone,
            address,
            message,
            interested
        });

        if(!lead){
            return  res.status(500).json({
                message:"Failed to create lead",
                success:false
            });
        }

        return res.status(201).json({
            message:"Lead created successfully",
            success:true,
            lead

        });
    }catch(error){
        console.error("Error creating lead:",error);
        return res.status(500).json({
            message:error.message,
            success:false
        });
    }    
    

};

const getAllLeads=async(req,res)=>{

    try {
        const leads = await Lead.find().sort({createdAt:-1});

        if(!leads){
            return res.status(404).json({
                message:"No leads found",
                success:false
            });
        }
        return res.status(200).json({
            message:"Leads fetched successfully",
            success:true,
            leads
        });
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            success:false
        });
    }
};

const exportLeadsToExcel = async(req,res)=>{

    try {
        const leads = await Lead.find().lean().sort({createdAt:-1});

        if(!leads || leads.length===0){
            return res.status(404).json({
                message:"No leads found to export",
                success:false
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Leads");

        worksheet.columns = [
            { header: "Name", key: "name", width: 20 },
            { header: "Email", key: "email", width: 25 },
            { header: "Phone", key: "phone", width: 15 },
            { header: "Address", key: "address", width: 30 },
            { header: "Message", key: "message", width: 40 },
            { header: "Interested", key: "interested", width: 10 },
            { header: "Created At", key: "createdAt", width: 20 }
        ];

        leads.forEach((lead)=>{
            worksheet.addRow({
                ...lead,
                createdAt: lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ''
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "leads.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            success:false
        });
    }
}



export {createLead,getAllLeads,exportLeadsToExcel};