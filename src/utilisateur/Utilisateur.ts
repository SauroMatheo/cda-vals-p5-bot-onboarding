/**
 * Class representing a user.
 */
export class Utilisateur {
    /**
     * User's snowflake
     */
    readonly id: string;

    /**
     * User's last name.
     */
    readonly nom: string;

    /**
     * User's first name.
     */
    readonly prenom: string;

    /**
     * Roles assigned to the user.
     */
    readonly rolesId: string[];

    /**
     * Creates a new User instance.
     * @param user The user object to initialize the instance with.
     */
    constructor(user: { id: string, nom: string, prenom: string, rolesId: string[] }) {
        this.id = user.id;
        this.nom = user.nom;
        this.prenom = user.prenom;
        this.rolesId = user.rolesId || [];
    }
}
