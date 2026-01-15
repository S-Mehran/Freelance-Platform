import { Repository } from "typeorm";
import { Contract } from "../entity/contract";
import { contractStatus } from "../enum/contract-status.enum";
import { PostService } from "./job-post.service";
import { FreelancerService } from "./freelancer.service";
import { ClientService } from "./client.service";
import { ProposalService } from "./proposal.service";


export class contractService {
  constructor(private contractRepository: Repository<Contract>,
    private freelancerService: FreelancerService,
    private clientService: ClientService,
    private proposalService: ProposalService,
    private postService: PostService
  ) {}

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find();
  }

  async findById(id: number): Promise<Contract | null> {
    return this.contractRepository.findOne({
      where: { id },
    });
  }


  async createContract(contract: Contract): Promise<Contract> {
    // const freelancerId = contract.freelancer.id
    // const clientId = contract.client.id
    // const postId = contract.post.id
    // const proposalId = contract.proposal.id

    const {freelancerId, clientId, proposalId, postId} = contract
    if (!postId || !clientId || !freelancerId || !proposalId) {
      return null
    }

    const [freelancerExists, clientExists, postExists, proposalExists] = await Promise.all([
      this.freelancerService.findById(freelancerId),      
      this.clientService.findById(clientId),
      this.postService.findById(postId),
      this.proposalService.findById(proposalId),
    ])

    if (!freelancerExists || !clientExists || !postExists || !proposalExists) {
      return null
    }
    
    const newContract = this.contractRepository.create(contract);
    await this.contractRepository.save(newContract)
    return newContract

  }

  async updateContract(
    id: number,
    contractData: Partial<Contract>
  ): Promise<Contract | null> {
    const contract = await this.contractRepository.findOneBy({ id });
    if (!contract) return null;

    this.contractRepository.merge(contract, contractData);
    await this.contractRepository.save(contract);
    return contract;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.contractRepository.softDelete({ id });
    return result.affected !== 0;
  }

  async getAllContractsByClientId(clientId: number): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
        where: {
            client: {id: clientId},
        },
        relations: ['client']
    })

    return contracts
  }


  async getActiveContracts(): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
        where: {
            status: contractStatus.ACTIVE,
        }
    })

    return contracts
  }

  async getPendingContracts(): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
        where: {
            status: contractStatus.PENDING,
        }
    })

    return contracts
  }

    async getCompletedContracts(): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
        where: {
            status: contractStatus.COMPLETED,
        }
    })

    return contracts
  }

    async getCancelledContracts(): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
        where: {
            status: contractStatus.CANCELLED,
        }
    })

    return contracts
  }

  //Contracts shown to Client
  async getContractsByClientIdAndStatus(clientId: number, status: contractStatus): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
      where: {
        client: {id: clientId},
        status: status
      },
      relations: ['client']
    })
    return contracts

  }


  //Contract shown to freelancer
  async getContractsByFreelancerIdAndStatus(freelancerId: number, status: contractStatus): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
      where: {
        freelancer: {id: freelancerId},
        status: status
      },
      relations: ['freelancer']
    })
    return contracts

  }



  async acceptContract(contractId: number, updatedStatus: contractStatus): Promise<Contract | null> {
    const contract = await this.contractRepository.findOne({
      where: {id: contractId}
    })

    if (!contract) return null
    if (contract.status!==contractStatus.PENDING) {
      console.log("Status is not pending")
      return null
    }
    contract.status = updatedStatus
    
    this.contractRepository.save(contract)
    return contract
  }

  async RejectContract(contractId: number, updatedStatus: contractStatus): Promise<Contract | null> {
    const contract = await this.contractRepository.findOne({
      where: {id: contractId}
    })

    if (!contract) return null

    if (contract.status === contractStatus.ACTIVE) {
      console.log()
    }
    if (![contractStatus.ACTIVE, contractStatus.PENDING].includes(contract.status)) {
      console.log("Contract cannot be cancelled")
      return null
    }


    contract.status = updatedStatus
    this.contractRepository.save(contract)
    return contract
  }

  async completeContract(contractId: number, updatedStatus: contractStatus): Promise<Contract | null> {
    const contract = await this.contractRepository.findOne({
      where: {id: contractId}
    })

    if (!contract) return null

    if (contract.status!==contractStatus.ACTIVE) {
      console.log("Inactive Status")
      return null
    }


    contract.status = updatedStatus
    this.contractRepository.save(contract)
    return contract 
  }

}