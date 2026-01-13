import { Repository } from "typeorm";
import { Client } from "../entity/client";
import { Contract } from "../entity/contract";
import { Freelancer } from "../entity/freelancer";
import { contractStatus } from "../enum/contract-status.enum";


export class contractService {
  constructor(private contractRepository: Repository<Contract>) {}

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find();
  }

  async findById(id: number): Promise<Contract | null> {
    return this.contractRepository.findOne({
      where: { id },
    });
  }


  async createContract(contract: Contract): Promise<Contract> {
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

  async getContractsByClientId(clientId: number): Promise<Contract[]> {
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
  
}