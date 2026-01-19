import { Repository } from "typeorm";
import { Post } from "../entity/job-post";
import User from "../entity/User";
import { Client } from "../entity/client";
import { Freelancer } from "../entity/freelancer";
export class ClientService {
  constructor(private clientRepository: Repository<Client>) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findById(id: number): Promise<Client | null> {
    return this.clientRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }
  async createClient(client: Client): Promise<Client> {
    if (!client.user) {
      throw new Error("User is required");
    }

    const newClient = this.clientRepository.create(client);
    await this.clientRepository.save(newClient);
    return newClient;
  }

  async updateClient(
    id: number,
    clientData: Partial<Client>
  ): Promise<Client | null> {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) return null;

    this.clientRepository.merge(client, clientData);
    await this.clientRepository.save(client);
    return client;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.clientRepository.delete({ id });
    return result.affected !== 0;
  }

  async profileUpdateAfterOrderCompletion(clientId: number, amountSpent: number): Promise<Client> {
    let client = await this.findById(clientId)
    if (!client) {
      return null
    }
    client.numberOfHires += 1
    client.amountSpent += amountSpent

    await this.clientRepository.save(client)

    return client
  }

}