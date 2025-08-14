import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Client, Interaction, RestOrArray, GuildMember, MessageFlags } from "discord.js";
import { UtilisateurAPI } from "../api/UtilisateurAPI";

export async function nameInput(interaction: Interaction, client: Client) {
    if (interaction.isModalSubmit() && interaction.customId === 'user_info_modal') {
        const nom: string = interaction.fields.getTextInputValue('last_name');
        const prenom: string = interaction.fields.getTextInputValue('first_name');

        // Add user info to the database
        const userAPI: UtilisateurAPI = new UtilisateurAPI();

        try {
            // Try to fetch user first
            let userExists: boolean = false;

            try {
                const existingUser = await userAPI.fetchUser(interaction.user.id);
                userExists = !!existingUser;
            } catch (err) {
                userExists = false;
            }


            if (userExists) {
                await userAPI.updateUser(interaction.user.id, {
                    prenom: prenom,
                    nom: nom
                });

            } else {
                await userAPI.createUser({
                    id: interaction.user.id,
                    prenom: prenom,
                    nom: nom,
                    rolesId: [],
                });
            }


            if (interaction.member && interaction.member instanceof GuildMember) {
                const member = await interaction.guild?.members.fetch(interaction.user.id);
                member?.setNickname(`${prenom} ${nom}`).catch(console.error);
            }

            await interaction.reply({
                content: `Merci, ${prenom} ${nom} ! Tes infos ont été enregistrées.`,
                flags: [MessageFlags.Ephemeral],
            });
        } catch (err) {
            console.error(err);

            await interaction.reply({
                content: `Une erreur est survenue lors de l'enregistrement de tes infos.`,
                flags: [MessageFlags.Ephemeral],
            });
        }
    }

    if (interaction.isButton() && interaction.customId === 'complete_info') {
        const modal = new ModalBuilder()
            .setCustomId('user_info_modal')
            .setTitle('Remplis tes infos');

        const nomInput = new TextInputBuilder()
            .setCustomId('last_name')
            .setLabel('Ton nom')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const prenomInput = new TextInputBuilder()
            .setCustomId('first_name')
            .setLabel('Ton prénom')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const row1 = new ActionRowBuilder().addComponents(nomInput);
        const row2 = new ActionRowBuilder().addComponents(prenomInput);

        modal.addComponents(row1 as any, row2);
        await interaction.showModal(modal);
    }
}

