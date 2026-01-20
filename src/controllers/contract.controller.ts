import { Request, Response, NextFunction } from "express"
import { clientRepository, contractRepository } from "../repository"
import { catchAsync } from "../helpers/catch-async.helper"
import { contractStatus } from "../enum/contract-status.enum"



    export const findContractById = catchAsync(
        async(req: Request, res: Response) => {   
            const contractId = Number(req.params.id)
            const contract = await contractRepository.findById(contractId)
            if (!contract) return res.status(404).json({message: "Contract not found"})
            return res.status(200).json({contract})   
    }
    )


    export const createContract = catchAsync(
        async(req: Request, res: Response) => {

            const contract = await contractRepository.createContract(req.body)
            if (!contract) return res.status(404).json({message: "Contract not found"})
            return res.status(200).json({})

        }
    )

    export const updateContract = catchAsync(
        async(req: Request, res: Response) => {
            const contractId = Number(req.params.id)
            const user = req.user
            const updatedContract = await contractRepository.updateContract(contractId, req.body, user)
            if (!updateContract) {
                return res.status(400).json({message: "Contract could not be updated"})
            }
            return res.status(200).json({message: "Contract Updated", updatedContract})

        }
    )

    export const deleteContract = catchAsync(
        async(req: Request, res: Response) => {
            const contractId = Number(req.params.id)
            const isDeleted = await contractRepository.delete(contractId)
            if (!isDeleted) {
                return res.status(400).json({message: "Error occured while deleting the contract."})
            }
            return res.status(200).json({message: "Contract deleted successfully"})
        }
    )

    //for filtering, searching and pagination, req.query is more commonly used.
    //req.body is used for data that has to be manipulated or added.
    export const getAllContractsByClientId = catchAsync(
        async(req: Request, res: Response) => {
            //const clientId = Number(req.query.clientId)
            const clientId = req.user.id
            if (!clientId) {
                return res.status(400).json({message: "Client Id not found"})
            }

            const contracts = await contractRepository.getAllContractsByClientId(clientId)

            return res.status(200).json({contracts})
        }
    )

    export const getAllContractsByFreelancerId = catchAsync(
        async(req: Request, res: Response) => {
            //const clientId = Number(req.query.freelancerId)
            const clientId = req.user.id
            if (!clientId) {
                return res.status(400).json({message: "Client Id not found"})
            }

            const contracts = await contractRepository.getAllContractsByClientId(clientId)

            return res.status(200).json({contracts})
        }
    )

    export const getContractsByStatus = catchAsync(
        async(req: Request, res: Response) => {
            const status = req.params.contractStatus
            const contracts = await contractRepository.getContractsByStatus(status as contractStatus)

            if (contracts.length===0) {
                return res.status(200).json({message: "There are no contracts to display"})
            }
            return res.status(200).json({contracts})
        }
    )


    export const getContractsByClientIdAndStatus = catchAsync(
        async(req: Request, res: Response)=> {
            const clientId = req.user.id
            const status = req.query.contractStatus as contractStatus

            const contracts = await contractRepository.getContractsByClientIdAndStatus(clientId, status)
            if (contracts.length===0) {
                return res.status(200).json({message: "There are no contracts to display"})
            }
            
            return res.status(200).json({contracts})
        }
    )

    export const getContractsByFreelancerIdAndStatus = catchAsync(
        async(req: Request, res: Response)=> {
            const freelancerId = req.user.id
            const status = req.query.contractStatus as contractStatus

            const contracts = await contractRepository.getContractsByClientIdAndStatus(freelancerId, status)
            if (contracts.length===0) {
                return res.status(200).json({message: "There are no contracts to display"})
            }
            
            return res.status(200).json({contracts})
        }
    )

    export const updateContractStatus = catchAsync(
        async(req: Request, res: Response) => {
            const contractId = Number(req.params.id)
            const status = req.body.contractStatus
            if (status===contractStatus.ACTIVE) {
                const contract = await contractRepository.acceptContract(contractId, status)
                if (!contract) {
                    return res.status(400).json({message: "Invalid contract transition"})
                }                
                return res.status(200).json(contract)
            }
            else if (status===contractStatus.COMPLETED) {
                const contract = await contractRepository.completeContract(contractId, status)
                if (!contract) {
                    return res.status(400).json({message: "Invalid contract transition"})
                }
                return res.status(200).json(contract)
            }
            else if (status===contractStatus.CANCELLED) {
                const contract = await contractRepository.rejectContract(contractId, status)
                if (!contract) {
                    return res.status(400).json({message: "Invalid contract transition"})
                }
                return res.status(200).json(contract)
            }

        }
    )


    export const getContractInformation = catchAsync(
        async(req: Request, res: Response) => {
            const contractId = Number(req.params.id)
            const contract = await contractRepository.getContractInformation(contractId)

            if (!contract) {
                return res.status(400).json({message: "Unable to retrieve contract"})
            }

            return res.status(200).json(contract)
        }
    )