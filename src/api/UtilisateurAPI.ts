import { BaseAPI } from "./BaseAPI";

/**
 * Class that provides methods to interact with the API, in the context of users.
 * @extends BaseAPI
 */
export class UtilisateurAPI extends BaseAPI {
    readonly route: string = "utilisateurs";

    constructor(baseURL?: string) {
        super(baseURL);
    }

    /**
     * Fetch a user by ID.
     * @param userId The ID of the user to fetch.
     */
    async fetchUser(userId: string): Promise<any> {
        return await this.get(`${this.route}/${userId}`);
    }

    /**
     * Fetch all users.
     */
    async fetchAllUsers(): Promise<any[]> {
        return await this.get(`${this.route}`);
    }

    /**
     * Create a new user.
     * @param body The user data to create.
     */
    async createUser(body: any): Promise<any> {
        return await this.post(`${this.route}`, body);
    }

    /**
     * Update a user by ID.
     * @param userId The ID of the user to update.
     * @param body The updated user data.
     */
    async updateUser(userId: string, body: any): Promise<any> {
        return await this.patch(`${this.route}/${userId}`, body);
    }

    /**
     * Delete a user by ID.
     * @param userId The ID of the user to delete.
     */
    async deleteUser(userId: string): Promise<any> {
        return await this.delete(`${this.route}/${userId}`, {});
    }
}
