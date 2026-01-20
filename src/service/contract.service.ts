import { DataSource, Repository } from "typeorm";
import { Contract } from "../entity/contract";
import { contractStatus } from "../enum/contract-status.enum";
import { PostService } from "./job-post.service";
import { FreelancerService } from "./freelancer.service";
import { ClientService } from "./client.service";
import { ProposalService } from "./proposal.service";
import { userRoles } from "../enum/user-roles.enum";


export class contractService {
  constructor(private contractRepository: Repository<Contract>,
    private freelancerService: FreelancerService,
    private clientService: ClientService,
    private proposalService: ProposalService,
    private postService: PostService,
    private dataSource: DataSource,
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

    if (contract.freelancerId!=proposalExists.freelancer.id) {
      console.log("mismatch between contract and proposal freelancer Ids")
      return null
    } 

    if (contract.clientId !== postExists.client.id) {
      console.log("Mismatch between client Ids in contract and post")
      return null
    }
    
    const newContract = this.contractRepository.create(contract);
    await this.contractRepository.save(newContract)
    return newContract

  }

  async updateContract(
    id: number,
    contractData: Partial<Contract>,
    user: any
  ): Promise<Contract | null> {
    const contract = await this.contractRepository.findOneBy({ id });
    if (!contract) return null;

    if (user.role===userRoles.CLIENT && user.id!==contract.clientId) {
      console.log("That ain't your contract what's you doing here?")
      return null
    }

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
            clientId: clientId,
        },
        relations: ['client']
    })

    return contracts
  }

  async getContractsByFreelancerId(freelancerId: number): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
      where: {
        freelancerId: freelancerId,
      },
      relations: ['freelancer']
    })
    return contracts

  }



  //global instead of using seperate for separate status
  async getContractsByStatus(status: contractStatus): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
      where: {
        status: status,
      }
    })

    return contracts
  }

  //Contracts shown to Client
  async getContractsByClientIdAndStatus(clientId: number, status: contractStatus): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({
      where: {
        clientId: clientId,
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
        freelancerId: freelancerId,
        status: status
      },
      relations: ['freelancer']
    })
    return contracts

  }


  async acceptContract(contractId: number, updatedStatus: contractStatus): Promise<Contract | null> {
    return await this.dataSource.transaction(async (transactionalEntityManager)=> {
      const contract = await transactionalEntityManager.findOne(Contract, {
      where: {id: contractId}
    })

    if (!contract) return null
    if (contract.status!==contractStatus.PENDING) {
      console.log("Status is not pending")
      return null
    }
    contract.status = updatedStatus
    
    await transactionalEntityManager.save(Contract, contract)

    await this.proposalService.markAsAccepted(contract.proposalId, transactionalEntityManager)
    return contract
    })
  }

  async rejectContract(contractId: number, updatedStatus: contractStatus): Promise<Contract | null> {
    const contract = await this.contractRepository.findOne({
      where: {id: contractId}
    })

    if (!contract) return null

    if (![contractStatus.ACTIVE, contractStatus.PENDING].includes(contract.status)) {
      console.log("Contract cannot be cancelled")
      return null
    }


    contract.status = updatedStatus
    this.contractRepository.save(contract)
    return contract
  }

  async completeContract(contractId: number, updatedStatus: contractStatus): Promise<Contract | null> {
    return await this.dataSource.transaction(async (transactionalEntityManager)=> {
      const contract = await transactionalEntityManager.findOne(Contract, {
      where: {id: contractId},
      lock: {mode: "pessimistic_write"}
    })

    if (!contract) return null

    if (contract.status!==contractStatus.ACTIVE) {
      console.log("Inactive Status")
      return null
    }


    contract.status = updatedStatus
    await transactionalEntityManager.save(Contract, contract)
    await this.freelancerService.profileUpdateAfterOrderCompletion(contract.freelancerId, contract.agreedPrice, transactionalEntityManager)
    await this.clientService.profileUpdateAfterOrderCompletion(contract.clientId, contract.agreedPrice, transactionalEntityManager)
    await this.proposalService.updateProposalStatusAfterOrderCompletion(contract.postId, transactionalEntityManager)

    return contract 
    })
  }

  //following function will be used to display information about all the parties involved in the contract
  //e.g. contract will display essenetial info of freelancer and client and post title
  async getContractInformation(contractId: number): Promise<Contract | null> {
    const contract = this.contractRepository.findOne({
      where: {
        id: contractId
      },
      relations: ['client', 'freelancer', 'post']
    })

    return contract
  }
}

