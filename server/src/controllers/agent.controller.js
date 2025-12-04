import { Agent } from "../models/agent.model.js";



const createAgent = async (req,res)=>{

    try {
        const {name,phone,address} = req.body;

        if(!name || !phone){
            return res.status(400).json({
                message : "Name and Phone are required",
                success : false
            });
        }
 
        const existingAgent = await Agent.findOne({phone});

        if(existingAgent){
            return  res.status(400).json({
                message : "Agent with this phone number already exists",
                success : false
            });
        }

        const newAgent = await Agent.create({
            name,
            phone,
            address
        });

        return res.status(201).json({
            message : "Agent created successfully",
            success : true,
            data : newAgent
        });
        
    } catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false
        });
        
    }
}

const getAllAgents = async (req,res)=>{

    try {
        const agents = await Agent.find();

        if(agents.length === 0){
            return res.status(404).json({
                message : "No agents found",
                success : false
            });
        }
        return res.status(200).json({
            message : "Agents fetched successfully",
            success : true,
            agents : agents
        });

        
    } catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false
        });
        
    }
}

const deleteAgent = async (req,res)=>{
    try {

        const { id } = req.params;
        if(!id){
            return res.status(400).json({
                message : "Agent ID is required",
                success : false
            });
        }
        const deletedAgent = await Agent.findByIdAndDelete(id);

        if(!deletedAgent){
            return res.status(404).json({
                message : "Agent not found",
                success : false
            });
        }
        return res.status(200).json({
            message : "Agent deleted successfully",
            success : true,
            data : deletedAgent
        });

    } catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false
        });
    }
}

const updateAgent = async (req,res)=>{
    
    try {
        const { id } = req.params;
        const updateObj = req.body;
        if(!id){
            return res.status(400).json({
                message : "Agent ID is required",
                success : false
            });
        }
        if(!updateObj){
            return res.status(400).json({
                message : "At least one field (name or address) is required to update",
                success : false
            });
        }
         const updatedAgent = await Agent.findByIdAndUpdate(
                                                            id,
                                                            req.body,
                                                            { new: true }
                                                            );

        if(!updatedAgent){
            return res.status(404).json({
                message : "Agent not found",
                success : false
            });
        }
        return res.status(200).json({
            message : "Agent updated successfully",
            success : true,
            data : updatedAgent
        });
        
    } catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false
        });
        
    }
}

export {
    createAgent,
    getAllAgents,
    deleteAgent,
    updateAgent
};